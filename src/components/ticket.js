import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import getInterval from '../helpers/getInterval';

const Ticket = props => {
  const [_state, setState] = useState({});

  const helperText = (text, type) => {
    if (type === 'name' && text.length > 10) {
      return text.slice(0, 10) + '...';
    }
    if (type === 'title' && text.length > 20) {
      return text.slice(0, 10) + '...';
    }
    return text;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setState({});
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="textOfTicket">
      <b>{helperText(props.name, 'name')}</b>
      <br></br>
      <p></p>
      <h>{helperText(props.title, 'title')}</h>
      <br></br>
      <p></p>
      <h>{getInterval(props.timeStamp)}</h>
      {props.child}
    </div>
  );
};

export default Ticket;
