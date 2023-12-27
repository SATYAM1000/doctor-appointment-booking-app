/** @format */

// UserFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "",
	email: "",
	phone: "",
	dateOfBirth: "",
	address: "",
	specialization: "",
	workExperience: "",
	degrees: "",
	hospital: "",
	gender: "",
	languageSpoken: "",
	availableTo: "",
	availableFrom: "",
	availableOn: "",
	linkedinLink: "",
	feePerConsultancy: "",
};

const applyDoctorSlice = createSlice({
	name: "doctorForm",
	initialState,
	reducers: {
		updateField(state, action) {
			const { field, value } = action.payload;
			state[field] = value;
		},
		resetForm(state) {
			return initialState;
		},
	},
});

export const { updateField, resetForm } = applyDoctorSlice.actions;
export default applyDoctorSlice.reducer;
