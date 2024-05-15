/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
import OtpBox from "components/OtpBox";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInUser } from "store/auth/authThunk";
// import PhoneInput from "react-phone-input-2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Login = () => {
  const dispatch = useDispatch();
  const [phoneNumber, setNumber] = useState(null);
  const [otpStatus, setotpStatus] = useState(false);
  const [submitbutton, setSubmitbutton] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleInputChange = (e) => {
    setNumber(e);
  };

  const sendVerificationCode = (number) => async (dispatch) => {
    try {
      setSubmitbutton(true);
      const auth = getAuth();

      const recaptchaContainer = document.getElementById("recaptcha-container");

      if (!recaptchaContainer) {
        throw new Error("Recaptcha container not found");
      }

      const recaptchaVerifier = new RecaptchaVerifier(
        recaptchaContainer,
        {
          size: "invisible",
          callback: (response) => {},
        },
        auth
      );

      let data = await signInWithPhoneNumber(auth, number, recaptchaVerifier);
      console.log(data, "Otp Send sucessfully");
      setConfirmationResult(data);

      toast.success("otp send successfully!");
      setSubmitbutton(false);
      setotpStatus(true);
    } catch (error) {
      toast.error(error?.message);
      setSubmitbutton(false);
      // this.recaptchaVerifier.clear()
    }
  };

  const verifyPhoneNumber = async (value) => {
    try {
      const credential = await confirmationResult?.confirm(value);

      const user = credential?.user;
      console.log(user, "ahsan");

      dispatch(signInUser(user));
    } catch (error) {
      toast.error("Your OTP is incorrect");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendVerificationCode(phoneNumber));
    console.log(phoneNumber, "number");
  };

  const phoneInputProps = {
    name: "phoneNumber",
    required: true,
    autoFocus: true,
    className:
      "form-control shadow rounded w-100 py-4 ps-12 text-gray-700 leading-tight spacinginput ",
    id: "usernumber",
    onChange: handleInputChange,
    value: phoneNumber,
  };

  return (
    <>
      <Col lg="5" md="7">
        <div id="recaptcha-container" style={{ display: "none" }}></div>
        <Card className="bg-secondary shadow border-0">
          {otpStatus ? (
            <>
              <OtpBox otpHandle={verifyPhoneNumber} />
            </>
          ) : (
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in</small>
              </div>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    defaultCountry="pk"
                    className="form-control shadow rounded w-100 py-4 ps-12 text-gray-700 leading-tight outline-none"
                  />
                </FormGroup>

                <div className="text-center">
                  <button
                    className="my-2 btn  bg-default border-0 text-white"
                    type="submit"
                    disabled={submitbutton}
                  >
                    {" "}
                    {submitbutton ? "Loading..." : "Sign in"}
                  </button>
                </div>
              </Form>
            </CardBody>
          )}
        </Card>
        <Row className="mt-3">
          {/* <Col xs="6">
            <Link className="text-white" to="/auth/forgot-password">
              <small>Forgot password?</small>
            </Link>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default Login;
