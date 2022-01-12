import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import { debug } from "console";

describe("Form", () => {
  const usersDefault = {
    users: {
      __typename: "users",
      _id: "5f4b8f9b9c8f5b3f8c8b8b8b",
      password: "12345",
      email: "default@gmail.com",
    },
  };

  describe("renders correctly when user is not authenticated", () => {
    it("the avatar must be visible", () => {
      render(<Form {...usersDefault} />);
      expect(
        screen.getByRole("img", {
          name: /avatar/i,
        })
      ).toBeInTheDocument();
    });
    it("the heading needs to have the word hello", () => {
      render(<Form {...usersDefault} />);
      expect(
        screen.getByRole("heading", {
          name: /olá/i,
        })
      ).toBeInTheDocument();
    });

    it("there needs to be two inputs with placeholder email and password", () => {
      render(<Form {...usersDefault} />);
      expect(screen.getByPlaceholderText(/e\-mail/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    });

    it("there must be a display password button", () => {
      render(<Form {...usersDefault} />);
      expect(
        screen.getByRole("button", {
          name: /exibir a senha/i,
        })
      ).toBeInTheDocument();
    });

    it("there must be a forgot password link", () => {
      render(<Form {...usersDefault} />);
      expect(screen.getByText(/esqueceu a senha\?/i)).toBeInTheDocument();
    });

    it("must have a button to enter", () => {
      render(<Form {...usersDefault} />);
      expect(
        screen.getByRole("button", {
          name: /entrar/i,
        })
      ).toBeInTheDocument();
    });

    it("must have the link to register", () => {
      render(<Form {...usersDefault} />);
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
      render(<Form {...usersDefault} />);
      expect(
        screen.getByRole("button", {
          name: /resetar contador de tentativas/i,
        })
      ).toBeInTheDocument();
    });

    it("the attempt counter must be visible", () => {
      render(<Form {...usersDefault} />);
      expect(
        screen.getByText(/contador de tentativas: 0/i)
      ).toBeInTheDocument();
    });

    it("showPassword", () => {
      render(<Form {...usersDefault} />);

      const exibirButton = screen.getByRole("button", {
        name: /exibir/i,
      });

      userEvent.click(exibirButton);
      expect(screen.queryByText(/ocultar/i)).toBeInTheDocument();
      expect(screen.getByTestId(/password/i)).toHaveAttribute("type", "text");

      const ocultarButton = screen.getByRole("button", {
        name: /exibir/i,
      });
      userEvent.click(ocultarButton);
      expect(screen.queryByText(/exibir/i)).toBeInTheDocument();
      expect(screen.getByTestId(/password/i)).toHaveAttribute(
        "type",
        "password"
      );
    });

    it("resetCounter", () => {
      render(<Form {...usersDefault} />);
      const resetButton = screen.getByRole("button", {
        name: /resetar/i,
      });
      userEvent.click(resetButton);
      expect(
        screen.getByText(/contador de tentativas: 0/i)
      ).toBeInTheDocument();
    });

    it("input email does not have a value", () => {
      const usersNoEmail = {
        users: {
          __typename: "users",
          _id: "5f4b8f9b9c8f5b3f8c8b8b8b",
          password: "12345",
          email: "test@gmail.com",
        },
      };
      render(<Form {...usersNoEmail} />);
      const emailInput = screen.getByPlaceholderText(/e\-mail/i);
      const passwordInput = screen.getByPlaceholderText(/senha/i);
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");

      const loginButton = screen.getByRole("button", {
        name: /entrar/i,
      });

      userEvent.click(loginButton);
      expect(
        screen.getByText(/Email or password is required/i)
      ).toBeInTheDocument();
    });
  });

  describe("renders correctly when user is authenticated", () => {
    const usersLogged = {
      users: {
        __typename: "users",
        _id: "5f4b8f9b9c8f5b3f8c8b8b8b",
        password: "123456",
        email: "mateus@gmail.com",
      },
    };

    it("the heading needs to have the word hello visible", () => {
      render(<Form {...usersLogged} />);
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
      render(<Form {...usersLogged} />);

      const login = screen.getByRole("button", {
        name: /entrar/i,
      });

      userEvent.click(login);
      expect(screen.queryByPlaceholderText(/e\-mail/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/senha/i)).not.toBeInTheDocument();
    });

    it("must have a visible exit button", () => {
      render(<Form {...usersLogged} />);

      const login = screen.getByRole("button", {
        name: /entrar/i,
      });

      userEvent.click(login);
      expect(screen.getByText(/sair/i)).toBeInTheDocument();
    });

    it("when exiting, the Entrar button must be visible again", () => {
      render(<Form {...usersLogged} />);

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
