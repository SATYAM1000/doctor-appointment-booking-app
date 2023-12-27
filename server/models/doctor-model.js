/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const doctorSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId, // Correct way to define ObjectId
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		dateOfBirth: {
			type: Date,
		},
		address: {
			type: String,
			trim: true,
		},
		specialization: {
			type: Array,
			required: true,
		},
		workExperience: {
			type: Number,
			required: true,
		},
		degrees: {
			type: Array,
			required: true,
		},
		hospital: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
		},
		languageSpoken: {
			type: Array,
		},
		availableTo: {
			type: String,
			required: true,
		},
		availableFrom: {
			type: String,
			required: true,
		},
		availableOn: {
			type: Array,
			required: true,
		},
		linkedinLink: {
			type: String,
		},
		feePerConsultancy: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
		},
		status: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			default: 0,
		},
		reviews: {
			type: Array,
		},
		patientVisited:{
			type:Array,
		}
	},
	{ timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema); // Use mongoose.model, not mongoose.Model
export default doctorModel;
