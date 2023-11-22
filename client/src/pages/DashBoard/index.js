import { Modal } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { setPage } from "../../feature/user/authSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { renderPagination } from "../../constants/index";

import "./style.css";
import ListItems from "../../components/ListItems";
import CreateForm from "../../components/CreateForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [studentUpdate, setStudentUpdate] = useState(false);
  const [studentDelete, setStudentDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 6;
  const pagesToShow = 5;

  const navigate = useNavigate();

  useEffect(() => {
    // Debugging: Log the update state to verify changes
    dispatch(setPage({page:"dashboard"}))

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/get-users"
        );
        if (response.status === 201) {
          setData(response.data.users);
          // Debugging: Log the fetched data to verify
          console.log("Fetched Data in useEffect 1: ", response.data.users);
        }
      } catch (err) {
        console.log("Unable to find user, please connect to the server");
      }
    };

    fetchData();
  }, [studentUpdate, studentDelete]);

  useEffect(() => {
    // Debugging: Log the searchQuery state to verify changes
    console.log("Search Query in useEffect 2: ", searchQuery);

    // Check if data exists before filtering
    if (data.length > 0) {
      const filtered = data.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Debugging: Log the filtered data to verify
      console.log("Filtered Data in useEffect 2: ", filtered);

      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, data]);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data to display on the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setStudentUpdate(!studentUpdate);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (_id) => {
    console.log("handleNavigate");
    navigate(`/student-info/${_id}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <>
      <div className="dashBoard">
        <div className="searchContainer">
          <form
            method="GET"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the form from submitting
              // Set the search query to the input value
              setSearchQuery(e.target.elements.q.value);
            }}
          >
            <div className="relative text-gray-400 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </form>

          <button
            onClick={showModal}
            className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Create Student
          </button>
        </div>

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
              <p>No data found.</p>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-100">
              {currentPageData.map((person, index) => (
                <ListItems
                  key={index}
                  person={person}
                  setStudentDelete={setStudentDelete}
                  studentDelete={studentDelete}
                  handleNavigate={handleNavigate}
                />
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

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={700}
      >
        <CreateForm handleOk={handleOk} />
      </Modal>
    </>
  );
};

export default Dashboard;
