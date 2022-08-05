import "./SideMenu.scss";

import React, { Component } from "react";


import { WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { AppState } from "../../store/store";
import { withReactHookAuth } from "../../common/services/auth-service";
import { Constants } from "../../common/utils/Constants";

interface ISideNavprops {
  auth: any;
}

interface ISidenaMenuState {
  navSelectedId: string;
  isShowSideMenu: boolean;
}

/**
 * Side navigation component
 */
class SideMenu extends Component<
  RouteComponentProps & WithTranslation & ISideNavprops,
  ISidenaMenuState
> {
  MODES = {
    VIEW: "view",
    EDIT: "edit",
  };
  NAVIGATION_DATA = [
    {
      title: "Trang Chủ",
      path: Constants.PATH_ROUTE.HOME,
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text"
    },
    {
      title: "Quản Lý Lịch Trình",
      path: Constants.PATH_ROUTE.SCHEDUCE_MANAGER.PATH_NAME,
      icon: <TbIcons.TbCalendarTime />,
      cName: "nav-text"
    },
    {
      title: "Quản Lý Xe Khách",
      path: Constants.PATH_ROUTE.BUS_MANAGER.PATH_NAME,
      icon: <FaIcons.FaBusAlt />,
      cName: "nav-text"
    },
    {
      title: "Quản Lý Đặt Vé",
      path: Constants.PATH_ROUTE.TICKET_MANAGER.PATH_NAME,
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text"
    },
    {
      title: "Thống Kê",
      path: Constants.PATH_ROUTE.REPORT_MANAGER.PATH_NAME,
      icon: <TbIcons.TbReportSearch />,
      cName: "nav-text"
    },
    {
      title: "Hỗ Trợ",
      path: Constants.PATH_ROUTE.SUPPORT,
      icon: <MdIcons.MdSupportAgent />,
      cName: "nav-text"
    }
  ];

  DEFAULT_NAV_SELECTED_ID = "01";

  constructor(props: any) {
    super(props);
    this.state = {
      navSelectedId: this.DEFAULT_NAV_SELECTED_ID,
      isShowSideMenu: false
    };
  }
  render() {
    const {isShowSideMenu} = this.state;

    return (
      <IconContext.Provider value={{ color: "#FFF" }}>
      {/* All the icons now are white */}
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={()=>this.setState({isShowSideMenu: !this.state.isShowSideMenu})} />
        </Link>
      </div>
      <nav className={isShowSideMenu ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={()=>this.setState({isShowSideMenu: !this.state.isShowSideMenu})}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          {this.NAVIGATION_DATA.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
    );
  }
}

export default withReactHookAuth(
  withRouter(SideMenu)
);
