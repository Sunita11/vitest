import { NavLink } from "react-router";
import data from "./navlinks.json";
import styles from "./style.module.css";
type LinkT = {
  to: string;
  title: string;
};
const LinksData: LinkT[] = data;
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
