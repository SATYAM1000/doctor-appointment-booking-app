/** @format */

import express from "express";
import Appointment from "../models/appointment-model.js";
import authMiddleware from "../middlewares/auth-middleware.js";

export const bookAppointment = async (req, res) => {
	try {
		const { date, time } = req.body;
		const user_id = req.user._id;
		const doctor_id = req.params.id;
		console.log("date is: ",date);
		console.log("time is: ",time);

		// Format the date and time fields appropriately to match your MongoDB collection
		const dDate = new Date(date).toISOString().split('T')[0];
		const formattedDate=new Date(dDate);
		const formattedTime = time; // Ensure 'time' is in the correct format as stored in the database

		const existingAppointment = await Appointment.find({
			doctor_id,
			date: formattedDate,
			time: formattedTime,
		});

		if (existingAppointment.length > 0) {
			return res
				.status(400)
				.json({ message: "Slot is already booked", success: false });
		}

		const newAppointment = new Appointment({
			user_id,
			doctor_id,
			date: formattedDate,
			time: formattedTime,
			status: "pending",
		});

		await newAppointment.save();

		return res
			.status(200)
			.json({ message: "Appointment booked successfully", success: true });
	} catch (error) {
		console.error("Error booking appointment:", error);
		return res
			.status(500)
			.json({ message: "Something went wrong", success: false });
	}
};

export const getAllAppointmentsOfDoctorOnParticularDay = async (req, res) => {
	try {
	  const { doctor_id, date } = req.query;
	  console.log("doctor_id: ", doctor_id);
	  console.log("date: ", date);
  
	  const startDate = new Date(date); // Convert the received date string to a Date object
	  console.log("startDate: ",startDate);
	  console.log("date: ",date);
	  const endDate = new Date(startDate); // Create an endDate for the same day
	  endDate.setHours(23, 59, 59, 999); // Set the end time to 23:59:59.999 for the given date
  
	  const doctorAppointments = await Appointment.find({
		doctor_id,
		date: startDate,
	  });
  
	  return res.status(200).json({ appointments: doctorAppointments, success: true });
	} catch (error) {
	  console.error("Error fetching doctor appointments:", error);
	  return res.status(500).json({ message: "Something went wrong", success: false });
	}
  };
  
