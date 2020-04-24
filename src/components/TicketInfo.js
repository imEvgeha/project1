import React, { useState, useEffect } from 'react';
import getInterval from '../helpers/getInterval';

const TicketInfo = (props) => {
  const [_state, setState] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setState({});
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getStatus = (status) => {
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
      onClick={(e) => {
        if (e.target.className === 'backgroundInfo') {
          props.closeInfo();
        }
      }}
    >
      <div className="info">
        <b>Name: {props.name}</b>
        <br></br>
        <p>Title: {props.title}</p>
        <br></br>
        <h3>Creating time: {getInterval(props.timeStamp)}</h3>
        <br></br>
        <br></br>
        <b>Status: {getStatus(props.status)}</b>
        <p></p>
        <button onClick={() => props.deleteBtn(props.ticket)}>Delete</button>
      </div>
    </div>
  );
};

export default TicketInfo;
