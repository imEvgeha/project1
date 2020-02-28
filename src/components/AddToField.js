import React from 'react';
import TicketComponent from './ticket';
import { Draggable } from 'react-beautiful-dnd';

const getStatus = status => {
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

const AddToField = props => {
  return props.field.map((ticket, index) => {
    return (
      <Draggable key={ticket.id} draggableId={`${ticket.id}`} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              id={ticket.id}
              className={props.divClassName}
              onClick={e => {
                if (e.target.tagName !== 'BUTTON')
                  props.handleTicketClick(ticket);
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
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
                    className={props.btnLeft ? 'btnRight' : 'btnRightFull'}
                  >
                    R
                  </button>
                ) : null}
                {props.btnLeft ? (
                  <button
                    onClick={() => {
                      props.btnLeftOnClick(ticket.id);
                    }}
                    className={props.btnRight ? 'btnLeft' : 'btnLeftFull'}
                  >
                    L
                  </button>
                ) : null}
              </div>
              <h4>Status: {getStatus(ticket.field)}</h4>
            </div>
          );
        }}
      </Draggable>
    );
  });
};

export default AddToField;
