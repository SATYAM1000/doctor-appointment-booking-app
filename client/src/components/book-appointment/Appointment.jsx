/** @format */

import { useEffect, useState } from "react";
import "./Appointment.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from "../../assets/doctorplaceholder.avif";
import CalendarWithTimeSlots from "./Calender.jsx";

const Appointment = () => {
	const [doctor, setDoctor] = useState({});
	const { id } = useParams();
	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	};
	useEffect(() => {
		const retriveDoctorData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/doctors/info/${id}`,
					{ headers }
				);

				// console.log("response.doctor.data: ", response.data);
				if (response.data.success) {
					setDoctor(response.data.data);
				} else {
					console.log("error while retriving doctor data");
				}
			} catch (error) {
				console.log("Error while retriving doctor data: ", error);
			}
		};
		retriveDoctorData();
	}, []);

	return (
		<div className="appointment-page">
			<div className="appointment-container">
				<div className="left-side">
					<div className="image-and-name-part">
						<img src={image} alt="" />
						<p className="name">{doctor.name}</p>
						<p className="specialization">{doctor.specialization}</p>
					</div>
					<div className="details-part"></div>
                    {console.log(doctor)}
				</div>
				<div className="right-side">
					{doctor.availableFrom === undefined ? (
						""
					) : (
						<CalendarWithTimeSlots
							dstartTime={doctor.availableFrom}
							dendTime={doctor.availableTo}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Appointment;
