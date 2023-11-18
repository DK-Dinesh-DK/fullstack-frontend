import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import Login from "./login";
import { BrowserRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { DataRequest } from "../../../service/api";

jest.mock("../service/api");

test("should show login form", () => {
  const history = createMemoryHistory();
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );
  const user = screen.getByText("User Name:");
  expect(user).toBeInTheDocument();
  const pass = screen.getByText("Password:");
  expect(pass).toBeInTheDocument();
});

test("Input check", () => {
  const history = createMemoryHistory();
  const handleKeyPress = jest.fn();
  render(
    <BrowserRouter history={history}>
      <Login handleKeyPress={handleKeyPress} />
    </BrowserRouter>
  );

  const iconbtn = screen.getByTestId("icon-visible");
  expect(iconbtn).toBeInTheDocument();
  fireEvent.click(iconbtn);
  fireEvent.mouseDown(iconbtn);

  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dinesh");
  expect(userInt).toBeInTheDocument();

  expect(userInt).toHaveValue("Dinesh");

  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234");
  expect(passInt).toBeInTheDocument();
  expect(passInt).toHaveValue("1234");
});
test("Input check", () => {
  const history = createMemoryHistory();
  const handleKeyPress = jest.fn();
  render(
    <BrowserRouter history={history}>
      <Login handleKeyPress={handleKeyPress} />
    </BrowserRouter>
  );

  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "");
  fireEvent.keyDown(userInt, { key: "Enter" });
  expect(screen.getByText("Please Enter UserName")).toBeInTheDocument();

  userEvent.type(userInt, "Dinesh");
  fireEvent.keyDown(userInt, { key: "Enter" });
});

test("forgot check", () => {
  const history = createMemoryHistory();
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );
  const forgot = screen.getByText("Forgot Password?");
  expect(forgot).toBeInTheDocument();
  fireEvent.click(forgot);
  expect(screen.getByText("Enter User Name")).toBeInTheDocument();

  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dinesh");
  expect(userInt).toHaveValue("Dinesh");
  fireEvent.click(forgot);
  expect(sessionStorage.getItem("userName")).toEqual("Dinesh");
});

test("Password input onkeydown", async () => {
  const history = createMemoryHistory();

  const handleKeyPress = jest.fn();
  render(
    <BrowserRouter history={history}>
      <Login handleKeyPress={handleKeyPress} />
    </BrowserRouter>
  );
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "");
  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234");
  fireEvent.keyDown(passInt, { key: "Enter" });

  expect(screen.getByText("Please Enter UserName")).toBeInTheDocument();
  // Please Enter UserName
});

