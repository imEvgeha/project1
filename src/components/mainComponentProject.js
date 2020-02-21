import React, { useState, useEffect } from 'react';
import MoveTo from '../helpers/MoveTo';
import AddToField from './AddToField';
import { DateTime } from 'luxon';
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
  const [clickedOnTicket, setClickedOnTicket] = useState(false);
  const [someTicket, setSomeTiket] = useState(null);
  const date = DateTime.local();

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
    setCount(count + 1);
    setName('');
    setTitle('');
    setRepository([
      ...repository,
      {
        name: name,
        title: title,
        timeStamp: `${date.year} | M: ${date.month} Day: ${date.day} | ${date.hour}:${date.minute}`,
        id: count
      }
    ]);
  };

  const moveToTestField = id => {
    MoveTo(id, repository, test, setRepository, setTest);
  };

  const moveToReadyField = id => {
    MoveTo(id, test, ready, setTest, setReady);
  };

  const moveBackToTestField = id => {
    MoveTo(id, ready, test, setReady, setTest);
  };

  const moveBackToRepositoryField = id => {
    MoveTo(id, test, repository, setTest, setRepository);
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
    console.log(ticket);
    setClickedOnTicket(true);
    setSomeTiket(ticket);
  };

  const closeInfoAboutTicket = () => {
    setClickedOnTicket(false);
    setSomeTiket(null);
  };

  if (clickedOnTicket) {
    return (
      <div>
        <WorkField
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          name={name}
          title={title}
          fillingField1={addToRepository()}
          fillingField2={addToTestField()}
          fillingField3={addToReadyField()}
        />
        <TicketInfo
          name={someTicket.name}
          title={someTicket.title}
          timeStamp={someTicket.timeStamp}
          closeInfo={closeInfoAboutTicket}
        />
      </div>
    );
  } else {
    return (
      <WorkField
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        name={name}
        title={title}
        fillingField1={addToRepository()}
        fillingField2={addToTestField()}
        fillingField3={addToReadyField()}
      />
    );
  }
}

export default MCP;
