import React from 'react';
import Ticket from './Ticket';

const AddToField = props => {
  return props.field.map(ticket => {
    return (
      <div className={props.divClassName}>
        <Ticket
          name={ticket.name}
          title={ticket.title}
          timeStamp={ticket.timeStamp}
        />
        {props.btnRight ? (
          <button onClick={() => props.btnRightOnClick(ticket.id)}>R</button>
        ) : null}
        {props.btnLeft ? (
          <button onClick={() => props.btnLeftOnClick(ticket.id)}>L</button>
        ) : null}
      </div>
    );
  });
};

export default AddToField;
