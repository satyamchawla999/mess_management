import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { renderPagination } from "../../constants/index";

import "./style.css";
import ListItems from "../../components/ListItems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPage } from "../../feature/user/authSlice";

const Feedback = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 3;
  const pagesToShow = 5;

  useEffect(() => {
    // Debugging: Log the update state to verify changes

    dispatch(setPage({ page: "feedback" }));

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/get-feedbacks"
        );
        if (response.status === 201) {
          setData(response.data.feedbacks);
          // Debugging: Log the fetched data to verify
          console.log("Fetched Data in useEffect 1: ", response.data.feedbacks);
          setFilteredData(response.data.feedbacks); // Set filteredData initially
        }
      } catch (err) {
        console.log("Unable to find feedback, please connect to the server");
      }
    };

    fetchData();
  }, []);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data to display on the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <>
      <div className="dashBoard">
        <div
          className="itemContainer text-gray-900"
          style={{
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {filteredData.length === 0 ? (
            <div
              style={{
                padding: "18px",
                width: "100%",
                height: "60px",
                borderBottom: "1px solid black",
                textAlign: "center",
              }}
            >
              <p>No Feedback's</p>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-100">
              {currentPageData.map((person, index) => (
                <li key={index} className="flex gap-x-6 py-2 px-2">
                  <div className="flex min-w-0 gap-x-2" style={{flexDirection:"column"}}>
                    <div style={{ display: "flex" , width:"1200px" ,paddingBottom:"5px" }}>
                      <img
                        className="h-10 w-10 flex-none rounded-full bg-gray-50"
                        src={`http://localhost:3001/Users_Image/${person?.imgUrl}`}
                        alt=""
                      />

                      <div style={{marginLeft:"10px"}}>
                        <p className="text-sm font-semibold leading-2 text-gray-900">
                          {person?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-1 text-gray-500">
                          {person?.email}
                        </p>
                      </div>
                    </div>
                    <div style={{ width:"1200px" ,paddingBottom:"5px"}} className="min-w-0 flex-auto">
                      <p className="text-sm leading-2 text-gray-900">
                        Feedback
                      </p>

                      <p className="mt-1 truncate text-xs leading-1 text-gray-500">
                        {person?.feedback}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between border-t border-black-700 bg-gray-300 px-4 py-3 sm:px1">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredData.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredData.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!canGoPrevious}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-red-400 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {renderPagination(
                    totalPages,
                    handlePageChange,
                    currentPage,
                    pagesToShow
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!canGoNext}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-red-400 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
