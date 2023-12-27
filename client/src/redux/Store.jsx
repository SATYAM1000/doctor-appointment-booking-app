/** @format */

import { configureStore } from "@reduxjs/toolkit";
// import { userSlice } from "./userSlice";
import applyDoctorSlice from "./applyDoctorSlice";
import alertSlice from "./alertSlice";

const store = configureStore({
	reducer: {
		applyDoctorForm: applyDoctorSlice,
		alerts:alertSlice,

	},
});

export default store;
