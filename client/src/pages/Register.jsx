/** @format */

import "./Register.css";
import doctor from "../assets/doctor.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
const Register = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.alerts.loading);
	const newUser = {
		name: "",
		email: "",
		password: "",
	};
	const navigate = useNavigate();
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"http://localhost:5000/api/users/register",
				user
			);
			dispatch(hideLoading());
			if (response.data.success) {
				console.log("Data while registering: ", response.data);
				toast.success(response.data.message);
				localStorage.setItem("token", response.data.token);
				setUser(newUser);
				navigate("/");
			} else {
				console.log("Registration failed: ", response.data);
				setUser(newUser);
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading())
			console.log("Error while registering: ", error);
			setUser(newUser);
			toast.error("Something went wrong!");
		}
	};
	return (
		<div className="register-page">
			<div className="form-container">
				<div className="image-area">
					<img src={doctor} alt="" />
				</div>
				<div className="form-area">
					<h2>
						Sign Up <span>Here!</span>
					</h2>
					<form onSubmit={handleFormSubmit}>
						<div className="username-field">
							<input
								type="text"
								placeholder="Name"
								name="name"
								autoComplete="off"
								value={user.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="email-field">
							<input
								type="email"
								placeholder="Email"
								autoComplete="off"
								name="email"
								value={user.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="password-field">
							<input
								className="fill-password"
								type="password"
								placeholder="Password"
								autoComplete="off"
								name="password"
								value={user.password}
								onChange={handleInputChange}
							/>
							<div className="eye-icon">
								<i className="fa-solid fa-eye-slash password-hide-icon"></i>
							</div>
						</div>
						<button type="submit">Register</button>
						<p>
							Already registered? <Link to="/login">Login</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
