import React from 'react';
import TicketComponent from './Ticket';

const AddToField = props => {
  return props.field.map(ticket => {
    const dragStart = elem => {
      const target = elem.target;
      elem.dataTransfer.setData('card_id', JSON.stringify(ticket));

      setTimeout(() => {
        target.style.display = 'none';
      }, 0);
    };

    const dragOver = elem => {
      elem.stopPropagation();
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
