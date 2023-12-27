/** @format */

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	doctor_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		trim: true,
	},
	status: {
		type: String,
		enum: ["pending", "confirmed", "canceled"],
		default: "pending",
	},
	payment: {
		type: Boolean,
		default: false,
	},
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
