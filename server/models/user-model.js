/** @format */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isDoctor: {
			type: Boolean,
			default: false,
		},
		seenNotifications: {
			type: Array,
		},
		unseenNotifications: {
			type: Array,
		},
        image:{
            type:String,
        },
		favouriteDoctors:{
			type:Array,
		}
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	const currentUser = this;
	if (!this.isModified("password")) {
		next();
	}
	const hashedPassword = await bcrypt.hash(this.password, 10);
	this.password = hashedPassword;
});

userSchema.methods.generateToken = async function () {
	try {
		const token = jwt.sign(
			{ userID: this._id, email: this.email },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "30d" }
		);
		return token;
	} catch (error) {
		console.error("Token generation error:", error);
		throw new Error("Token generation failed");
	}
};

const userModel = new mongoose.model("users", userSchema);

export default userModel;
