/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";
import connectToDatabase from "./config/db-connection.js";
import userRouter from "./routes/user-routes.js";
import doctorRoute from "./routes/doctor-routes.js";
import appointmentRoute from "./routes/appointment-routes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const dirname = path.resolve();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/doctors", doctorRoute);
app.use("/api/appointments", appointmentRoute);


connectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is listening at ${PORT}`);
		});
	})
	.catch((error) => {
		console.log("Server is not working ", error);
	});
