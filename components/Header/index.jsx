import React from "react";
import { Navbar } from "../Navbar";
import classes from "./Header.module.css";

const navLinks = [
  { path: "/", title: "Home" },
  { path: "/todos", title: "Todos" },
  { path: "/account", title: "Account" },
];

export default function Header({ children }) {
  return (
    <header className={classes.header}>
      <Navbar navLinks={navLinks} />
      {children}
    </header>
  );
}
