import React from 'react';
import TicketComponent from './Ticket';

const AddToField = props => {
  return props.field.map(ticket => {
    return (
      <div
        className={props.divClassName}
        onClick={e => {
          if (e.target.tagName !== 'BUTTON') props.handleTicketClick(ticket);
        }}
      >
        <TicketComponent
          name={ticket.name}
          title={ticket.title}
          timeStamp={ticket.timeStamp}
          text={ticket.text}
        />
        <div className="ButtonsDiv">
          {props.btnRight ? (
            <button
              onClick={() => {
                props.btnRightOnClick(ticket.id);
              }}
              className="btnRight"
            >
              R
            </button>
          ) : null}
          {props.btnLeft ? (
            <button
              onClick={() => {
                props.btnLeftOnClick(ticket.id);
              }}
              className="btnLeft"
            >
              L
            </button>
          ) : null}
        </div>
      </div>
    );
  });
};

export default AddToField;
