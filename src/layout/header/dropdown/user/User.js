import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {DropdownToggle, DropdownMenu, Dropdown} from "reactstrap";
/** COMPONENTS */
import {Icon} from "../../../../components/Component";
import {LinkList, LinkItem} from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";

const User = () => {
  const {t} = useTranslation();

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">Abu Bin Ishityak</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">Abu Bin Ishtiyak</span>
              <span className="sub-text">info@softnio.com</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              {t("account:view_profile")}
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              {t("account:account_settings")}
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span className="pl-2">{t("account:sign_out")}</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
