import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import App from "./App";
import { BrowserRouter, Router } from "react-router-dom";

test("should show login form", () => {
  const history = createMemoryHistory();
  render(<App />);
});

