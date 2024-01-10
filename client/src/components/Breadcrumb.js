import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  const title = props.title;
  return (
    <>
      <div className="breakcrumb py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="breakcrumb-content">
                <Link className="text-dark" to="/">
                  Home
                </Link>
                &nbsp;/&nbsp;{title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
