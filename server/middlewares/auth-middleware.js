/** @format */

import express from "express";
import userModel from "../models/user-model.js";
import doctorModel from "../models/doctor-model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
	const token = req.header("Authorization");
	console.log("token:  ",token)
	if (!token) {
		return res
			.status(200)
			.send({ message: "Unauthorized User", success: false });
	}
	const jwtToken = token.split(" ")[1];
	if (!jwtToken) {
		return res.status(200).send({
			message: "Unauthorized user",
			success: false,
		});
	}

	try {
		const isValidUser = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
		if (!isValidUser) {
			throw new Error("Invalid token format");
		}

		const registeredUser = await userModel.findOne({
			_id: isValidUser.userID,
			email: isValidUser.email,
		});

		if (!registeredUser) {
			throw new Error("User not found");
		}

		req.user = registeredUser;
		req.token = jwtToken;
		req.id = registeredUser._id;
		next();
	} catch (error) {
		res
			.status(500)
			.send({ message: "Error in Middleware", success: false, error });
	}
};

export default authMiddleware;
