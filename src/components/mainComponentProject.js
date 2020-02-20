import React, { useState, useEffect } from 'react';
import MoveTo from '../helpers/MoveTo';
import AddToField from './AddToField';

function MCP() {
  // * MCP - Main Component Project
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const [repository, setRepository] = useState([]);
  const [test, setTest] = useState([]);
  const [ready, setReady] = useState([]);

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

  console.log(test);

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
        timeStamp: `${new Date().getHours()}:${new Date().getMinutes()}`,
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
        btnLeft
        btnLeftOnClick={moveBackToTestField}
      />
    );
  };

  return (
    <div className="mainComponent">
      <div className="inputFields">
        <h1>Fill new ticket</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <b>
              Name:
              <input
                type="text"
                onChange={handleChange}
                value={name}
                name="name"
              ></input>
            </b>
            <br></br>
            <b>
              Title:
              <input
                type="text"
                onChange={handleChange}
                value={title}
                name="title"
              ></input>
            </b>
            <br></br>
            <input type="submit"></input>
          </form>
        </div>
        <hr></hr>
      </div>
      <div className="fields">
        <div className="field">{addToRepository()}</div>
        <div className="field">{addToTestField()}</div>
        <div className="field">{addToReadyField()}</div>
      </div>
    </div>
  );
}

export default MCP;
