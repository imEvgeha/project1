import React, { useState, useEffect } from 'react';
import Ticket from './ticket';

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
    newRepository.splice(Number(neededId), 1);
    setRepository(newRepository);
  };

  const addToRepository = () => {
    return repository.map(ticket => {
      return (
        <div className="repository">
          <Ticket
            name={ticket.name}
            title={ticket.title}
            timeStamp={ticket.timeStamp}
          />
          <button onClick={() => moveToTestField(ticket.id)}>N</button>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Fill new ticket</h1>
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
      <hr></hr>
      <div>{addToRepository()}</div>
      <div className="fieldTest"></div>
      <div className="ready"></div>
    </div>
  );
}

export default MCP;
