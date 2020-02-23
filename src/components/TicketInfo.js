import React from 'react';

const TicketInfo = props => {
  const getStatus = status => {
    if (status === 'repository') {
      return 'In developing...';
    }
    if (status === 'test') {
      return 'In testing...';
    }
    if (status === 'ready') {
      return 'Ready';
    }
  };

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
        <b>Name: {props.name}</b>
        <br></br>
        <h>Title: {props.title}</h>
        <br></br>
        <h3>Creating time: {props.text}</h3>
        <br></br>
        <b>Status: {getStatus(props.status)}</b>
        <p></p>
        <button onClick={() => props.deleteBtn(props.ticket)}>Delete</button>
      </div>
    </div>
  );
};

export default TicketInfo;
