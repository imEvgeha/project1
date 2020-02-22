import React from 'react';

const ticket = props => {
  const helperText = (text, type) => {
    if (type === 'name' && text.length > 10) {
      return text.slice(0, 10) + '...';
    }
    if (type === 'title' && text.length > 30) {
      return text.slice(0, 30) + '...';
    }
    return text;
  };

  return (
    <>
      <b>{helperText(props.name, 'name')}</b>
      <br></br>
      <h>{helperText(props.title, 'title')}</h>
      <br></br>
      <h>{props.timeStamp}</h>
      {props.child}
    </>
  );
};

export default ticket;
