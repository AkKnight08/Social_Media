import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, profileUserSelector} from "../app/sphereReducer";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";

const OtherProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(profileUserSelector));
  const { userId } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/users/profile/${userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        dispatch(actions.setProfileUser(responseData.user));
        setUser(responseData.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (localStorage.getItem("user")) {
      fetchData();
    } else {
      navigate("/sign-in");
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate, userId]);

  return (
    <>
      <Meta title={"Profile"} />
      <Breadcrumb title={"Profile"} />
      <div className="profile-wrapper home-wrapper-2 p-4">
        <div className="container-xxl ">
          <div className="row ">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="d-flex gap-30 flex-column align-items-center">
                <div className="profile-photo bg-dark"></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherProfile;
