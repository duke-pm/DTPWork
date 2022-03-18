import React from "react";
import {UserAvatar} from "../../../../components/Component";
import {findUpper} from "../../../../utils/Utils";

export const MeChat = ({idx, item}) => {
  // let slitTime = item.date.split(" - ");
  // if (slitTime.length > 1) {
  //   slitTime = slitTime[1];
  // } else {
  //   slitTime = item.date;
  // }
  return (
    <div className="chat is-me">
      <div className="chat-content">
        <div className="chat-bubbles">
          {item.chat.map((msg, idx) => {
            return (
              <div className="chat-bubble" key={idx}>
                <React.Fragment>
                  <div className="chat-msg bg-primary">{msg}</div>
                </React.Fragment>
              </div>
            );
          })}
        </div>
        <ul className="chat-meta">
          <li>{item.date}</li>
        </ul>
      </div>
    </div>
  );
};

export const YouChat = ({idx,  item}) => {
  // let slitTime = item.date.split(" - ");
  // if (slitTime.length > 1) {
  //   slitTime = slitTime[1];
  // } else {
  //   slitTime = item.date;
  // }
  return (
    <div className="chat is-you">
      <div className="chat-avatar">
        <UserAvatar text={findUpper(item.fullName)} />
      </div>
      <div className="chat-content">
        <div className="chat-bubbles">
          {item.chat.map((msg, idx) => {
            return (
              <div className="chat-bubble" key={idx}>
                <div className="chat-msg">{msg}</div>
              </div>
            );
          })}
        </div>
        <ul className="chat-meta">
          <li>{item.fullName}</li>
          <li>{item.date}</li>
        </ul>
      </div>
    </div>
  );
};

export const MetaChat = ({ item }) => {
  return (
    <div className="chat-sap">
      <div className="chat-sap-meta">
        <span>{item}</span>
      </div>
    </div>
  );
};