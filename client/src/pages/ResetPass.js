import React from "react";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
const ResetPass = () => {
  return (
    <>
      <Meta title={"Reset Password"} />
      <Breadcrumb title={"Reset Password"} />
      <div className="reset-page-wrapper home-wrapper-2 py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="login-page d-flex align-item-center justify-content-center">
              <div className="col-4 card-wrapper p-3">
                <h3 className="login-title text-center">Reset Password</h3>
                <form action="">
                  <input
                    type="email"
                    className="mb-3 form-control bg-light"
                    id="email"
                    placeholder="Email"
                  ></input>
                  <input
                    type="password"
                    className="mb-3 form-control bg-light"
                    id="pass"
                    placeholder="Password"
                  ></input>
                  <input
                    type="password"
                    className="mb-3 form-control bg-light"
                    id="cpass"
                    placeholder="Confirm Password"
                  ></input>
                </form>
                <div>
                  <div className="d-flex align-items-center justify-content-center gap-15 mt-3 flex-column">
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

export default ResetPass;
