import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { setPage } from "../";

import "./style.css";
import { useDispatch } from "react-redux";

const StudentInfo = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [student, setStudent] = useState({});

  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);

  const [lunchUpdate, setLunchUpdate] = useState(false);

  useEffect(() => {
    // dispatch(setPage({page:"studentInfo"}))
    // setDisplayData(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/get-user/${id}`
        );
        if (response.status === 200) {
          const studentData = response.data.user;
          const studentBreakfast = studentData.breakfast;
          const studentLunch = studentData.lunch;
          const studentDinner = studentData.dinner;
          const foodData = studentData.foodData;

          // Get the current date and time
          const currentDate = new Date();
          const currentHour = currentDate.getHours();

          // Check if it's breakfast time (8am to 10am) and foodData contains the latest current date
          if (!studentBreakfast && currentHour >= 8 && currentHour <= 10) {
            setBreakfast(true);
          }

          // Check if it's lunch time (1pm to 3pm) and foodData contains the latest current date
          if (!studentLunch && currentHour >= 13 && currentHour <= 14) {
            setLunch(true);
          }

          // Check if it's dinner time (8pm to 10pm) and foodData contains the latest current date
          if (!studentDinner && currentHour >= 20 && currentHour <= 21) {
            setDinner(true);
          }

          setStudent(studentData);
          console.log(studentData);
          // setDisplayData(true);
        }
      } catch (err) {
        console.log("Unable to find user, please connect to the server");
      }
    };

    fetchData();
  }, [lunchUpdate]);

  const handleFood = async (item) => {
    try {
      const response = await axios.post("http://localhost:3001/users/meal/", {
        item,
        student,
      });

      if (response.status === 200) {
        console.log(`${item} done!`);
        setLunchUpdate(!lunchUpdate);
        if (item === "Lunch") {
          setLunch(false);
        }

        if (item === "Breakfast") {
          setBreakfast(false);
        }

        if (item === "Dinner") {
          console.log("done done done")
          setDinner(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="studentInfo">
      {/* {displayData && <> */}
      
      
      <div className="info">
        <div className="image">
          <img
            style={{ border: "1px solid red" }}
            src={`http://localhost:3001/Users_Image/${student?.imgUrl}`}
            alt="#"
          />
        </div>

        <div className="input">
          <div>
            <label
              htmlFor="first-name"
              className="mt-0 block text-sm font-semibold leading-6 text-gray-900"
            >
              Student name
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                value={student?.name}
                disabled
                className="block w-full rounded-md border-0 px-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="mt-1.5 block text-sm font-semibold leading-6 text-gray-900"
            >
              Roll number
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                value={student?.rollNo}
                disabled
                className="block w-full rounded-md border-0 px-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="mt-1.5 block text-sm font-semibold leading-6 text-gray-900"
            >
              Branch
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                value={student?.branch}
                disabled
                className="block w-full rounded-md border-0 px-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="input">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                value={student?.phone}
                disabled
                className="block w-full rounded-md border-0 px-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="mt-1.5 block text-sm font-semibold leading-6 text-gray-900"
            >
              Student email
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                value={student?.studentEmail}
                disabled
                className="block w-full rounded-md border-0 px-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="mt-1.5 block text-sm font-semibold leading-6 text-gray-900"
            >
              Guardian email
            </label>
            <div className="mt-1.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                value={student?.guardianEmail}
                disabled
                className="block w-full rounded-md border-0 px-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="foodInfo">
        {breakfast ? (
          <div className="ENABLE" onClick={() => handleFood("Breakfast")}>
            <h1 className="text-xl font-bold text-red-600">Breakfast</h1>
            <p className="text-sm font-bold text-red-600">Tap to complete</p>
          </div>
        ) : (
          <div className="DISABLE">
            <h1 className="text-xl font-bold text-grey">Breakfast</h1>
            <p className="text-sm font-bold text-grey">
              Enable between 8AM to 10AM
            </p>
            {student.breakfast === true && <p>Breakfast done for today</p>}
          </div>
        )}

        {lunch ? (
          <div className="ENABLE" onClick={() => handleFood("Lunch")}>
            <h1 className="text-xl font-bold text-red-600">Lunch</h1>
            <p className="text-sm font-bold text-red-600">Tap to complete</p>
          </div>
        ) : (
          <div className="DISABLE">
            <h1 className="text-xl font-bold text-grey">Lunch</h1>
            <p className="text-sm font-bold text-grey">
              Enable between 1PM to 3PM
            </p>
            {student.lunch === true && <p>Lunch done for today</p>}
          </div>
        )}

        {dinner ? (
          <div className="ENABLE" onClick={() => handleFood("Dinner")}>
            <h1 className="text-xl font-bold text-red-600">Dinner</h1>
            <p className="text-sm font-bold text-red-600">Tap to complete</p>
          </div>
        ) : (
          <div className="DISABLE">
            <h1 className="text-xl font-bold text-grey">Dinner</h1>
            <p className="text-sm font-bold text-grey">
              Enable between 8PM to 10PM
            </p>
            {student.dinner === true && <p>Dinner done for today</p>}
          </div>
        )}
      </div>
      {/* </>} */}
    </div>
  );
};

export default StudentInfo;
