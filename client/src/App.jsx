/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Navbar from "./components/navbar/Navbar";
import ApplyDoctor from "./pages/ApplyDoctor";
import BounceLoader from "react-spinners/BounceLoader";
import { useSelector } from "react-redux";
import PublicRoute from "./components/routes/PublicRoutes";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import Favourite from "./pages/Favourite.jsx";
import Appointment from "./components/book-appointment/Appointment.jsx";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "",
	color: "red",
	backgroundColor: "transparent",
};

const App = () => {
	const loading = useSelector((state) => state.alerts.loading);
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/logout"
					element={
						<ProtectedRoute>
							<Logout />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/favourite"
					element={
						<ProtectedRoute>
							<Favourite />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/apply-doctor"
					element={
						<ProtectedRoute>
							<ApplyDoctor />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/book-appointment/:id"
					element={
						<ProtectedRoute>
							<Appointment />
						</ProtectedRoute>
					}
				/>
			</Routes>
			{loading ? (
				<>
					<div className="spinner-container">
						<BounceLoader
							className="spinner"
							color="#fff"
							loading={loading}
							cssOverride={override}
							size={150}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				</>
			) : (
				<></>
			)}
		</BrowserRouter>
	);
};

export default App;
