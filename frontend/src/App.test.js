import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(); // Logs the current DOM structure
  const linkElement = screen.getByText(/Technical Support/i);
  expect(linkElement).toBeInTheDocument();
});
