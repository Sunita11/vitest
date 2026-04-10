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
    to: "/rating-card",
    title: "Rating Card",
  },
  {
    to: "/tic-tac-toe",
    title: "Tic Tac Toe",
  },
  {
    to: "/virtualisation",
    title: "List Virtualisation",
  },
  {
    to: "/accessibility",
    title: "Accessibility",
  },
];
function Header() {
  return (
    <header className={styles.header}>
      <nav>
        {LinksData.map((link: LinkT) => (
          <div className={styles.navItem} key={link.title}>
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
