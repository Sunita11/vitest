import type { FC, ReactElement } from "react";
import Header from "../components/header";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: FC<LayoutProps> = (props): ReactElement => {
  return (
    <>
      <Header />
      <main>
        <div className="component-wrapper">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
