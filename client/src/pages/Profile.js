import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, userSelector } from "../app/sphereReducer";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(userSelector));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  useEffect(() => {
    fetchData();
    if (localStorage.getItem("user")) {
      fetchData();
    } else {
      navigate("/sign-in");
    }
  }, [dispatch, navigate, user]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/profile", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      dispatch(actions.setUser(responseData.user));
      setUser(responseData.user);
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("user");
      navigate("/sign-in");
    }
  };

  const handleUpdate = async (e, uId) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("avatar", formData.avatar);

    try {
      const response = await fetch(
        `http://localhost:8000/users/update/${uId}`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      if (response.ok) {
        console.log("Data successfully sent to the server");
        setFormData({
          name: "",
          email: "",
          password: "", 
          avatar: null,
        });

        fetchData();
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error in sending data to the server", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <Meta title={"Profile"} />
      <Breadcrumb title={"Profile"} />
      <div className="profile-wrapper home-wrapper-2 p-4">
        <div className="container-xxl ">
          <div className="row ">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="d-flex gap-30 flex-column align-items-center">
                <div className="profile-photo bg-dark">
                  <img
                    className="img-fluid"
                    src={`http://localhost:8000${user.avatar}`}
                    alt="profileimg"
                  />
                </div>
                <div className="user-details d-flex flex-column card-wrapper">
                  <div className="d-flex gap-15 align-items-center">
                    <h6 className="mb-0">Name :</h6>
                    <p className="mb-0">{user?.name || "N/A"}</p>
                  </div>
                  <div className="d-flex gap-15 align-items-center">
                    <h6 className="mb-0">Email :</h6>
                    <p className="mb-0">{user?.email || "N/A"}</p>
                  </div>
                  <div className="d-flex gap-15 align-items-center">
                    <h6 className="mb-0">Password :</h6>
                    <p className="mb-0">{user?.password || "N/A"}</p>
                  </div>
                </div>
                <div className="update-user d-flex flex-column card-wrapper p-3">
                  <div>
                    <h4>Update Details</h4>
                  </div>
                  <form
                    encType="multipart/form-data"
                    onSubmit={(e) => handleUpdate(e, user._id)}
                  >
                    <input
                      type="text"
                      className="mb-3 form-control bg-light"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      className="mb-3 form-control bg-light"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="mb-3 form-control bg-light"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <input
                      type="file"
                      className="mb-3 form-control bg-light"
                      name="avatar"
                      placeholder="Profile Picture"
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <button
                        type="submit"
                        className="button text-white d-flex align-items-center justify-content-center"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
