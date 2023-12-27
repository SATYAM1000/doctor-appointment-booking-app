/** @format */

import express from "express";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import doctorModel from "../models/doctor-model.js";

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(200)
				.send({ message: "Please fill all the fields", success: false });
		}

		const isEmailRegistered = await userModel.findOne({ email: email });
		if (isEmailRegistered) {
			return res
				.status(200)
				.send({ message: "Email already registered", success: false });
		}

		const newUser = new userModel({ name, email, password });
		await newUser.save();

		return res.status(201).send({
			message: "User registered successfully",
			success: true,
			token: await newUser.generateToken(),
		});
	} catch (error) {
		console.error("Error while registering:", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(200)
				.send({ message: "Please fill all the fields", success: false });
		}

		const user = await userModel.findOne({ email: email });
		if (!user) {
			return res
				.status(200)
				.send({ message: "Invalid email or password", success: false });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res
				.status(200)
				.send({ message: "Invalid email or password", success: false });
		}

		return res.status(200).send({
			message: "Login successful",
			success: true,
			token: await user.generateToken(),
		});
	} catch (error) {
		console.error("Login error:", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const getUserDetails = async (req, res) => {
	try {
		const userDetails = req.user;
		if (!userDetails) {
			return res
				.status(200)
				.send({ message: "User details not found", success: false });
		}

		return res
			.status(200)
			.send({ message: "User data found", success: true, data: userDetails });
	} catch (error) {
		console.error("Error while fetching user details:", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const deleteUserAccount = async (req, res) => {
	try {
		const id = req.user.id;
		const deletedUser = await userModel.deleteOne({ _id: id });
		if (deletedUser.deletedCount === 0) {
			return res
				.status(200)
				.send({ message: "Failed to delete user account", success: false });
		}
		return res
			.status(200)
			.send({ message: "User account deleted successfully", success: true });
	} catch (error) {
		console.log("Error while deleting user account: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};
export const markDoctorAsFavourite = async (req, res) => {
	try {
		const userId = req.user._id; // Assuming req.user contains user details
		const currentUser = await userModel.findOne({ _id: userId });
		const doctorID = req.body.id;
		const doctor = await doctorModel.findOne({ _id: doctorID });

		if (!doctor) {
			return res
				.status(200)
				.send({ message: "Doctor not found", success: false });
		}

		// Check if the doctor is already in the user's favorites
		if (currentUser.favouriteDoctors.includes(doctorID)) {
			return res
				.status(200)
				.send({ message: "Doctor is already a favorite", success: true });
		}

		// If the doctor is not in favorites, mark as favorite
		currentUser.favouriteDoctors.push(doctorID);
		await currentUser.save();

		return res
			.status(200)
			.send({ message: "Marked favorite successfully", success: true });
	} catch (error) {
		console.log("Error while marking doctor as favorite: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const accessUsersFavouriteDoctor = async (req, res) => {
	try {
		const id = req.user._id;
		const user = await userModel.findOne({ _id: id });

		const allFavouriteDoctors = user.favouriteDoctors || []; // Ensure favoriteDoctors exists

		// Use Promise.all to await the resolution of all async operations
		const finalData = await Promise.all(
			allFavouriteDoctors.map(async (value) => {
				try {
					const doctor = await doctorModel.findOne({ _id: value });
					return doctor || null;
				} catch (error) {
					console.log("Error while fetching doctor details: ", error);
					return null;
				}
			})
		);

		return res.status(200).send({
			message: "All favorite doctors fetched successfully",
			success: true,
			doctors: finalData.filter((doctor) => doctor !== null), // Remove null entries
		});
	} catch (error) {
		console.log("Error while fetching favorite doctors: ", error);
		return res
			.status(500)
			.send({ message: "Something went wrong", success: false });
	}
};

export const uploadImage = async (req, res) => {
	try {
	} catch (error) {}
};
