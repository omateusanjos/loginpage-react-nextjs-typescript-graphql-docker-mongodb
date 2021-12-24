import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";

const users = {
  users: {
    __typename: "users",
    _id: "5f4b8f9b9c8f5b3f8c8b8b8b",
    password: "123456",
    email: "sauhasu@gmail.com",
  },
};

describe("Form", () => {
  it("should render Form", () => {
    render(<Form {...users} />);
    expect(screen.getByText("Exibir")).toBeInTheDocument();
  });
});
