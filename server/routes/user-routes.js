/** @format */

import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
	registerUser,
	loginUser,
	getUserDetails,
	deleteUserAccount,
	markDoctorAsFavourite,
	accessUsersFavouriteDoctor,
} from "../controllers/user-controller.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post('/mark-favourite',authMiddleware,markDoctorAsFavourite);
userRouter.get("/info", authMiddleware, getUserDetails);
userRouter.delete('/delete',authMiddleware,deleteUserAccount);
userRouter.get('/favourite',authMiddleware,accessUsersFavouriteDoctor);

export default userRouter;
