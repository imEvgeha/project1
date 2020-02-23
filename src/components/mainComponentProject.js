import React, { useState, useEffect } from 'react';
import MoveTo from '../helpers/MoveTo';
import AddToField from './AddToField';
import { DateTime } from 'luxon';
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

  useEffect(() => {});

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
        // getIntervalTime={getTime}
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
        // getIntervalTime={getTime}
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
        // getIntervalTime={getTime}
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

  const deleteTicket = ticket => {
    const findInArr = field => {
      return field.indexOf(ticket);
    };

    if (ticket.field === 'repository') {
      repository.splice(findInArr(repository), 1);
    }
    if (ticket.field === 'test') {
      test.splice(findInArr(test), 1);
    }
    if (ticket.field === 'ready') {
      ready.splice(findInArr(ready), 1);
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
          // getIntervalTime={getTime}
        />
      )}
    </div>
  );
}

export default MCP;
