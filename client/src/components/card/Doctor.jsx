/** @format */

import { useState } from "react";
import doctorimg from "../../assets/doctorplaceholder.avif";
import "./Doctor.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Doctor = ({color, doctor }) => {
	const [newcolor,setnewcolor]=useState('');
	const [doc, setDoc] = useState(false);
	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	};

	const markFavourite = async (id) => {
		try {
			console.log("id", id);
			const response = await axios.post(
				"http://localhost:5000/api/users/mark-favourite",
				{ id: id },
				{ headers }
			);

			if (response.data.success) {
				console.log("Doctor marked as favourite successfully");
				setDoc(true);
				setnewcolor('red');
			} else {
				console.log("Failed to mark as favourite");
			}
		} catch (error) {
			console.log("Something went wrong while marking favourite: ", error);
		}
	};
	return (
		<div className="doctor-card-container">
			<div className="doctor-card">
				<div className="image-and-name">
					<img src={doctorimg} alt="" />
					<div className="name-and-specializaation">
						<p className="doctor-name">{doctor.name}</p>
						<p className="specialization">{doctor.specialization[0]}</p>
						<div className="ratings">
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
							<i className="fa-solid fa-star"></i>
						</div>
					</div>
				</div>
				<div className="extra-doctor-details">
					<p>Rs {doctor.feePerConsultancy}/Visit</p>
					<Link to={`/book-appointment/${doctor._id}`}>
						<button title="Book Appointment">Book Appointment</button>
					</Link>
				</div>
			</div>
			<div className="favourite-icon">
				<i
					title="Mark as favourite"
					className={color ? "fa-solid fa-heart fav" : "fa-solid fa-heart"}
					onClick={() => {
						markFavourite(doctor._id);
					}}></i>
			</div>
		</div>
	);
};

export default Doctor;
