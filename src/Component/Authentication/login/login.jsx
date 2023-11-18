import React, { useState } from "react";
import {
  Input,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataRequest } from "../../../service/api";
import "../../index.css";
import { userApiUrl } from "../../../service/request";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginuser = async () => {
    var res = await DataRequest("post", userApiUrl.userLogin, {
      userName: userName,
      userPassword: password,
    });
    console.log("---- login res", res);
    if (res.data.token) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userName", res.data.result.username);
      sessionStorage.setItem("isadmin", res.data.isAdmin);
      navigate("/dashboard-table");
    } else if (res.data.status === 401) {
      setOpenModal(!openModal);
      setMessage(res.data.message);
    } else if (res.data.status === 402) {
      setOpenModal(!openModal);
      setMessage(res.data.message);
    }else if (res.data.status === 450) {
      setOpenModal(!openModal);
      setMessage("You Don't have the Access");
    }
  };
  const NavigateForget = () => {
    if (userName !== "") {
      sessionStorage.setItem("userName", userName);
      navigate("/forgotpassowrd");
    } else {
      setOpenModal(!openModal);
      setMessage("Enter User Name");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          // width: "50%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "400px",
            // backgroundColor: "#ff99cc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "20px",
            color: "white",
          }}
        >
          <div>
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt="Profile"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                marginTop: "-70px",
              }}
            ></img>
          </div>
          <div className="d-flex align-items-center"></div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              alignItems: "start",
              rowGap: "10px",
            }}
          >
            <FormLabel style={{ color: "white" }}>User Name:</FormLabel>
            <Input
              type="text"
              value={userName}
              placeholder="Enter Your User Name"
              name="userName"
              id="userName"
              style={{ width: "260px", color: "white" }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const form = event.target.form;
                  if (userName !== "" && userName !== null) {
                    form.elements.password.focus();
                  } else {
                    setOpenModal(!openModal);
                    setMessage("Please Enter UserName");
                  }
                }
              }}
            />
            <FormLabel style={{ color: "white" }}>Password:</FormLabel>
            <Input
              //  id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              value={password}
              style={{
                width: "260px",
                color: "white",
                paddingRight: "10px",
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (userName !== "" && userName !== null) {
                    if (password !== "" && password) {
                      loginuser();
                    } else {
                      setOpenModal(!openModal);
                      setMessage("Please Enter Password");
                    }
                  } else {
                    setOpenModal(!openModal);
                    setMessage("Please Enter UserName");
                  }
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    data-testid={"icon-visible"}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff style={{ color: "white" }} />
                    ) : (
                      <Visibility style={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Link
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => {
                NavigateForget();
              }}
            >
              Forgot Password?
            </Link>
            {/* </div> */}
            <Button
              style={{ color: "white", width: "260px" }}
              onClick={() => {
                if (userName !== "" && userName !== null) {
                  if (password !== "" && password) {
                    loginuser();
                  } else {
                    setOpenModal(!openModal);
                    setMessage("Please Enter Password");
                  }
                } else {
                  setOpenModal(!openModal);
                  setMessage("Please Enter UserName");
                }
              }}
            >
              Login
            </Button>
            <p>
              If you don't have account
              <Link
                style={{
                  cursor: "pointer",
                  color: "#c6e51c",
                  marginLeft: "5px",
                }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </Link>
            </p>
          </form>
          <Modal sm={12} className="modal" show={openModal}>
            <div className="modal-div">
              <p>{message}</p>
              <Button
                data-testid="ok"
                onClick={() => {
                  setOpenModal(!openModal);
                }}
              >
                OK
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Login;
