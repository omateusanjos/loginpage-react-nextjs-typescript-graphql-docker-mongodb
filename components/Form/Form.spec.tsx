import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";

describe("Form", () => {
  const users = {
    users: {
      __typename: "users",
      _id: "5f4b8f9b9c8f5b3f8c8b8b8b",
      password: "123456",
      email: "mateus@gmail.com",
    },
  };

  describe("renders correctly when user is not authenticated", () => {
    it("the avatar must be visible", () => {
      render(<Form {...users} />);
      expect(
        screen.getByRole("img", {
          name: /avatar/i,
        })
      ).toBeInTheDocument();
    });
    it("the heading needs to have the word hello", () => {
      render(<Form {...users} />);
      expect(
        screen.getByRole("heading", {
          name: /olá/i,
        })
      ).toBeInTheDocument();
    });

    it("there needs to be two inputs with placeholder email and password", () => {
      render(<Form {...users} />);
      expect(screen.getByPlaceholderText(/e\-mail/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    });

    it("there must be a display password button", () => {
      render(<Form {...users} />);
      expect(
        screen.getByRole("button", {
          name: /exibir a senha/i,
        })
      ).toBeInTheDocument();
    });

    it("there must be a forgot password link", () => {
      render(<Form {...users} />);
      expect(screen.getByText(/esqueceu a senha\?/i)).toBeInTheDocument();
    });

    it("must have a button to enter", () => {
      render(<Form {...users} />);
      expect(
        screen.getByRole("button", {
          name: /entrar/i,
        })
      ).toBeInTheDocument();
    });

    it("must have the link to register", () => {
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
    });
    it("the button to reset the retry counter must be visible", () => {
      render(<Form {...users} />);
      expect(
        screen.getByRole("button", {
          name: /resetar contador de tentativas/i,
        })
      ).toBeInTheDocument();
    });

    it("the attempt counter must be visible", () => {
      render(<Form {...users} />);
      expect(
        screen.getByText(/contador de tentativas: 0/i)
      ).toBeInTheDocument();
    });
  });

  describe("renders correctly when user is authenticated", () => {
    it("the heading needs to have the word hello visible", () => {
      render(<Form {...users} />);
      const login = screen.getByRole("button", {
        name: /entrar/i,
      });

      userEvent.click(login);
      expect(
        screen.getByRole("heading", {
          name: /olá/i,
        })
      ).toBeInTheDocument();
    });

    it("there cannot be inputs with placeholder e-mail and password", () => {
      render(<Form {...users} />);

      const login = screen.getByRole("button", {
        name: /entrar/i,
      });

      userEvent.click(login);
      expect(screen.queryByPlaceholderText(/e\-mail/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/senha/i)).not.toBeInTheDocument();
    });

    it("must have a visible exit button", () => {
      render(<Form {...users} />);

      const login = screen.getByRole("button", {
        name: /entrar/i,
      });

      userEvent.click(login);
      expect(screen.getByText(/sair/i)).toBeInTheDocument();
    });

    it("when exiting, the Entrar button must be visible again", () => {
      render(<Form {...users} />);
     
      const login = screen.getByRole("button", {
        name: /entrar/i,
      });
      userEvent.click(login);
      const logout = screen.getByText(/sair/i);
      userEvent.click(logout);
      expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    });

  });
});
