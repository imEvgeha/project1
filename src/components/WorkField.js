import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import AddToField from './AddToField';

const WorkField = (props) => {
  const {
    repository,
    test,
    ready,
    draggableOverHelp,
    openInfoAboutTicket,
    draggableOver,
  } = props;

  const addToRepository = () => {
    return (
      <AddToField
        field={repository}
        draggableOverHelp={draggableOverHelp}
        divClassName="repository internalProperties"
        handleTicketClick={openInfoAboutTicket}
        btnRight
      />
    );
  };

  const addToTestField = () => {
    return (
      <AddToField
        field={test}
        draggableOverHelp={draggableOverHelp}
        divClassName="fieldTest internalProperties"
        handleTicketClick={openInfoAboutTicket}
        btnRight
        btnLeft
      />
    );
  };

  const addToReadyField = () => {
    return (
      <AddToField
        field={ready}
        draggableOverHelp={draggableOverHelp}
        divClassName="ready internalProperties"
        handleTicketClick={openInfoAboutTicket}
        btnLeft
      />
    );
  };

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
                onChange={(e) =>
                  props.dispatch({
                    type: 'value',
                    field: 'name',
                    value: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  props.dispatch({
                    type: 'value',
                    field: 'title',
                    value: e.target.value,
                  })
                }
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
                className={draggableOver === 'repository' ? 'field2' : 'field'}
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
                {addToRepository()}
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
                className={draggableOver === 'test' ? 'field2' : 'field'}
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
                {addToTestField()}
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
                className={draggableOver === 'ready' ? 'field2' : 'field'}
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
                {addToReadyField()}
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
