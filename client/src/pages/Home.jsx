/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Doctor from "../components/card/Doctor.jsx";
import ImageSlider from "../components/image-slider/Slider.jsx";
import slider1 from "../assets/img1.png";
import slider2 from "../assets/img2.png";
import slider3 from "../assets/img3.png";

const Home = () => {
	const [topDoctors, setTopDoctors] = useState([]);

	const images = [slider1, slider2, slider3];
	

	useEffect(() => {
		const getAllDoctors = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/doctors/all-doctors"
				);

				if (response && response.data && response.data.success) {
					setTopDoctors(response.data.allDoctors);
				} else {
					console.log("error");
				}
			} catch (error) {
				console.log("Error while fetching doctors list: ", error);
			}
		};

		getAllDoctors();
	}, []);

	return (
		<div className="home-page">
			<ImageSlider images={images} />
			<div className="top-doctors">
				<h3>
					Recommended <span>Doctors</span>
				</h3>
				<div className="top-doctors-section">
					{topDoctors.map((doctor, key) => {
						return <Doctor doctor={doctor} key={key} />;
					})}
				</div>
			</div>
			<div className="top-doctors">
				<h3>
					Top <span>Cardiologist</span>
				</h3>
				<div className="top-doctors-section">
					{topDoctors.map((doctor, key) => {
						return <Doctor doctor={doctor} key={key} />;
					})}
				</div>
			</div>

			<div className="top-doctors">
				<h3>
					Top <span>Surgeons</span>
				</h3>
				<div className="top-doctors-section">
					{topDoctors.map((doctor, key) => {
						return <Doctor doctor={doctor} key={key} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;
