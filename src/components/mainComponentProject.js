import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
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
    const neededElem = repository.find(ticket => ticket.id === id);
    const neededId = repository.indexOf(neededElem);
    const newRepository = repository.slice();
    const deleteElem = newRepository[neededId];
    newRepository.splice(Number(neededId), 1);
    setRepository(newRepository);
    setTest([...test, deleteElem]);
  };

  const addToRepository = () => {
    return (
      <AddToField
        field={repository}
        divClassName="repository"
        btnOnClick={moveToTestField}
      />
    );
  };

  const addToTestField = () => {
    return <AddToField field={test} divClassName="fieldTest" btnOnClick />;
  };

  const addToReadyField = () => {
    return <AddToField field={ready} divClassName="readyd" btnOnClick />;
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
            <input type="submit"></input>
          </form>
        </div>
        <hr></hr>
      </div>
      <div className="fields">
        <div className="field1">{addToRepository()}</div>
        <div className="field2">{addToTestField()}</div>
        <div className="field3">{addToReadyField()}</div>
      </div>
    </div>
  );
}

export default MCP;
