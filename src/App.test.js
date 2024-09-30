import { render, screen } from "@testing-library/react";
import Project_Task from "./Project_Task";
test("renders learn react link", () => {
  render(<Project_Task />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
