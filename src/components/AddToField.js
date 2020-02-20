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
        <button onClick={() => props.btnOnClick(ticket.id)}>N</button>
      </div>
    );
  });
};

export default AddToField;
