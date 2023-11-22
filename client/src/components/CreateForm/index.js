import axios from "axios";
import { notification } from "antd";
import userIconPhoto from "../../assets/images/userIcon.png";

const CreateForm = ({ handleOk }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const createStudent = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let photoFile = null;
    if (e.target.user_image.value) {
      photoFile = formData.get("user_image");
    }

    if (photoFile) {
      try {
        const response = await axios.post(
          "http://localhost:3001/users/add-user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          handleOk();

          e.target.reset();
          const userIcon = document.getElementById("user-circle-icon");
          userIcon.src = userIconPhoto;

          openNotificationWithIcon("success", "Student created successfully");
        }
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "Student with same email or roll-no is already exists"
        );
      }
    } else {
      openNotificationWithIcon("error", "Please select a image file to upload");
    }
  };

  return (
    <div>
      {contextHolder}
      <form
        method="POST"
        className="mx-auto mt-0 max-w-xl sm:mt-5"
        encType="multipart/form-data"
        onSubmit={createStudent}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "250px",
            }}
          >
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <img
                  id="user-circle-icon"
                  className="h-12 w-12 rounded-full ring-1 ring-inset ring-gray-400"
                  src={userIconPhoto}
                  alt="User Photo Preview"
                />

                <input
                  type="file"
                  accept="image/*"
                  name="user_image"
                  id="photo"
                  className="hidden"
                  onChange={(e) => {
                    // Handle file selection and preview here
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        // Set the preview image here
                        const previewImage = event.target.result;
                        // Update the UserCircleIcon with the preview image
                        const userCircleIcon =
                          document.getElementById("user-circle-icon");
                        if (userCircleIcon) {
                          userCircleIcon.src = previewImage;
                        }
                      };
                      reader.readAsDataURL(selectedFile);
                    }
                  }}
                />
                <label
                  htmlFor="photo"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  Change
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Branch
              </label>

              <select
                name="branch"
                className="mt-3.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              >
                <option value="B.TECH">B.TECH</option>
                <option value="BCA">BCA</option>
                <option value="B.PHARMA">B.PHARMA</option>
              </select>
            </div>
          </div>

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
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="phone"
                id="phone-number"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Student Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="studentEmail"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Guardian's Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="guardianEmail"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-600 text-white px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
