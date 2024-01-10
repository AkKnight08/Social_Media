import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, loggedInSelector, userSelector } from "../app/sphereReducer";

const Sign_In = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {}, [useSelector(userSelector)]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/users/create-session",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (responseData && responseData.message === "Pass") {
        setFormData({
          email: "",
          password: "Error in Password",
        });
      } else {
        localStorage.setItem("user", "auth");
        console.log("Data successfully sent to the server");
        setFormData({
          email: "",
          password: "",
        });

        dispatch(actions.setTrue());
        navigate("/");
      }
    } catch (error) {
      console.error("Error: in sending Sign In data to the server", error);
    }
  };

  return (
    <>
      <Meta title={"Account"} />
      <Breadcrumb title={"Account"} />
      <div className="login-page-wrapper home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="login-page d-flex align-item-center justify-content-center">
              <div className="col-4 card-wrapper p-3">
                <h3 className="login-title text-center">Sign-In</h3>
                <form onSubmit={handleSubmit}>
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
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-15 mt-3">
                      <Link className="mx-2" to="/forget-pass">
                        Forgot Password?
                      </Link>
                      <Link className="mx-2" to="/reset-pass">
                        Reset Password
                      </Link>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-15 mt-3">
                      <Link
                        className="button text-white text-center m-0 d-flex align-items-center justify-content-center"
                        to="/sign-up"
                      >
                        Sign Up
                      </Link>
                      <button
                        type="submit"
                        className="button text-white d-flex align-items-center justify-content-center"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
