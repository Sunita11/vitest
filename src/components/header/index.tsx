import { NavLink } from "react-router";
import styles from "./style.module.css";

function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navItem}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>
      </div>
      <div className={styles.navItem}>
        <NavLink
          to="/kanban"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Kanban
        </NavLink>
      </div>
      <div className={styles.navItem}>
        <NavLink
          to="/reply"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Reply Comment
        </NavLink>
      </div>
      <div className={styles.navItem}>
        <NavLink
          to="/accessibility"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Accessibility
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
