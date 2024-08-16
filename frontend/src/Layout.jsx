import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store";

function Layout() {
  return (
    <div className="w-auto h-auto">
      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    </div>
  );
}

export default Layout;
