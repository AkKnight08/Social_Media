import React, { useState } from "react";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Sign_Up = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8000/users/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Data successfully sent to the server");
      setFormData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error: in sending Sign up data to the server", error);
    }
  };

  return (
    <>
      <Meta title={"Sign up"} />
      <Breadcrumb title={"Sign up"} />
      <div className="signup-page-wrapper home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="login-page d-flex align-item-center justify-content-center">
              <div className="col-4 card-wrapper p-3">
                <h3 className="login-title text-center">
                  Welcome, Create Account
                </h3>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="mb-3 form-control bg-light"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="mb-3 form-control bg-light"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    className="mb-3 form-control bg-light"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    className="mb-3 form-control bg-light"
                    name="cpassword"
                    placeholder="Confirm Password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    required
                  />
                  <div className="d-flex align-items-center justify-content-center gap-15 mt-3 flex-column">
                    <button
                      type="submit"
                      className="button text-white d-flex align-items-center justify-content-center"
                    >
                      Sign Up
                    </button>
                    <Link
                      className="text-center m-0 d-flex align-items-center justify-content-center"
                      to="/sign-in"
                    >
                      Sign In
                    </Link>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_Up;
