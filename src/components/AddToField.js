import React, { useState } from 'react';
import TicketComponent from './Ticket';
import { useDrag } from 'react-dnd';
// const definesType = {
//   TICKET: 'ticket'
// };

const AddToField = props => {
  return props.field.map(ticket => {
    const dragStart = e => {
      const target = e.target;

      e.dataTransfer.setData('card_id', JSON.stringify(ticket));

      setTimeout(() => {
        target.style.display = 'none';
      }, 0);
    };

    const dragOver = e => {
      e.stopPropagation();
    };

    return (
      <div
        id={ticket.id}
        className={props.divClassName}
        onClick={e => {
          if (e.target.tagName !== 'BUTTON') props.handleTicketClick(ticket);
        }}
        draggable="true"
        onDragStart={dragStart}
        onDragOver={dragOver}
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
        {props.children}
      </div>
    );
  });
};

export default AddToField;
