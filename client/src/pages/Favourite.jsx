/** @format */

import "./Favourite.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Doctor from "../components/card/Doctor.jsx";

const Favourite = () => {
	const [favDoctors, setFavDoctors] = useState([]);
	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	};

	useEffect(() => {
		const getAllDoctors = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					console.log("Token is missing");
					return;
				}

				const response = await axios.get(
					"http://localhost:5000/api/users/favourite",
					{ headers }
				);

				if (response && response.data && response.data.success) {
					setFavDoctors(response.data.doctors);
				} else {
					console.log("No favorite doctors found");
				}
			} catch (error) {
				console.log("Error while fetching favorite doctors: ", error);
			}
		};

		getAllDoctors();
	}, [headers]);

	return (
		<div className="favourite-page">
			<div className="top-doctors">
				<h3>
					Favourite <span>Doctors</span>
				</h3>
				<div className="top-doctors-section fav-doc">
					{favDoctors.map((doctor, key) => {
						return <Doctor color={"red"} doctor={doctor} key={key} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Favourite;
