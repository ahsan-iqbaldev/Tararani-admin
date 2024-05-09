import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

const OtpBox = ({ otpHandle }) => {
  const { loading } = useSelector((state) => state.auth);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef(
    Array(6).fill(null).map(() => React.createRef())
  );

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);

      if (index < inputRefs.current.length - 1 && value !== "") {
        inputRefs.current[index + 1].current.focus();
      }
    } else if (value.length === 0) {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);

      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index - 1] = "";
      setOtpValues(updatedOtpValues);
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const otpCode = otpValues.join("");
    otpHandle(otpCode);
    console.log(otpCode, "otpCode");
  };

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-8">
          <div className="card">
            <div className="card-body px-lg-10 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Phone Verification</small>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-center mb-4">
                  {otpValues?.map((value, index) => (
                    <div key={index} className="col-2">
                      <input
                        ref={inputRefs.current[index]}
                        className="form-control text-center mb-2"
                        type="text"
                        name=""
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="row justify-content-center mb-4">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn w-100 bg-default border-0 text-white"
                      disabled={loading}
                    >
                       {loading ? "Verifing..." : "Verify Account"}
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-12 text-center text-sm font-medium text-gray-500">
                    <p>Didn't receive the code?</p>{" "}
                    <a
                      className="text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpBox;
