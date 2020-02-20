import React from 'react';

const ticket = props => {
  return (
    <>
      <b>{props.name}</b>
      <br></br>
      <h>{props.title}</h>
      <br></br>
      <h>{props.timeStamp}</h>
      {props.child}
    </>
  );
};

export default ticket;
