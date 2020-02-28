import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const WorkField = props => {
  return (
    <div className="mainComponent">
      <div className="inputFields">
        <h1>Fill new ticket</h1>

        <div>
          <form onSubmit={props.handleSubmit}>
            <b>
              Name:
              <input
                type="text"
                onChange={props.handleChange}
                value={props.name}
                name="name"
              ></input>
            </b>
            <br></br>
            <b>
              Title:
              <input
                type="text"
                onChange={props.handleChange}
                value={props.title}
                name="title"
              ></input>
            </b>
            <br></br>
            <input type="submit"></input>
          </form>
        </div>
      </div>
      <div className="fields">
        <Droppable droppableId="repository">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="field"
                onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                id="repository"
              >
                {props.fillingField1}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable droppableId="test">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="field"
                onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                id="test"
              >
                {props.fillingField2}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable droppableId="ready">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="field"
                onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                id="ready"
              >
                {props.fillingField3}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default WorkField;
