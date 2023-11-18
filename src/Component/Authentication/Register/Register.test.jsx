import { fireEvent, render, screen, act,waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import { DataRequest } from "../../service/api";

jest.mock("../service/api");

test("should show Register form", () => {
  const history = createMemoryHistory();


  // message
  // :
  // "User Registered Successfully"
  // status
  // :
  // 200

  render(
    <BrowserRouter history={history}>
      <Register />
    </BrowserRouter>
  );
  const title = screen.getByText("Register Your Account Here!");
  expect(title).toBeInTheDocument();
  const user = screen.getByText("User Name:");
  expect(user).toBeInTheDocument();
  const pas = screen.getByText("Password:");
  expect(pas).toBeInTheDocument();
});

test("Input check",async () => {
  const history = createMemoryHistory();
  act(() => {
    DataRequest.mockResolvedValue({
      data: {
        message: "User Registered Successfully",
        status: 200,
      },
      status: 200,
      statusText: "",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: null,
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        method: "post",
        url: "https://vehicles-data.onrender.com/user/user-register",
        data: '{"userName":"DineshKumar","userPassword":"1234","userEmail":"dineshkumar@gmail.com"}',
      },
      request: {},
    });
  });

  render(
    <BrowserRouter history={history}>
      <Register />
    </BrowserRouter>
  );
 await waitFor(()=>{{}})
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dinesh");
  expect(userInt).toBeInTheDocument();

  expect(userInt).toHaveValue("Dinesh");

  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234");
  expect(passInt).toBeInTheDocument();
  expect(passInt).toHaveValue("1234");
  const mailInt = screen.getByPlaceholderText("Enter Your Email");

  userEvent.type(mailInt, "dineshkumarddk1997@gmail.com");
  expect(mailInt).toBeInTheDocument();
  expect(mailInt).toHaveValue("dineshkumarddk1997@gmail.com");

  const sgnBtn = screen.getByRole("button", { name: "Sign Up" });
  expect(sgnBtn).toBeDefined();
  userEvent.type(userInt, "");
  userEvent.type(passInt, "");
  userEvent.type(mailInt, "");
  fireEvent.click(sgnBtn);

  userEvent.type(userInt, "Dinesh");
  userEvent.type(passInt, "1234");
  userEvent.type(mailInt, "dineshkumarddk1997");
  fireEvent.click(sgnBtn);
  expect(screen.getByText("Email is not Valid")).toBeInTheDocument();

  const iconbtn = screen.getByTestId("icon-visible");
  expect(iconbtn).toBeInTheDocument();
  fireEvent.click(iconbtn);
  fireEvent.mouseDown(iconbtn);

  userEvent.type(userInt, "Dineshkumar");
  userEvent.type(passInt, "1234");
  userEvent.type(mailInt, "dineshkumarddk1997@gamil.com");
  fireEvent.click(sgnBtn);

});


test("Input check",async () => {
  const history = createMemoryHistory();
  act(() => {
    DataRequest.mockResolvedValue({
      data: {
        message: "User Registered Successfully",
        status: 400,
      },
      status: 400,
      statusText: "",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: null,
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        method: "post",
        url: "https://vehicles-data.onrender.com/user/user-register",
        data: '{"userName":"DineshKumar","userPassword":"1234","userEmail":"dineshkumar@gmail.com"}',
      },
      request: {},
    });
  });

  render(
    <BrowserRouter history={history}>
      <Register />
    </BrowserRouter>
  );
 await waitFor(()=>{{}})
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dinesh");
  expect(userInt).toBeInTheDocument();

  expect(userInt).toHaveValue("Dinesh");

  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234");
  expect(passInt).toBeInTheDocument();
  expect(passInt).toHaveValue("1234");
  const mailInt = screen.getByPlaceholderText("Enter Your Email");

  userEvent.type(mailInt, "dineshkumarddk1997@gmail.com");
  expect(mailInt).toBeInTheDocument();
  expect(mailInt).toHaveValue("dineshkumarddk1997@gmail.com");

  const sgnBtn = screen.getByRole("button", { name: "Sign Up" });
  expect(sgnBtn).toBeDefined();
  userEvent.type(userInt, "");
  userEvent.type(passInt, "");
  userEvent.type(mailInt, "");
  fireEvent.click(sgnBtn);

  userEvent.type(userInt, "Dinesh");
  userEvent.type(passInt, "1234");
  userEvent.type(mailInt, "dineshkumarddk1997");
  fireEvent.click(sgnBtn);
  expect(screen.getByText("Email is not Valid")).toBeInTheDocument();

  const iconbtn = screen.getByTestId("icon-visible");
  expect(iconbtn).toBeInTheDocument();
  fireEvent.click(iconbtn);
  fireEvent.mouseDown(iconbtn);

  userEvent.type(userInt, "Dineshkumar");
  userEvent.type(passInt, "1234");
  userEvent.type(mailInt, "dineshkumarddk1997@gamil.com");
  fireEvent.click(sgnBtn);

});
// test("register check", () => {
//   const history = createMemoryHistory();
//   render(
//     <BrowserRouter history={history}>
//       <Register />
//     </BrowserRouter>
//   );
//   const userInt = screen.getByPlaceholderText("Enter Your User Name");

//   const passInt = screen.getByPlaceholderText("Enter Your Password");

//   const mailInt = screen.getByPlaceholderText("Enter Your Email");

//   const sgnBtn = screen.getByRole("button", { name: "Sign Up" });

//   userEvent.type(userInt, "Dineshkumar");
//   userEvent.type(passInt, "1234");
//   userEvent.type(mailInt, "dineshkumarddk1997@gamil.com");
//   fireEvent.click(sgnBtn);
// });
