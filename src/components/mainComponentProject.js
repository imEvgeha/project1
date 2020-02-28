import React, { useState, useEffect } from 'react';
import MoveTo from '../helpers/MoveTo';
import AddToField from './AddToField';
import WorkField from './WorkField';
import TicketInfo from './TicketInfo';
import { DragDropContext } from 'react-beautiful-dnd';

function MPC() {
  // * MCP - Main Project Component
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const [repository, setRepository] = useState([]);
  const [test, setTest] = useState([]);
  const [ready, setReady] = useState([]);
  const [ticketCopy, setTicketCopy] = useState(null);
  const [clickedOnTicket, setClickedOnTicket] = useState(null);

  useEffect(() => {
    setRepository(JSON.parse(localStorage.getItem('repository')));
    setTest(JSON.parse(localStorage.getItem('test')));
    setReady(JSON.parse(localStorage.getItem('ready')));
    setCount(JSON.parse(localStorage.getItem('count')));
  }, []);

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'title') {
      setTitle(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const timeStamp = new Date().getTime();

    if (name === '') {
      setTitle(title);
      alert('ERROR - Name field is required');
      return;
    }
    setCount(count + 1);
    setName('');
    setTitle('');
    setRepository([
      ...repository,
      {
        name: name,
        title: title,
        timeStamp,
        id: count,
        field: 'repository'
      }
    ]);
  };

  useEffect(() => {
    localStorage.setItem('repository', JSON.stringify(repository));
    localStorage.setItem('test', JSON.stringify(test));
    localStorage.setItem('ready', JSON.stringify(ready));
    localStorage.setItem('count', JSON.stringify(count));
  });

  const moveToTestField = id => {
    MoveTo(id, repository, test, setRepository, setTest, 'test');
  };

  const moveToReadyField = id => {
    MoveTo(id, test, ready, setTest, setReady, 'ready');
  };

  const moveBackToTestField = id => {
    MoveTo(id, ready, test, setReady, setTest, 'test');
  };

  const moveBackToRepositoryField = id => {
    MoveTo(id, test, repository, setTest, setRepository, 'repository');
  };

  const addToRepository = () => {
    return (
      <AddToField
        field={repository}
        divClassName="repository internalProperties"
        handleTicketClick={getInfoAboutTicket}
        btnRightOnClick={moveToTestField}
        btnRight
      />
    );
  };

  const addToTestField = () => {
    return (
      <AddToField
        field={test}
        divClassName="fieldTest internalProperties"
        handleTicketClick={getInfoAboutTicket}
        btnRight
        btnRightOnClick={moveToReadyField}
        btnLeft
        btnLeftOnClick={moveBackToRepositoryField}
      />
    );
  };

  const addToReadyField = () => {
    return (
      <AddToField
        field={ready}
        divClassName="ready internalProperties"
        handleTicketClick={getInfoAboutTicket}
        btnLeft
        btnLeftOnClick={moveBackToTestField}
      />
    );
  };

  const getInfoAboutTicket = ticket => {
    setClickedOnTicket(true);
    setTicketCopy(ticket);
  };

  const closeInfoAboutTicket = () => {
    setClickedOnTicket(false);
    setTicketCopy(null);
  };

  const findInArr = (field, ticket) => {
    return field.indexOf(ticket);
  };

  const deleteTicket = ticket => {
    if (ticket.field === 'repository') {
      repository.splice(findInArr(repository, ticket), 1);
    }
    if (ticket.field === 'test') {
      test.splice(findInArr(test, ticket), 1);
    }
    if (ticket.field === 'ready') {
      ready.splice(findInArr(ready, ticket), 1);
    }
    setClickedOnTicket(false);
  };

  if (clickedOnTicket) {
    const elem = document.querySelector('html');
    elem.classList.add('stopScrolling');
  } else {
    const elem = document.querySelector('html');
    elem.classList.remove('stopScrolling');
  }

  const getTransformField = field => {
    if (field === 'repository') return repository;
    if (field === 'test') return test;
    if (field === 'ready') return ready;
  };

  const getTransformSetField = field => {
    if (field === 'repository') return setRepository;
    if (field === 'test') return setTest;
    if (field === 'ready') return setReady;
  };

  const onDragEnd = (
    result,
    oldField,
    oldSetField,
    setNewField,
    newField,
    where
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = oldField.slice();
      const destColumn = newField.slice();
      const [removed] = sourceColumn.splice(source.index, 1);
      removed.field = where;
      destColumn.splice(destination.index, 0, removed);
      setNewField(destColumn);
      oldSetField(sourceColumn);
    } else {
      const copiesItems = [...oldField];
      const [removed] = copiesItems.splice(source.index, 1);
      copiesItems.splice(destination.index, 0, removed);
      oldSetField(copiesItems);
    }
  };

  console.log(localStorage);

  return (
    <div className="mainDiv">
      <DragDropContext
        onDragEnd={result => {
          const getDroppableField = getTransformField(
            result.destination.droppableId
          );
          const setDroppableField = getTransformSetField(
            result.destination.droppableId
          );
          const getOldDroppableField = getTransformField(
            result.source.droppableId
          );
          const oldSetDroppableField = getTransformSetField(
            result.source.droppableId
          );

          onDragEnd(
            result,
            getOldDroppableField,
            oldSetDroppableField,
            setDroppableField,
            getDroppableField,
            result.destination.droppableId
          );
        }}
      >
        <WorkField
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          name={name}
          title={title}
          fillingField1={addToRepository()}
          fillingField2={addToTestField()}
          fillingField3={addToReadyField()}
        />
        {clickedOnTicket && (
          <TicketInfo
            text={ticketCopy.text}
            ticket={ticketCopy}
            name={ticketCopy.name}
            title={ticketCopy.title}
            timeStamp={ticketCopy.timeStamp}
            closeInfo={closeInfoAboutTicket}
            deleteBtn={deleteTicket}
            status={ticketCopy.field}
          />
        )}
      </DragDropContext>
    </div>
  );
}

export default MPC;
