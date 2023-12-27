/** @format */

import authMiddleware from "../middlewares/auth-middleware.js";
import { bookAppointment,getAllAppointmentsOfDoctorOnParticularDay } from "../controllers/appointment-controller.js";
import express from "express";
const appointmentRoute = express.Router();
appointmentRoute.post("/book-appointment/:id", authMiddleware, bookAppointment);
appointmentRoute.get('/all-appointment/',authMiddleware,getAllAppointmentsOfDoctorOnParticularDay);

export default appointmentRoute;