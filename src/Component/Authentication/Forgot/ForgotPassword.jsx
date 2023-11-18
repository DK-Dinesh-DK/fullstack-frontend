import React, { useEffect, useState } from "react";
import { FormLabel, Input, IconButton, InputAdornment } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Button } from "react-bootstrap";
import { DataRequest } from "../../../service/api";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userApiUrl } from "../../../service/request";
const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSended, setOtpSended] = useState(true);
  const [otp, setOtp] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  let user = sessionStorage.getItem("userName");

  const generateotp = async (value) => {
    const response = await DataRequest("post",userApiUrl.userGenerateOtp, {
      userName: value,
    });
 
    if (response.data.status === 200) {
      setToken(response.data.token);
      setOtpSended(!otpSended);
    }
  };
  const VerifyOtp = async () => {
    const response = await DataRequest("post",userApiUrl.userVerifyOtp, {
      otp: otp,
      token: token,
      userName: user,
    });
    if (response.data.status === 200) {
      setOtpVerified(!otpVerified);
    }
  };
  const ChnagePassword = async () => {
    if (newPassword === confirmPassword) {
      const response = await DataRequest("post",userApiUrl.userChangePassword, {
        userName: user,
        userPassword: newPassword,
      });
      if (response.status === 200) {
        setSuccessModal(!successModal);
        setSuccessMessage("Password Updated Successfully");
      } else if (response.status === 402) {
        setErrorModal(!errorModal);
        setErrorMessage("Time Expired ");
      }
    } else {
      setErrorModal(!errorModal);
      setErrorMessage("New Password and Confirm Password Must be same");
    }
  };

  useEffect(() => {
    generateotp(user);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:"white"
      }}
    >
  
      <div
        style={{
          // width: "50%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          color:"white"
        }}
      >
        <div
          style={{
            height: "500px",
            width: "400px",
           // backgroundColor: "#ff99cc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "20px",
            color: "black",
          }}
        >
          <div>
            <label style={{ color: "white", fontSize: "20px" }}>
              {otpVerified ? "Reset Password" : "Forgot Password"}
            </label>
          </div>
          <div className="d-flex align-items-center"></div>
          {otpVerified ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                alignItems: "start",
                rowGap: "10px",
              }}
            >
              <FormLabel style={{ color: "white" }}>New Password:</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="newpassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                style={{
                  width: "260px",
                  backgroundColor: "white",
                  paddingRight: "10px",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff style={{color:"white"}} /> : <Visibility style={{color:"white"}}/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormLabel style={{ color: "white" }}>
                Confirm Password:
              </FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                style={{
                  width: "260px",
                  backgroundColor: "white",
                  paddingRight: "10px",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff style={{color:"white"}} /> : <Visibility style={{color:"white"}}/>}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Button style={{ width: "260px" }} onClick={ChnagePassword}>
                Change Password
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
                alignItems: "start",
                rowGap: "10px",
                color:"white"
              }}
            >
              <FormLabel style={{ color: "white" }}>Enter Your OTP:</FormLabel>
              <OTPInput
                value={otp}
                onChange={setOtp}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                style={{ margin: "10px 0" }}
                // secure
              />

              {otpSended ? (
                <LinearProgress style={{ width: "100%" }} />
              ) : (
                <>
                  <p >OTP sended Your Registered Email</p>
                  <ResendOTP
                    style={{ marginBottom: "20px" }}
                    onResendClick={() => setOtp("")}
                  />
                  <Button style={{ width: "260px" }} onClick={VerifyOtp}>
                    Verify OTP
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
        <Modal className="modal" show={errorModal}>
          <div className="modal-div">
            <p>{errorMessage}</p>
            <Button
              onClick={() => {
                setErrorModal(!errorModal);
              }}
            >
              OK
            </Button>
          </div>
        </Modal>
        <Modal className="modal" show={successModal}>
          <div className="modal-div">
            <p>{successMessage}</p>
            <Button
              onClick={() => {
                setSuccessModal(!successModal);
                navigate("/");
              }}
            >
              OK
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default ForgotPassword;
