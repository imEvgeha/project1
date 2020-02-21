import React from 'react';

const TicketInfo = props => {
  return (
    <div
      className="backgroundInfo"
      onClick={e => {
        if (e.target.className === 'backgroundInfo') {
          props.closeInfo();
        }
      }}
    >
      <div className="info">
        <b>{props.name}</b>
        <br></br>
        <h>{props.title}</h>
        <br></br>
        <h3>{props.timeStamp}</h3>
        <button onClick={props.deleteBtn}>Delete</button>
      </div>
    </div>
  );
};

export default TicketInfo;