test("Password input onkeydown anotherone", async () => {
  const history = createMemoryHistory();

  const handleKeyPress = jest.fn();
  render(
    <BrowserRouter history={history}>
      <Login handleKeyPress={handleKeyPress} />
    </BrowserRouter>
  );
  const userInt = screen.getByPlaceholderText("Enter Your User Name");

  const passInt = screen.getByPlaceholderText("Enter Your Password");

  userEvent.type(userInt, "Dineshdk");
  userEvent.type(passInt, "");
  fireEvent.keyDown(passInt, { key: "Enter" });
  expect(screen.getByText("Please Enter Password")).toBeInTheDocument();
});
test("Password input onkeydown anotherone-1", async () => {
  const history = createMemoryHistory();

  const handleKeyPress = jest.fn();
  act(() => {
    DataRequest.mockResolvedValue({
      data: {
        message: "user",
        result: {
          _id: "63bfd717b0abcc9d6edebe97",
          username: "Dineshdk",
          password:
            "$2a$10$hKu8jFWFCxumZ0YEA9O2HOb41QhLJTTprHKpidIPRfrmOx5ktZmGe",
          email: "dineshkumarddk1997@gmail.com",
        },
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGluZXNoZGsiLCJpYXQiOjE2NzkzOTQ3MTAsImV4cCI6MTY3OTM5ODMxMH0.i66eme6Tra85os4zbQmBSWb1zHhC89Lv7HsP207QjDU",
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
        url: "https://vehicles-data.onrender.com/user/login",
        data: '{"userName":"Dineshdk","userPassword":"1234"}',
      },
      request: {},
    });
  });
  render(
    <BrowserRouter history={history}>
      <Login handleKeyPress={handleKeyPress} />
    </BrowserRouter>
  );
  await waitFor(() => {
    {
    }
  });
  const userInt = screen.getByPlaceholderText("Enter Your User Name");

  const passInt = screen.getByPlaceholderText("Enter Your Password");

  userEvent.type(userInt, "Dineshdk");
  userEvent.type(passInt, "1234");
  fireEvent.keyDown(passInt, { key: "Enter" });
});
test("Login api ", async () => {
  const history = createMemoryHistory();
  act(() => {
    DataRequest.mockResolvedValue({
      data: {
        message: "user",
        result: {
          _id: "63bfd717b0abcc9d6edebe97",
          username: "Dineshdk",
          password:
            "$2a$10$hKu8jFWFCxumZ0YEA9O2HOb41QhLJTTprHKpidIPRfrmOx5ktZmGe",
          email: "dineshkumarddk1997@gmail.com",
        },
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGluZXNoZGsiLCJpYXQiOjE2NzkzOTQ3MTAsImV4cCI6MTY3OTM5ODMxMH0.i66eme6Tra85os4zbQmBSWb1zHhC89Lv7HsP207QjDU",
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
        url: "https://vehicles-data.onrender.com/user/login",
        data: '{"userName":"Dineshdk","userPassword":"1234"}',
      },
      request: {},
    });
  });
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );
  await waitFor(() => {
    {
    }
  });
  const logBtn = screen.getByRole("button", { name: "Login" });
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dineshdk");
  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234");
  fireEvent.click(logBtn);
  
  // const okbtn = await screen.findByTestId("ok");
});

test("Login api call false methods ", async () => {
  const history = createMemoryHistory();
  act(() => {
    DataRequest.mockResolvedValue({
      data: {
        message: "User not Found",
        status: 401,
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
        url: "https://vehicles-data.onrender.com/user/login",
        data: '{"userName":"Dineshhshshs","userPassword":"1234"}',
      },
      request: {},
    });
  });
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );
  await waitFor(() => {
    {
    }
  });
  const logBtn = screen.getByRole("button", { name: "Login" });
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "qywyeyer");
  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234");
  fireEvent.click(logBtn);
});
test("Login api call false methods ", async () => {
  const history = createMemoryHistory();
  act(() => {
    DataRequest.mockResolvedValue({
      data: {
        message: "Password is wrong",
        status: 402,
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
        url: "https://vehicles-data.onrender.com/user/login",
        data: '{"userName":"Dineshdk","userPassword":"12343erd124323"}',
      },
      request: {},
    });
  });
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );
  await waitFor(() => {
    {
    }
  });
  const logBtn = screen.getByRole("button", { name: "Login" });
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dineshdk");
  const passInt = screen.getByPlaceholderText("Enter Your Password");
  userEvent.type(passInt, "1234645");
  fireEvent.click(logBtn);
});
test("Login button click false", async () => {
  const history = createMemoryHistory();

  const handleKeyPress = jest.fn();
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );
  const logBtn = screen.getByRole("button", { name: "Login" });
  const userInt = screen.getByPlaceholderText("Enter Your User Name");
  userEvent.type(userInt, "Dinesh");
  fireEvent.click(logBtn);
  expect(screen.getByText("Please Enter Password")).toBeInTheDocument();
});

test("Login button click false -1", () => {
  const history = createMemoryHistory();
  render(
    <BrowserRouter history={history}>
      <Login />
    </BrowserRouter>
  );

  const logBtn = screen.getByRole("button", { name: "Login" });
  expect(logBtn).toBeDefined();
  fireEvent.click(logBtn);
  expect(screen.getByText("Please Enter UserName")).toBeInTheDocument();

  const register = screen.getByText("Register here");
  expect(register).toBeInTheDocument();
  fireEvent.click(register);
});
