/** @format */
import "./Navbar.css";
import doctorPlaceholder from "../../assets/doctorPlaceholder.avif";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
	const location = useLocation();
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
	const closeHamburgerMenu = () => {
		if (showHamburgerMenu === true) {
			setShowHamburgerMenu(false);
		}
	};
	const toggleHamburgerMenu = () => {
		setShowHamburgerMenu((prev) => !prev);
	};
	const userMenu = [
		{ name: "Home", icon: "fa-solid fa-house", path: "/" },
		{ name: "Doctors", icon: "fa-solid fa-user-doctor", path: "/doctors" },
		{ name: "Favourite Doctors", icon: "fa-solid fa-star", path: "/favourite" },
		{
			name: "My Appointments",
			icon: "fa-solid fa-calendar-check",
			path: "/appointmnets",
		},
		{
			name: "Apply as Doctor",
			icon: "fa-solid fa-stethoscope",
			path: "/apply-doctor",
		},
	];

	const menuToBeRendered = userMenu;
	return (
		<div className="navbar-component">
			<div className="logo-and-bars">
				<div className="sidebar-menu">
					<i className="ri-menu-2-line bars" onClick={toggleHamburgerMenu}></i>

					<div
						className={
							showHamburgerMenu ? "menu-options" : "hide-menu-options"
						}>
						<div className="upper-menu">
							{menuToBeRendered.map((menuItem, key) => {
								const isActive = location.pathname === menuItem.path;
								return (
									<div className="menu-item" key={key}>
										<Link
											className={isActive ? "anchor" : "simple-anchor"}
											to={menuItem.path} onClick={closeHamburgerMenu}>
											<i className={menuItem.icon}></i>
											<p>{menuItem.name}</p>
										</Link>
									</div>
								);
							})}
						</div>
						<div className="lower-menu">
							<div className="menu-item">
								<Link className="simple-anchor" onClick={closeHamburgerMenu}>
									<i className="fa-solid fa-phone"></i>
									<p>Contact Us</p>
								</Link>
							</div>
							<div className="menu-item">
								<Link  className="simple-anchor" to='/logout' onClick={closeHamburgerMenu}>
									<i className="fa-solid fa-right-from-bracket"></i>
									<p>Logout</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<Link to="/">
					<h2 className="logo">iDoctor</h2>
				</Link>
			</div>
			<div className="search-notification-profile">
				<div className="search-bar">
					<i className="ri-search-line magnifying-glass"></i>
					<input type="text" placeholder="Search" />
				</div>
				<div className="profile-notification">
					<div className="notfication-count-and-icon">
						<i className="ri-notification-line notification-icon"></i>
						<div className="count-icon">
							<p>5</p>
						</div>
					</div>
					<img src={doctorPlaceholder} alt="iDoctor" />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
