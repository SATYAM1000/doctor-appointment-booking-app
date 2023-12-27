/** @format */

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Logout = () => {
	useEffect(() => {
		const logoutUser = () => {
			const token = localStorage.getItem("token");
			if (token) {
				localStorage.removeItem("token");
			}
		};
		logoutUser();
	}, []);
	return <Navigate to="/login"></Navigate>;
};

export default Logout;
