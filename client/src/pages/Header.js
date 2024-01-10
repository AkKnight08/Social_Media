import React, { useEffect, useState } from "react";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, loggedInSelector, userSelector } from "../app/sphereReducer";

const Header = () => {
  const navigate = useNavigate();
  const [user,setuser]=useState(useSelector(userSelector));
  const dispatch = useDispatch();
  const [loggedIn,setLoggedIn]=useState(false);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/profile/`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        dispatch(actions.setUser(data.user));
        setuser(data.user);
        if (localStorage.getItem("user")) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.log("Error checking login status", error);
      }
    };

    checkLoggedIn();
  }, [dispatch,loggedIn]);

  const handleLogOut = async () => {
    try {
      await fetch("http://localhost:8000/users/sign-out", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(actions.setUser({}));
      localStorage.removeItem("user");
      setLoggedIn(false);
      navigate("/sign-in");
    } catch (error) {
      console.log("Error in logging out", error);
    }
  };

  return (
    <>
      {/* Header top strip */}
      <header className="header-top-strip py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Welcome to the Social Sphere&nbsp; <FaRegHeart />
              </p>
            </div>
            <div className="col-6 gap-10">
              <p className="text-end text-white mb-0 gap-10">
                {!localStorage.getItem("user") ? (
                  <>
                    <Link to="/sign-in" className="text-white ms-3">
                      Sign In
                    </Link>
                    <Link to="/sign-up" className="text-white ms-3">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Header upper */}
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3">
              <h4>
                <Link className="text-white">
                  <span className="store-title"> Social Sphere.</span>
                </Link>
              </h4>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search For Posts, Friends here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p" id="basic-addon2">
                  <FaSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-links d-flex aling-items-center justify-content-end gap-10">
                <Link className="text-white ms-3">HomePage</Link>
                <Link className="text-white ms-3">Saved</Link>
                {localStorage.getItem("user") ? (
                  <>
                    <Link to="/profile" className="text-white ms-3">
                      Profile
                    </Link>
                    <Link onClick={handleLogOut} className="text-white ms-3">
                      Log Out
                    </Link>
                  </>
                ) : (
                  <Link to="/sign-in" className="text-white ms-3 ">
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
