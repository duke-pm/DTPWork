import React from "react";
import {Link} from "react-router-dom";
import {Row, Col} from "reactstrap";
import Icon from "../icon/Icon";
import classNames from "classnames";

export const LinkItem = ({ ...props }) => {
  return (
    <li>
      {props.tag !== "a" ? (
        <Link to={process.env.PUBLIC_URL + props.link} {...props}>
          <p className="d-flex justify-content-center">
            {props.icon ? <Icon name={props.icon} /> : null}
            <span className="pl-2">{props.text || props.children}</span>
          </p>
        </Link>
      ) : (
        <a href={process.env.PUBLIC_URL + props.link} onClick={(ev) => ev.preventDefault()}>
          <p className="d-flex justify-content-center">
            {props.icon ? <Icon name={props.icon} /> : null}
            <span>{props.text || props.children}</span>
          </p>
        </a>
      )}
    </li>
  );
};

export const LinkList = ({ ...props }) => {
  const listClasses = classNames({
    "link-list": !props.opt,
    "link-list-opt": props.opt,
    [`${props.className}`]: props.className,
  });
  return <ul className={listClasses}>{props.children}</ul>;
};
