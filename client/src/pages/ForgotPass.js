import React from "react";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
const ForgotPass = () => {
  return (
    <>
      <Meta title={"Forgot Password"} />
      <Breadcrumb title={"Forgot Password"} />
      <div className="forgot-pass-wrapper home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="login-page d-flex align-item-center justify-content-center">
              <div className="col-4 card-wrapper p-3">
                <h3 className="login-title text-center">Reset Your Password</h3>
                <h5 className="login-des text-center">
                  we will send you email to reset Password
                </h5>
                <form action="">
                  <input
                    type="email"
                    className="mb-3 form-control bg-light"
                    id="email"
                    placeholder="Email"
                  ></input>
                </form>
                <div>
                  <div className="d-flex flex-column align-items-center gap-15">
                    <button className="button text-white d-flex align-items-center justify-content-center">
                      Submit
                    </button>
                    <Link
                      className="text-center m-0 d-flex align-items-center justify-content-center"
                      to="/sign-in"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
