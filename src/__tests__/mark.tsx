import React from "react";
import { render, screen } from "@testing-library/react";

import { Mark } from "../components/mark";

test("Mark", () => {
  const name = "Key Words";
  const keyword = "Key";
  render(<Mark name={name} keyword={keyword} />);
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257AFD");
  expect(screen.getByText("Words")).not.toHaveStyle("color: #257AFD");
});
