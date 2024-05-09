// /*!

// =========================================================
// * Argon Dashboard React - v1.2.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// // reactstrap components
// import { useState } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import {
//   getAuth,
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
// } from "firebase/auth";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "../../assets/css/custuminput.css";

// import {
//   Button,
//   Card,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
// } from "reactstrap";
// import OtpBox from "../../components/OtpBox";
// import { toast } from "react-toastify";
// import { signUpUser } from "store/auth/authThunk";

// const Register = () => {
//   const dispatch = useDispatch();
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [otpStatus, setotpStatus] = useState(false);
//   const [submitButton, setSubmitButton] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     paypalEmail: "",
//     phoneNumber: "",
//     identification: null,
//     profileImage: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e, fileType) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       [fileType]: file,
//     });
//   };

//   const phoneInputProps = {
//     name: "phoneNumber",
//     required: true,
//     autoFocus: true,
//     className:
//       "form-control shadow rounded w-100 py-4 ps-12 text-gray-700 leading-tight spacinginput ",
//     id: "usernumber",
//     onChange: handleInputChange,
//     value: formData?.phoneNumber,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     await dispatch(sendVerificationCode(formData));
//   };

//   const sendVerificationCode = (formData) => async (dispatch) => {
//     console.log(formData, "e");

//     try {
//       const auth = getAuth();
//       const phoneNumber = formData.phoneNumber;

//       const recaptchaContainer = document.getElementById("recaptcha-container");
//       setSubmitButton(true);
//       if (!recaptchaContainer) {
//         throw new Error("Recaptcha container not found");
//       }

//       const recaptchaVerifier = new RecaptchaVerifier(
//         recaptchaContainer,
//         {
//           size: "invisible",
//           callback: (response) => {},
//         },
//         auth
//       );

//       let data = await signInWithPhoneNumber(
//         auth,
//         phoneNumber,
//         recaptchaVerifier
//       );
//       setConfirmationResult(data);
//       console.log(data);

//       toast.success("otp send successfully!");
//       setSubmitButton(false);
//       setotpStatus(true);
//     } catch (error) {
//       toast.error(error?.message);
//       setSubmitButton(false);
//     }
//   };

//   const verifyPhoneNumber = async (value) => {
//     console.log(value, "otpcodebyahsan");

//     const credential = await confirmationResult?.confirm(value);
//     console.log(confirmationResult, "confirmationResultHAmzaIjaz");

//     const user = credential.user;

//     const data = formData;
//     console.log(data, "hamzaijaz");

//     await dispatch(signUpUser({ user, data }));
//   };

//   // const ahsan = true;
//   return (
//     <>
//       <Col lg="6" md="8">
//         <Card className="bg-secondary shadow border-0">
//           <div id="recaptcha-container" style={{ display: "none" }}></div>
//           <CardBody className="px-lg-5 py-lg-5">
//             <div className="text-center text-muted mb-4">
//               <small>Sign up</small>
//             </div>
//             {otpStatus ? (
//               <OtpBox otpHandle={verifyPhoneNumber} />
//             ) : (
//               <Form role="form" onSubmit={handleSubmit}>
//                 <FormGroup>
//                   <InputGroup className="input-group-alternative mb-3">
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="ni ni-hat-3" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input
//                       placeholder="First Name"
//                       type="text"
//                       name="firstName"
//                       onChange={handleInputChange}
//                       value={FormData.firstName}
//                       required
//                     />
//                   </InputGroup>
//                   <InputGroup className="input-group-alternative mb-3">
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="ni ni-hat-3" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input
//                       placeholder="Last Name"
//                       type="text"
//                       name="lastName"
//                       onChange={handleInputChange}
//                       value={FormData.lastName}
//                       required
//                     />
//                   </InputGroup>
//                 </FormGroup>
//                 <FormGroup>
//                   <InputGroup className="input-group-alternative mb-3">
//                     <InputGroupAddon addonType="prepend">
//                       <InputGroupText>
//                         <i className="ni ni-email-83" />
//                       </InputGroupText>
//                     </InputGroupAddon>
//                     <Input
//                       placeholder="Paypal Email"
//                       type="email"
//                       name="paypalEmail"
//                       onChange={handleInputChange}
//                       value={FormData.paypalEmail}
//                       required
//                     />
//                   </InputGroup>
//                 </FormGroup>
//                 <FormGroup className="mb-4">
//                   <InputGroup className="input-group-alternative">
//                     <PhoneInput
//                       country={"pk"}
//                       required
//                       inputProps={phoneInputProps}
//                     />
//                   </InputGroup>
//                 </FormGroup>
//                 <FormGroup className="mb-4">
//                   <label>Upload Photo of Government ID Card: </label>
//                   <InputGroup className="input-group-alternative">
//                     <Input
//                       type="file"
//                       autoComplete="new-email"
//                       required
//                       onChange={(e) => handleFileChange(e, "identification")}
//                     />
//                   </InputGroup>
//                 </FormGroup>
//                 <FormGroup className="mb-3">
//                   <label>Upload Your Selfie (Face Photo):</label>
//                   <InputGroup className="input-group-alternative">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       required
//                       autoComplete="new-email"
//                       onChange={(e) => handleFileChange(e, "profileImage")}
//                     />
//                   </InputGroup>
//                 </FormGroup>

//                 <Row className="my-4">
//                   <Col xs="12">
//                     <div>
//                       <h5 className="text-muted">
//                         <strong> HOST IDENTIFICATION </strong>– airCASITA
//                         collects identification data on hosts who register with
//                         airCASITA.com (government ID, selfie, name). Some of
//                         this identification data might be shared with guests
//                         booking at airCASITA.com.
//                       </h5>
//                     </div>
//                   </Col>
//                 </Row>
//                 <div className="text-center">
//                   <Button
//                     className="mt-4 btn  bg-default border-0 text-white"
//                     color="primary"
//                     type="submit"
//                     disabled={submitButton}
//                   >
//                     {submitButton ? "Loading...." : "Create account"}
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </CardBody>
//         </Card>
//         <Row className="mt-3">
//           <Col className="   text-white text-center">
//             <small>Already have an account? </small>
//             <Link className="   text-white" to="/auth/login">
//               Login
//             </Link>
//           </Col>
//         </Row>
//       </Col>
//     </>
//   );
// };

// export default Register;
