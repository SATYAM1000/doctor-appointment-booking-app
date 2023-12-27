/** @format */

import express from "express";
import userModel from "../models/user-model.js";
import doctorModel from "../models/doctor-model.js";
import transporter from "../config/email-config.js";
import dotenv from "dotenv";
import Image from "../models/profile-image.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

// use auth middleware-------------
export const registerDoctor = async (req, res) => {
	try {
		const {
			name,
			email,
			phone,
			dateOfBirth,
			address,
			specialization,
			workExperience,
			degrees,
			hospital,
			gender,
			languageSpoken,
			availableTo,
			availableFrom,
			availableOn,
			linkedinLink,
			feePerConsultancy,
		} = req.body;
		if (
			!name ||
			!email ||
			!phone ||
			!address ||
			!degrees ||
			!workExperience ||
			!specialization ||
			!hospital ||
			!gender ||
			!availableFrom ||
			!availableTo ||
			!availableOn
		) {
			return res
				.status(200)
				.send({ message: "Please fill all the fields", success: false });
		}

		const isEmailUnqiue = await doctorModel.findOne({ email: email });
		if (isEmailUnqiue) {
			return res
				.status(200)
				.send({ message: "Email already registered", success: false });
		}
		const isPhoneUnique = await doctorModel.findOne({ phone: phone });
		if (isPhoneUnique) {
			return res
				.status(200)
				.send({ message: "Phone number already registered", success: false });
		}

		const allSpecializations = specialization
			.split(",")
			.map((value) => value.trim());
		const allWorkdays = availableOn.split(",").map((value) => value.trim());
		const allDegrees = degrees.split(",").map((value) => value.trim());
		const allLanguageSpoken = languageSpoken
			.split(",")
			.map((value) => value.trim());
		const newDoctor = new doctorModel({
			user: req.user._id,
			name,
			email,
			phone,
			dateOfBirth,
			address,
			specialization: allSpecializations,
			workExperience,
			degrees: allDegrees,
			hospital,
			gender,
			languageSpoken: allLanguageSpoken,
			availableTo,
			availableFrom,
			availableOn: allWorkdays,
			linkedinLink,
			feePerConsultancy,
		});

		// const admin = await userModel.findOne({ isAdmin: true });
		// console.log("admin: ", admin);
		// if (admin) {
		// 	const notification = `New Doctor Form Submission - Action Required`;
		// 	admin.unseenNotifications.push(notification);
		// 	await admin.save();
		// 	let info = await transporter.sendMail({
		// 		from: process.env.EMAIL_FROM,
		// 		to: email,
		// 		subject: `Update on Your Submission`,
		// 		text: `Dear ${name},\n\nI hope this message finds you well. I wanted to inform you that your submitted form is currently under review. Our team is diligently assessing it, a process that typically takes between 24 to 48 hours. Should your submission not be approved within this timeframe, I kindly ask that you reapply after 48 hours.\n\nThank you,\niDoctor/${admin.name}`,
		// 	});
		// }

		await newDoctor.save();

		return res
			.status(201)
			.send({ message: "Your form is under approval", success: true });
	} catch (error) {
		console.log("Error while registering doctor: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const getDoctorDetails = async (req, res) => {
	try {
		const id = req.params.id;
		console.log("id: ", id);
		const doctorData = await doctorModel.findOne({ _id: id });
		if (!doctorData) {
			return res
				.status(404)
				.send({ message: "Doctor not found", success: false });
		}
		return res.status(200).send({
			message: "Doctor data fetched successfully",
			success: true,
			data: doctorData,
		});
	} catch (error) {
		console.log("Error while fetching doctor details: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const deleteDoctorAccount = async (req, res) => {
	try {
		const id = req.user._id;
		const deleteDoctor = await doctorModel.deleteOne({ user: id });
		if (deleteDoctor.deletedCount === 0) {
			return res
				.status(200)
				.send({ message: "Failed to delete doctor account", success: false });
		}
		return res
			.status(200)
			.send({ message: "Doctor account deleted successfully", success: true });
	} catch (error) {
		console.log("Error while deleting doctor account: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", successs: false });
	}
};

export const updateDoctorAccount = async (req, res) => {
	try {
		const {
			name,
			email,
			phone,
			dateOfBirth,
			address,
			specialization,
			workExperience,
			degrees,
			hospital,
			gender,
			languageSpoken,
			availableTo,
			availableFrom,
			availableOn,
			linkedinLink,
			feePerConsultancy,
		} = req.body;

		const id = req.user._id;
		const registerDoctorData = await doctorModel.findOne({ user: id });

		const updatedFields = {};

		if (!name) {
			updatedFields.name = registerDoctorData.name;
		} else {
			updatedFields.name = name;
		}

		if (!email) {
			updatedFields.email = registerDoctorData.email;
		} else {
			updatedFields.email = email;
		}

		if (!phone) {
			updatedFields.phone = registerDoctorData.phone;
		} else {
			updatedFields.phone = phone;
		}

		if (!dateOfBirth) {
			updatedFields.dateOfBirth = registerDoctorData.dateOfBirth;
		} else {
			updatedFields.dateOfBirth = dateOfBirth;
		}
		if (!address) {
			updatedFields.address = registerDoctorData.address;
		} else {
			updatedFields.address = address;
		}

		if (!specialization) {
			updatedFields.specialization = registerDoctorData.specialization;
		} else {
			const newSpecializations = specialization
				.split(",")
				.map((value) => value.trim());
			updatedFields.specialization = newSpecializations;
		}

		if (!degrees) {
			updatedFields.degrees = registerDoctorData.degrees;
		} else {
			const allNewDegrees = degrees.split(",").map((value) => value.trim());
			updatedFields.degrees = allNewDegrees;
		}

		if (!workExperience) {
			updatedFields.workExperience = registerDoctorData.workExperience;
		} else {
			updatedFields.workExperience = workExperience;
		}

		if (!feePerConsultancy) {
			updatedFields.feePerConsultancy = registerDoctorData.feePerConsultancy;
		} else {
			updatedFields.feePerConsultancy = feePerConsultancy;
		}

		if (!linkedinLink) {
			updatedFields.linkedinLink = registerDoctorData.linkedinLink;
		} else {
			updatedFields.linkedinLink = linkedinLink;
		}

		if (!availableOn) {
			updatedFields.availableOn = registerDoctorData.availableOn;
		} else {
			const newWeekdays = availableOn.split(",").map((value) => value.trim());
			updatedFields.availableOn = newWeekdays;
		}

		if (!hospital) {
			updatedFields.hospital = registerDoctorData.hospital;
		} else {
			updatedFields.hospital = hospital;
		}

		if (!availableFrom) {
			updatedFields.availableFrom = registerDoctorData.availableFrom;
		} else {
			updatedFields.availableFrom = availableFrom;
		}

		if (!availableTo) {
			updatedFields.availableTo = registerDoctorData.availableTo;
		} else {
			updatedFields.availableTo = availableTo;
		}

		if (!gender) {
			updatedFields.gender = registerDoctorData.gender;
		} else {
			updatedFields.gender = gender;
		}
		if (!languageSpoken) {
			updatedFields.languageSpoken = registerDoctorData.languageSpoken;
		} else {
			const allLanguagesSpoken = languageSpoken
				.split(",")
				.map((value) => value.trim());
			updatedFields.languageSpoken = allLanguagesSpoken;
		}

		const updatedDoctorData = await doctorModel.updateOne(
			{ user: id },
			{ $set: updatedFields }
		);

		return res
			.status(200)
			.send({ message: "Doctor data updated successfully", success: true });
	} catch (error) {
		console.log("Error while updating doctor account: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const getVerifiedDoctor = async (req, res) => {
	try {
		const allVerifiedDoctor = await doctorModel.find({ status: true });
		if (allVerifiedDoctor.length > 0) {
			return res.status(200).send({
				message: "Doctors fetched successfully",
				success: true,
				allDoctors: allVerifiedDoctor,
			});
		} else {
			return res
				.status(200)
				.send({ message: "No doctors on this platform", success: false });
		}
	} catch (error) {
		console.log("Error while fetching verified doctors: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const uploadImage = async (req, res) => {
	const userID = req.user._id;
	console.log(req.file);
	const imageName = req.file.filename;
	console.log("req.file: ", req.file);
	const { filename } = req.file;
	console.log("imageName: ", filename);
	try {
		const newImage = new Image({ userID, image: filename });
		await newImage.save();
		res.status(201).json({ msg: "Image uploaded successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
	}
};
export const profileImage = async (req, res) => {
	try {
		
		const id = req.user._id;
		const image = await Image.find({ userID: id });
		if(image.length<1){
			return res.status(200).send({message:"No image found"})
		}
		console.log(image)
		const filepath = "../"+"images/"+image[0].image;
		console.log("filepath: ",filepath);
		return res.status(200).send({message:"File found",path:filepath})
	} catch (error) {
		if (error.code === "ENOENT") {
			res.status(404).send({ message: "Image not found" });
		} else {
			console.error(error); // Log detailed error for debugging
			res.status(500).send({ message: "Internal server error" });
		}
	}
};
