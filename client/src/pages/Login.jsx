/** @format */

import "./Login.css";
import { useState } from "react";
import doctor from "../assets/login.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
const Login = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.alerts);
	const navigate = useNavigate();
	const newUser = {
		email: "",
		password: "",
	};
	const [user, setUser] = useState({
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
				"http://localhost:5000/api/users/login",
				user
			);
			dispatch(hideLoading());
			console.log("Login console: ", response.data);
			if (response.data.success) {
				console.log("Login successful: ", response.data);
				toast.success(response.data.message);
				localStorage.setItem("token", response.data.token);
				setUser(newUser);
				navigate("/");
			} else {
				toast.error(response.data.message);
				setUser(newUser);
			}
		} catch (error) {
			dispatch(hideLoading());
			console.log("Error in loging in: ", error);
			setUser(newUser);
			toast.error("Something went wrong");
		}
	};
	return (
		<div className="login-page">
			<div className="form-container">
				<div className="image-area">
					<img src={doctor} alt="" />
				</div>
				<div className="form-area">
					<h2>
						Login Here <span>Here!</span>
					</h2>
					<form onSubmit={handleFormSubmit}>
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
						<button type="submit">Login</button>
						<p>
							Not registered? <Link to="/register">Register</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
