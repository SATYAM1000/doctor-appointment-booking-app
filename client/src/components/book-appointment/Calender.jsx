/** @format */

import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { add, format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const CalenderModule = (props) => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	};
	const { id } = useParams();
	const { dstartTime, dendTime } = props;
	const [isSlotBooked, setIsSlotBooked] = useState(false);
	const [allAppointments, setAllAppointments] = useState([]);
	const shrs = dstartTime.split(":")[0];
	const ehrs = dendTime.split(":")[0];
	console.log("shrs: ", shrs);
	console.log("ehrs: ", ehrs);
	console.log(dstartTime, dendTime);
	const [date, setDate] = useState({
		justDate: null,
		dateTime: null,
	});

	useEffect(() => {
		const doctorAppointments = async () => {
			try {
				let formattedDate =
					date.justDate || new Date().toISOString().split("T")[0];
				// If date.justDate is null, use the current date

				const response = await axios.get(
					`http://localhost:5000/api/appointments/all-appointment/?doctor_id=${id}&date=${formattedDate}`,
					{ headers }
				);

				setAllAppointments(response.data.appointments);
				console.log("response-appointments: ", response.data.appointments);
			} catch (error) {
				console.log("Error while fetching doctor appointments: ", error);
			}
		};

		doctorAppointments(); // Call the function immediately when the component mounts or when date.justDate changes
	}, [date.justDate]); // Added id and headers to the dependency array if they are used inside useEffect

	const handleBookTimeSlot = async () => {
		try {
			setIsSlotBooked(false);
			const datatobesent = {
				date: date.justDate,
				time: date.dateTime,
			};
			const response = await axios.post(
				`http://localhost:5000/api/appointments/book-appointment/${id}`,
				datatobesent,
				{ headers }
			);
			console.log(response.data);
			toast.success(response.data.message);
			setIsSlotBooked(true);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log("error while booking slot: ", error);
		}
	};
	const handleDateClick = (date) => {
		console.log("date: ", date);
	};

	const getTime = () => {
		if (!date.justDate) return;

		const { justDate } = date;

		const beginning = add(justDate, { hours: shrs });
		const end = add(justDate, { hours: ehrs });
		const interval = 15; //in minutes
		const times = [];
		for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
			times.push(i);
		}

		return times;
	};

	const times = getTime();
	return (
		<div className="calendar-component">
			<div className="container-for-calendar">
				{date.justDate ? (
					<div className="time-component">
						{times?.map((time, index) => (
							<div key={`time-${index}`} className="time-slot">
								<button
									type="button"
									onClick={() =>
										setDate((prev) => ({ ...prev, dateTime: time }))
									}>
									{format(time, "kk:mm")}
								</button>
							</div>
						))}
					</div>
				) : (
					<ReactCalendar
						minDate={new Date()}
						className="react-calendar"
						view="month"
						onClickDay={(date) =>
							setDate((prev) => ({ ...prev, justDate: date }))
						}
					/>
				)}
			</div>
			<div className="extra-btns">
				{date.justDate !== null ? (
					<button className="book-slot-btn" type="button" onClick={handleBookTimeSlot}>
						Book Slot
					</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default CalenderModule;
