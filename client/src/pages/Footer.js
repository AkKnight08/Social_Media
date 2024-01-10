import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
const Footer = () => {
  const contactnumber = "+91 9930684402";
  const email = "thisisakshayk@gmail.com";
  return (
    <>
      <footer className="py-1">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data gap-15 align-items-center d-flex">
                <FaRegNewspaper className="text-white fs-3 " />
                <h4 className="text-white mb-0">Sign Up For Newsletter</h4>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group p-3">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email..."
                  aria-label="Your Email..."
                  aria-describedby="basic-addon2"
                />
                <span
                  className="input-group-text p-2 text-white"
                  id="basic-addon2"
                >
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-5">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-4">
              <h5 className="text-white">Contact Us</h5>
              <div>
                <address className="text-white fs-6">
                  1292,2-floor , Sector-4, Krishna Nagar
                  <br />
                  Sector 4 Rewari, Haryana
                </address>
                <a
                  href={`tel:${contactnumber}`}
                  className="mt-4 text-white d-block"
                >
                  {contactnumber}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 text-white d-block "
                >
                  {email}
                </a>
                alt="social icons"
                <div className="social-icons d-flex gap-15">
                  <a href="/" className="text-white fs-4" alt="social icons">
                    <FaLinkedin />
                  </a>
                  <a href="/" className="text-white fs-4" alt="social icons">
                    <FaGithub />
                  </a>
                  <a href="/" className="text-white fs-4" alt="social icons">
                    <FaYoutube />
                  </a>
                  <a href="/" className="text-white fs-4" alt="social icons">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 ">
              <p className="text-start mb-0 text-white">
                &copy; {new Date().getFullYear()}, Powered By Akshay K.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
