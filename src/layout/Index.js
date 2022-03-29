/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import classNames from "classnames";
/** COMPONENTS */
import Pages from "../route/Index";
import Sidebar from "./sidebar/Sidebar";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  const {t} = useTranslation();

  /** Use redux */
  const authState = useSelector(({auth}) => auth);
  const commonState = useSelector(({common}) => common);
  
  /** Use state */
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileView, setMobileView] = useState();
  const [visibility, setVisibility] = useState(false);
  const [themeState] = useState({
    main: "default",
    sidebar: "white",
    header: "white",
    skin: "light",
  });

  /**
   ** FUNCTIONS
   */
  // function to toggle sidebar
  const toggleSidebar = (e) => {
    e.preventDefault();
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 1200) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };
  window.addEventListener("load", viewChange);
  window.addEventListener("resize", viewChange);

  const sidebarClass = classNames({
    "nk-sidebar-mobile": mobileView,
    "nk-sidebar-active": visibility && mobileView,
  });

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    viewChange();
  }, []);

  useEffect(() => {
    if (!showSidebar && authState["successSignIn"]) {
      setShowSidebar(true);
    }
  }, [
    showSidebar,
    authState["successSignIn"],
  ]);

  /**
   ** RENDER
   */
  document.body.className = `nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme ${commonState["theme"]}-mode`;
  const shSidebar = commonState["sidebar"];
  return (
    <React.Fragment>
      <Head title={t("common:loading")} />
      <div className="nk-app-root">
        <div className="nk-main">
          {shSidebar && showSidebar && (
            <Sidebar
              className={sidebarClass}
              theme={themeState.sidebar}
              fixed
              sidebarToggle={toggleSidebar}
            />
          )}
          {shSidebar && visibility && (
            <div className="nk-sidebar-overlay" onClick={toggleSidebar} />
          )}
          <div className="nk-wrap">
            <Header sidebarToggle={toggleSidebar} fixed theme={themeState.header} />
            <Pages />
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Layout;
