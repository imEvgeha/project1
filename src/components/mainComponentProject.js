import React, { useState, useEffect } from 'react';
import MoveTo from '../helpers/MoveTo';
import AddToField from './AddToField';
import getInterval from '../helpers/getInterval';
import WorkField from './WorkField';
import TicketInfo from './TicketInfo';

function MCP() {
  // * MCP - Main Component Project
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const [repository, setRepository] = useState([]);
  const [test, setTest] = useState([]);
  const [ready, setReady] = useState([]);
  const [someTicket, setSomeTiket] = useState(null);
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

  const getTime = time => {
    return getInterval(time);
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
        text: getTime(timeStamp),
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
    setSomeTiket(ticket);
  };

  const closeInfoAboutTicket = () => {
    setClickedOnTicket(false);
    setSomeTiket(null);
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

  const transformField = field => {
    if (field === 'repository') return repository;
    if (field === 'test') return test;
    if (field === 'ready') return ready;
  };

  const drag_n_drop = e => {
    e.preventDefault();
    const ticket_copy = JSON.parse(e.dataTransfer.getData('card_id'));
    const currentField = transformField(ticket_copy.field);
    if (e.target.id === 'repository') {
      ticket_copy.field = 'repository';
      setRepository([...repository, ticket_copy]);
    }
    if (e.target.id === 'test') {
      ticket_copy.field = 'test';
      setTest([...test, ticket_copy]);
    }
    if (e.target.id === 'ready') {
      ticket_copy.field = 'ready';
      setReady([...ready, ticket_copy]);
    }
    currentField.splice(findInArr(currentField, ticket_copy), 1);
  };

  const dragOver = e => {
    e.preventDefault();
  };

  return (
    <div className="mainDiv">
      <WorkField
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        name={name}
        title={title}
        fillingField1={addToRepository()}
        fillingField2={addToTestField()}
        fillingField3={addToReadyField()}
        onDrop={drag_n_drop}
        onDragOver={dragOver}
      />
      {clickedOnTicket && (
        <TicketInfo
          text={someTicket.text}
          ticket={someTicket}
          name={someTicket.name}
          title={someTicket.title}
          timeStamp={someTicket.timeStamp}
          closeInfo={closeInfoAboutTicket}
          deleteBtn={deleteTicket}
          status={someTicket.field}
        />
      )}
    </div>
  );
}

export default MCP;
