import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const WorkField = (props) => {
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
                autocomplete="off"
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
                autocomplete="off"
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
                className={
                  props.draggableOverHelp === 'repository' ? 'field2' : 'field'
                }
                onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                id="repository"
              >
                {props.repositoryLoaded ? null : (
                  <img
                    src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                    alt="loading..."
                  ></img>
                )}
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
                className={
                  props.draggableOverHelp === 'test' ? 'field2' : 'field'
                }
                onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                id="test"
              >
                {props.testLoaded ? null : (
                  <img
                    src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                    alt="loading..."
                  ></img>
                )}
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
                className={
                  props.draggableOverHelp === 'ready' ? 'field2' : 'field'
                }
                onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                id="ready"
              >
                {props.readyLoaded ? null : (
                  <img
                    src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                    alt="loading..."
                  ></img>
                )}
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
