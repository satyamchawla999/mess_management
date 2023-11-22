import React, { useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const ListItems = ({ person, setStudentDelete, studentDelete, handleNavigate }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleOk = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/delete-user",
        { _id: person._id }
      );
      if (response.status === 200) {
        setStudentDelete(!studentDelete);
        setIsModalOpen(false);
        openNotificationWithIcon("success",'Deleted successfully!')
      } else {
        openNotificationWithIcon("error",'Error in deleting student')
      }
    } catch (err) {
      openNotificationWithIcon("error",'Error in deleting student')
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handleNavigate = () => {
  //   console.log('handleNavigate');
  //   navigate(`/student-info/${person._id}`);
  // };

  const handleDelete = (e) => {
    e.stopPropagation();
    showModal();
  };
  return (
    <>
      {contextHolder}

      <li
        className="flex justify-between gap-x-6 py-2 px-2"
        onClick={()=>handleNavigate(person._id)}
      >
        <div className="flex min-w-0 gap-x-2">
          <img
            className="h-10 w-10 flex-none rounded-full bg-gray-50"
            src={`http://localhost:3001/Users_Image/${person?.imgUrl}`}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-2 text-gray-900">
              {person?.name}
            </p>
            <p className="mt-1 truncate text-xs leading-1 text-gray-500">
              {person?.studentEmail}
            </p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-2 text-gray-900">{person?.rollNo}</p>
            <p className="mt-1 text-xs leading-1 text-gray-500">
              <time>{person?.branch}</time>
            </p>
          </div>

          <div
            onClick={handleDelete}
            style={{
              cursor: "pointer",
              zIndex: "10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 10px 0px 30px",
            }}
          >
            <i
              style={{ color: "#DC2626" }}
              className="fa-regular fa-trash-can"
            ></i>
          </div>
        </div>
      </li>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        closable={false}
        width={400}
      >
        <div className="text-grey p-4">
          <p className="text-xl font-bold">Are you sure you want to delete?</p>
          <p className="text-sm">{person?.studentEmail}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleOk}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ListItems;
