import React, { useState, useEffect } from 'react';
import getInterval from '../helpers/getInterval';
import textTransformatorInTicket from '../helpers/textTransformatorInTicket';

const Ticket = props => {
  const [_state, setState] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setState({});
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="textOfTicket">
      <b>{textTransformatorInTicket(props.name, 'name')}</b>
      <br></br>
      <h>{textTransformatorInTicket(props.title, 'title')}</h>
      <p></p>
      <h>{getInterval(props.timeStamp)}</h>
      {props.child}
    </div>
  );
};

export default Ticket;
