import { fireEvent, render, screen, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Table from "./Vehicle Details";
import { DataRequest } from "../../service/api";
import { userApiUrl, tableApiUrl } from "../../service/request";

test("render and title is showing", () => {
  render(
    <BrowserRouter history={history}>
      <Table />
    </BrowserRouter>
  );

  const title = screen.getByText("VEHICLE DETAILS");
  expect(title).toBeInTheDocument();

  const logBtn = screen.getByText("Log Out");
  expect(logBtn).toBeDefined();
  fireEvent.click(logBtn);
});

test("render with table Data", async () => {
  const history = createMemoryHistory();

  const response = await DataRequest("post", userApiUrl.userLogin, {
    userName: "Dineshdk",
    userPassword: "1234",
  });

  if (response) {
    console.log("response", response);
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("userName", response.data.result.username);
    var res = await DataRequest("post", tableApiUrl.getTableData, {
      token: response.data.token,
    });
    if (res) {
      console.log("res", res);

      const { findByTestId } = render(
        <BrowserRouter history={history}>
          <Table />
        </BrowserRouter>
      );

      const editbtn = await screen.findByTestId("edit-0");
      expect(editbtn).toBeInTheDocument();
      fireEvent.click(editbtn);

      const upadtebtn = await screen.findByTestId("update");
      expect(upadtebtn).toBeInTheDocument();
      fireEvent.click(upadtebtn);

      fireEvent.click(editbtn);
      const colorInt = screen.getByPlaceholderText("Enter Color");
      userEvent.clear(colorInt)
      const companyInt = screen.getByPlaceholderText("Enter Company");
      userEvent.clear(companyInt);
      const costInt = screen.getByPlaceholderText("Enter Cost");
      userEvent.clear(costInt);
      
      const modalInt = screen.getByPlaceholderText("Enter Modal");
      userEvent.clear(modalInt);
    
      const typeInt = screen.getByPlaceholderText("Enter Type");
      userEvent.clear(typeInt);
      fireEvent.click(upadtebtn);

      const deletebtn = await screen.findByTestId("delete-0");
      expect(deletebtn).toBeInTheDocument();
      // fireEvent.click(deletebtn);
    }
  }
});
test("render with table Data", async () => {
  const history = createMemoryHistory();

  const response = await DataRequest("post", userApiUrl.userLogin, {
    userName: "Dineshdk",
    userPassword: "1234",
  });

  if (response) {
    console.log("response", response);
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("userName", response.data.result.username);
    var res = await DataRequest("post", tableApiUrl.getTableData, {
      token: "gdfh",
    });
    if (res) {
      console.log("res", res);

      const { findByTestId } = render(
        <BrowserRouter history={history}>
          <Table />
        </BrowserRouter>
      );

    
    }
  }
});


test("Input check another", () => {
  const history = createMemoryHistory();

  render(
    <BrowserRouter history={history}>
      <Table />
    </BrowserRouter>
  );

  const typeInt = screen.getByPlaceholderText("Enter Type");
  userEvent.type(typeInt, "Car");
  expect(typeInt).toBeInTheDocument();
  expect(typeInt).toHaveValue("Car");

  const companyInt = screen.getByPlaceholderText("Enter Company");
  userEvent.type(companyInt, "Toyata");
  expect(companyInt).toBeInTheDocument();
  expect(companyInt).toHaveValue("Toyata");

  const modalInt = screen.getByPlaceholderText("Enter Modal");
  userEvent.type(modalInt, "2020");
  expect(modalInt).toBeInTheDocument();
  expect(modalInt).toHaveValue("2020");

  const colorInt = screen.getByPlaceholderText("Enter Color");
  userEvent.type(colorInt, "red");
  expect(colorInt).toBeInTheDocument();
  expect(colorInt).toHaveValue("red");

  const costInt = screen.getByPlaceholderText("Enter Cost");
  userEvent.type(costInt, "300k");
  expect(costInt).toBeInTheDocument();
  expect(costInt).toHaveValue("300k");

  const addBtn = screen.getByRole("button", { name: "Add" });
  // expect(addBtn).toBeInTheDocument()
  userEvent.click(addBtn);
 
});
test("Input check", () => {
  const history = createMemoryHistory();

  render(
    <BrowserRouter history={history}>
      <Table />
    </BrowserRouter>
  );

  const companyInt = screen.getByPlaceholderText("Enter Company");
  userEvent.type(companyInt, "");

  const modalInt = screen.getByPlaceholderText("Enter Modal");
  userEvent.type(modalInt, "");

  const colorInt = screen.getByPlaceholderText("Enter Color");
  userEvent.type(colorInt, "");

  const costInt = screen.getByPlaceholderText("Enter Cost");
  userEvent.type(costInt, "");
  const typeInt = screen.getByPlaceholderText("Enter Type");
  userEvent.type(typeInt, "");
  const addBtn = screen.getByRole("button", { name: "Add" });
  userEvent.click(addBtn);
});
