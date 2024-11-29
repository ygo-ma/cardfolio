import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <Header />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </>
  );
}

export default MainLayout;
