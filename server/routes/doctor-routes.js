/** @format */

import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import crypto from "crypto";
import multer from "multer";

import {
	registerDoctor,
	getDoctorDetails,
	deleteDoctorAccount,
	updateDoctorAccount,
	getVerifiedDoctor,
	profileImage,
	uploadImage,
} from "../controllers/doctor-controller.js";
const doctorRoute = express.Router();

doctorRoute.post("/register", authMiddleware, registerDoctor);
doctorRoute.get("/info/:id", authMiddleware, getDoctorDetails);
doctorRoute.delete("/delete-account", authMiddleware, deleteDoctorAccount);
doctorRoute.put("/update", authMiddleware, updateDoctorAccount);
doctorRoute.get("/all-doctors", getVerifiedDoctor);


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../client/src/images/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() + "-" + crypto.randomBytes(8).toString("hex");
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

doctorRoute.post(
	"/upload",
	authMiddleware,
	upload.single("image"),
	uploadImage
);
doctorRoute.get("/profile-image", authMiddleware, profileImage);

export default doctorRoute;
