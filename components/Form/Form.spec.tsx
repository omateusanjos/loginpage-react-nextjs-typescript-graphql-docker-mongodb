import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";

describe("Form", () => {
  const users = {
    users: {
      __typename: "users",
      _id: "5f4b8f9b9c8f5b3f8c8b8b8b",
      password: "123456",
      email: "sauhasu@gmail.com",
    },
  };
  describe("renders correctly when user is not authenticated", () => {
    it("header", () => {
      render(<Form {...users} />);
      expect(
        screen.getByRole("img", {
          name: /avatar/i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("heading", {
          name: /olá/i,
        })
      ).toBeInTheDocument();
    });

    it("Box Form", () => {
      render(<Form {...users} />);
      expect(screen.getByPlaceholderText(/e\-mail/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: /exibir a senha/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/esqueceu a senha\?/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: /entrar/i,
        })
      ).toBeInTheDocument();
    });

    it("Not account", () => {
      render(<Form {...users} />);
      expect(screen.getByText(/não possui uma conta\?/i)).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: /cadastrar\-se/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: /cadastrar\-se/i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: /resetar contador de tentativas/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/contador de tentativas: 0/i)
      ).toBeInTheDocument();
    });
  });
});
