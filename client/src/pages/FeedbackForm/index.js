import React, { useEffect, useState } from "react";
import userIconPhoto from "../../assets/images/userIcon.png";
import axios from "axios";
import { notification } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../feature/user/authSlice";


const FeedbackForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  const [studentForm, setStudentForm] = useState();
  const [feedbackInput, setFeedbackInput] = useState("");

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    dispatch(setPage({ page: "" }));

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/get-user/${id}`
        );
        if (response.status === 200) {
          setStudentForm(response.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/users/feedback",
        { feedback: feedbackInput, studentForm }
      );

      if (response.status === 200) {
        openNotificationWithIcon("success", "Feedback submitted successfully");
        setFeedbackInput("");
      } else {
        openNotificationWithIcon("error", "error in subbmiting feedback");
      }
    } catch (err) {
      openNotificationWithIcon("error", "error in subbmiting feedback");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "88vh",
      }}
    >
      {contextHolder}

      <h1 className="mb-1.5 text-xl font-bold text-grey">Feedback Form</h1>
      <form style={{ width: "50%" }}>
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Student name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="first-name"
              autoComplete="given-name"
              required
              disabled
              placeholder={studentForm?.name}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="roll-number"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Roll Number
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="rollNo"
              id="roll-number"
              autoComplete="family-name"
              disabled
              placeholder={studentForm?.rollNo}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone-number"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Student Email
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="phone"
              id="phone-number"
              autoComplete="given-name"
              disabled
              placeholder={studentForm?.studentEmail}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Feedback
          </label>
          <div className="mt-2.5">
            <textarea
              type="text"
              name="feedback"
              id="feedback"
              required
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              autoComplete="given-name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleFeedback}
            type="submit"
            className="block w-full rounded-md bg-red-600 text-white px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
