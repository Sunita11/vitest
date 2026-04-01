import { NavLink } from "react-router";
import styles from "./style.module.css";
type LinkT = {
  to: string;
  title: string;
};
const LinksData: LinkT[] = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/kanban",
    title: "Kanban",
  },
  {
    to: "/reply",
    title: "Reply Comment",
  },
  {
    to: "/packaging-list",
    title: "Packaging List",
  },
  {
    to: "/accessibility",
    title: "Accessibility",
  },
];
function Header() {
  return (
    <header className={styles.nav}>
      <nav>
        {LinksData.map((link: LinkT) => (
          <div className={styles.navItem}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {link.title}
            </NavLink>
          </div>
        ))}
      </nav>
    </header>
  );
}

export default Header;
