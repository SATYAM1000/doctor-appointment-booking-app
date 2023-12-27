/** @format */

import { useEffect, useState } from "react";
import Stepper from "../components/stepper/Stepper";
import "./ApplyDoctor.css";
import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../redux/applyDoctorSlice";
import ImagePlaceholder from "../assets/doctor.jpg";

import RejectFormAgain from "./RejectFormAgain.jsx";
import axios from "axios";

const PersonalDetails = () => {
	const dispatch = useDispatch();
	const formValues = useSelector((state) => state.applyDoctorForm);

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		dispatch(updateField({ field: name, value }));
	};
	return (
		<div className="personal-details">
			<h3>
				Personal <span>Information</span>
			</h3>
			<form className="personal-details-form">
				<input
					type="text"
					placeholder="Name"
					value={formValues.name}
					onChange={handleInput}
					name="name"
					autoComplete="off"
				/>
				<input
					type="text"
					placeholder="Email"
					value={formValues.email}
					onChange={handleInput}
					name="email"
					required
					autoComplete="off"
				/>
				<input
					type="text"
					placeholder="Phone"
					value={formValues.phone}
					onChange={handleInput}
					name="phone"
					required
					autoComplete="off"
				/>
				<input
					type="date"
					placeholder="Date of Birth"
					value={formValues.dateOfBirth}
					onChange={handleInput}
					name="dateOfBirth"
					required
					autoComplete="off"
				/>
				<input
					type="text"
					placeholder="Address"
					value={formValues.address}
					onChange={handleInput}
					name="address"
					required
					autoComplete="off"
				/>
			</form>
		</div>
	);
};

const ProfessionalDetails = () => {
	const dispatch = useDispatch();
	const formValues = useSelector((state) => state.applyDoctorForm);
	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		dispatch(updateField({ field: name, value }));
	};

	return (
		<div className="personal-details">
			<h3>
				Professional <span>Information</span>
			</h3>

			<form className="personal-details-form">
				<input
					name="workExperience"
					type="text"
					placeholder="Work Experience"
					value={formValues.workExperience}
					onChange={handleInput}
					required
					autoComplete="off"
				/>
				<input
					name="specialization"
					type="text"
					placeholder="Specialization"
					value={formValues.specialization}
					onChange={handleInput}
					required
					autoComplete="off"
				/>
				<input
					name="degrees"
					type="text"
					placeholder="Degrees"
					value={formValues.degrees}
					onChange={handleInput}
					required
					autoComplete="off"
				/>

				<input
					name="hospital"
					type="text"
					placeholder="Hospital/Clinic currently working with"
					value={formValues.hospital}
					onChange={handleInput}
					required
					autoComplete="off"
				/>
			</form>
		</div>
	);
};

const MustDetails = () => {
	const dispatch = useDispatch();
	const formValues = useSelector((state) => state.applyDoctorForm);
	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		dispatch(updateField({ field: name, value }));
	};

	return (
		<div className="personal-details">
			<h3>
				Availability <span>Preferences</span>
			</h3>
			<form className="personal-details-form">
				<div className="availableon-field">
					<label htmlFor="availableFrom">Available On</label>
					<input
						className="imp"
						type="text"
						value={formValues.availableOn}
						name="availableOn"
						autoComplete="off"
						required
						onChange={handleInput}
						placeholder="Write Comma Separated Weekdays"
					/>
				</div>
				<div className="availablefrom-field">
					<label htmlFor="availableFrom">Available From</label>
					<input
						type="time"
						value={formValues.availableFrom}
						name="availableFrom"
						autoComplete="off"
						required
						onChange={handleInput}
					/>
				</div>

				<div className="availabletill-field">
					<label htmlFor="availableFrom">Available Till</label>
					<input
						type="time"
						value={formValues.availableTo}
						name="availableTo"
						autoComplete="off"
						required
						onChange={handleInput}
					/>
				</div>
			</form>
		</div>
	);
};

const ExtraDetails = () => {
	const dispatch = useDispatch();
	const formValues = useSelector((state) => state.applyDoctorForm);
	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		dispatch(updateField({ field: name, value }));
	};

	return (
		<div className="personal-details">
			<h3>
				Additional <span>Information</span>
			</h3>
			<form className="personal-details-form">
				<input
					type="text"
					placeholder="Gender"
					value={formValues.gender}
					onChange={handleInput}
					name="gender"
					required
					autoComplete="off"
				/>
				<input
					type="text"
					placeholder="Language Spoken"
					value={formValues.languageSpoken}
					onChange={handleInput}
					name="languageSpoken"
					required
					autoComplete="off"
				/>

				<input
					type="text"
					placeholder="Fee Per Consultancy"
					value={formValues.feePerConsultancy}
					onChange={handleInput}
					name="feePerConsultancy"
					required
					autoComplete="off"
				/>
				<input
					type="text"
					placeholder="LinkedIn"
					value={formValues.linkedinLink}
					onChange={handleInput}
					name="linkedinLink"
					required
					autoComplete="off"
				/>
			</form>
		</div>
	);
};

const UploadImage = () => {
	const [image, setImage] = useState(null);
	const [profileImage, setProfileImage] = useState("");

	// ... (other code remains unchanged)

	useEffect(() => {
		const getProfileImage = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/doctors/profile-image",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json",
						},
					}
				);
				console.log("response while getting image: ", response.data);
				
					setProfileImage(response.data.path);
					
					
				
			} catch (error) {
				console.log("error while retrieving profile image error: ", error);
			}
		};

		getProfileImage();
		console.log("profileImage: ", profileImage);
	});

	useEffect(() => {
		const submitImage = async () => {
			try {
				if (image) {
					const formData = new FormData();
					formData.append("image", image);

					const response = await axios.post(
						"http://localhost:5000/api/doctors/upload",
						formData,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
								"Content-Type": "multipart/form-data",
							},
						}
					);
					console.log("Image uploaded", response.data);
				}
			} catch (error) {
				console.log("Error while uploading image: ", error);
			}
		};

		submitImage(); // Call submitImage when image changes
		console.log("profileImage2:",profileImage)
	}, [image]);

	const handleImageChange = async (e) => {
		const selectedFile = e.target.files[0];

		if (selectedFile) {
			setImage(selectedFile);
		}
	};

	return (
		<div className="personal-details">
			<div className="profile-image-upload">
				<img
					src={image?{image}:ImagePlaceholder}
					alt=""
				/>

				<div className="upload-image-label">
					<label id="image-label" htmlFor="image-file">
						<i className="fa-solid fa-pen-to-square"></i>
					</label>
					<input
						type="file"
						id="image-file"
						accept="image/*"
						onChange={handleImageChange}
						name="image"
					/>
				</div>
			</div>
		</div>
	);
};

const ApplyDoctor = () => {
	function canFillFormAgain() {
		const formSubmissionTimestamp = localStorage.getItem(
			"formSubmissionTimestamp"
		);

		if (formSubmissionTimestamp) {
			const currentTime = new Date().getTime();
			const timeDifference =
				currentTime - parseInt(formSubmissionTimestamp, 10);
			const hoursPassed = timeDifference / (1000 * 60 * 60);

			return hoursPassed >= 48;
		}

		return true;
	}
	const formRequest = canFillFormAgain();
	const componentsList = [
		<UploadImage />,
		<PersonalDetails />,
		<ProfessionalDetails />,
		<MustDetails />,
		<ExtraDetails />,
	];
	return (
		<div className="apply-doctor-page">
			{formRequest ? (
				<Stepper componentsList={componentsList} />
			) : (
				<RejectFormAgain />
			)}
		</div>
	);
};

export default ApplyDoctor;
