import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./Navbar.module.css";

export const Navbar = ({ navLinks }) => {
  const router = useRouter();

  return (
    <nav className={classes.nav}>
      {navLinks.map(({ path, title }, i) => (
        <Link key={i} href={path}>
          <h4 className={router.pathname === path ? classes.activeLink : " "}>
            {title}
          </h4>
        </Link>
      ))}
    </nav>
  );
};
