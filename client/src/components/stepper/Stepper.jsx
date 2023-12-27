/** @format */

import { useState } from "react";
import "./Stepper.css";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice.js";
import { resetForm } from "../../redux/applyDoctorSlice.js";
import axios from "axios";
import { toast } from "react-toastify";

const Stepper = ({ componentsList }) => {
	const dispatch = useDispatch();
	const formValues = useSelector((state) => state.applyDoctorForm);
	const [currentCount, setCurrentCount] = useState(0);
	const directTranscationStep = (value) => {
		if(value<currentCount){
			setCurrentCount(value - 1);
		}
	};

	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	};

	const handleApplyDoctorFormSubmit = async (e) => {
		e.preventDefault();
		const allFieldsFilled = Object.values(formValues).every(
			(value) => value.trim() !== ""
		);
		if (allFieldsFilled) {
			try {
				dispatch(showLoading());
				const response = await axios.post(
					"http://localhost:5000/api/doctors/register",
					formValues,
					{ headers }
				);
				dispatch(hideLoading());
				if (response.data.success) {
					toast.success(response.data.message);
					const currentTime = new Date().getTime();
					localStorage.setItem('formSubmissionTimestamp', currentTime.toString());
					setCurrentCount(0);
					dispatch(resetForm());
				} else {
					toast.error(response.data.message);
					dispatch(resetForm());
					setCurrentCount(0);
				}
			} catch (error) {
				dispatch(hideLoading());
				console.log("error while registering doctor: ", error);
				toast.error("Something went wrong");
				dispatch(resetForm());
				setCurrentCount(0);
			}
		} else {
			toast.error("Please fill all the fields");
		}
	};
	const componentCount = componentsList.length;
	const steps = [];
	for (let i = 1; i < componentCount + 1; i++) {
		steps.push(
			<div
				key={i}
				className={i <= currentCount ? "fulfilled-step" : "step"}
				onClick={() => {
					directTranscationStep(i);
				}}>
				{currentCount < i ? <p>{i}</p> : <i className="fa-solid fa-check"></i>}
			</div>
		);
	}

	const onNext = () => {
		if (currentCount == 0) {
			setCurrentCount(currentCount + 1);
		} else if (
			currentCount === 1 &&
			formValues.name !== "" &&
			formValues.email !== "" &&
			formValues.phone !== "" &&
			formValues.address !== "" &&
			formValues.dateOfBirth !== "" &&
			currentCount < componentCount - 1
		) {
			setCurrentCount(currentCount + 1);
		} else if (
			currentCount === 2 &&
			formValues.specialization !== "" &&
			formValues.workExperience !== "" &&
			formValues.degrees !== "" &&
			formValues.hospital !== "" &&
			currentCount < componentCount - 1
		) {
			setCurrentCount(currentCount + 1);
		} else if (
			currentCount === 3 &&
			formValues.availableOn !== "" &&
			formValues.availableTo !== "" &&
			formValues.availableFrom !== "" &&
			currentCount < componentCount - 1
		) {
			setCurrentCount(currentCount + 1);
		}
	};

	const onPrev = () => {
		if (currentCount > 0) {
			setCurrentCount(currentCount - 1);
		}
	};

	const progressLineWidth = (100 / (componentCount - 1)) * currentCount;
	return (
		<div className="stepper-and-form-container">
			<div className="stepper">
				{steps}
				<div
					className="progress-line"
					style={{ width: `${progressLineWidth}%` }}></div>
			</div>
			<div className="form-container-and-btn">
				<div className="form-fill-area">{componentsList[currentCount]}</div>
				<div className="prev-next-btn">
					{currentCount === 0 ? "" : <button onClick={onPrev}>Previous</button>}
					{currentCount === componentCount - 1 ? (
						<button onClick={handleApplyDoctorFormSubmit}>Submit</button>
					) : (
						<button onClick={onNext}>Next</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Stepper;
