import React, { useState, useEffect } from 'react';
import MoveTo from '../helpers/MoveTo';
import AddToField from './AddToField';
import WorkField from './WorkField';
import TicketInfo from './TicketInfo';
import { DragDropContext } from 'react-beautiful-dnd';
import fire from '../fire';

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
  const [draggableOver, setDraggableOver] = useState(false);
  const [repositoryLoaded, setRepositoryLoaded] = useState(false);
  const [testLoaded, setTestLoaded] = useState(false);
  const [readyLoaded, setReadyLoaded] = useState(false);
  const dbRef = fire.database().ref();

  useEffect(() => {
    dbRef.on('value', (snap) => {
      setRepository(snap.val().repository || []);
      setRepositoryLoaded(true);
      setTest(snap.val().test || []);
      setTestLoaded(true);
      setReady(snap.val().ready || []);
      setReadyLoaded(true);
      setCount(snap.val().count);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'title') {
      setTitle(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fireRepository = null;
    let fireTest = null;
    let fireReady = null;
    let fireCount = null;
    let timeStamp = new Date().getTime();

    if (name === '') {
      setTitle(title);
      alert('ERROR - Name field is required');
      return;
    }
    if (repository.length === 4) {
      return;
    }
    setCount(count + 1);
    setName('');
    setTitle('');

    dbRef.on('value', (snap) => {
      fireRepository = snap.val().repository || [];
      fireTest = snap.val().test || [];
      fireReady = snap.val().ready || [];
      fireCount = snap.val().count || 0;
    });

    fire
      .database()
      .ref()
      .set({
        repository: [
          ...fireRepository,
          {
            name: name,
            title: title,
            timeStamp,
            id: count,
            field: 'repository',
          },
        ],
        test: fireTest,
        ready: fireReady,
        count: fireCount + 1,
      });
  };

  const setElemToFirebase = (
    destinationColumnName,
    sourceColumnName,
    where,
    source,
    elem,
    setNew,
    setOld,
    id
  ) => {
    let fireRepository = null;
    let fireTest = null;
    let fireReady = null;
    let fireCount = null;

    if (destinationColumnName === sourceColumnName) return;
    if (destinationColumnName === 'repository') {
      dbRef.on('value', (snap) => {
        fireRepository = snap.val().repository || [];
        fireTest = snap.val().test || [];
        fireReady = snap.val().ready || [];
        fireCount = snap.val().count || 0;
      });
      elem.field = 'repository';

      fire
        .database()
        .ref()
        .set({
          repository: [...fireRepository, elem],
          test: fireTest.filter((t) => t.id !== id),
          ready: fireReady.filter((t) => t.id !== id),
          count: fireCount,
        });
      MoveTo(id, source, where, setNew, setOld);
      installAllElements();
      return;
    }
    if (destinationColumnName === 'test') {
      dbRef.on('value', (snap) => {
        fireRepository = snap.val().repository || [];
        fireTest = snap.val().test || [];
        fireReady = snap.val().ready || [];
        fireCount = snap.val().count || 0;
      });
      elem.field = 'test';

      fire
        .database()
        .ref()
        .set({
          repository: fireRepository.filter((t) => t.id !== id),
          test: [...fireTest, elem],
          ready: fireReady.filter((t) => t.id !== id),
          count: fireCount,
        });
      MoveTo(id, source, where, setNew, setOld);
      installAllElements();
      return;
    }
    if (destinationColumnName === 'ready') {
      dbRef.on('value', (snap) => {
        fireRepository = snap.val().repository || [];
        fireTest = snap.val().test || [];
        fireReady = snap.val().ready || [];
        fireCount = snap.val().count || 0;
      });
      elem.field = 'ready';

      fire
        .database()
        .ref()
        .set({
          repository: fireRepository.filter((t) => t.id !== id),
          test: fireTest.filter((t) => t.id !== id),
          ready: [...fireReady, elem],
          count: fireCount,
        });
      MoveTo(id, source, where, setNew, setOld);
      installAllElements();
      return;
    }
  };

  const installAllElements = () => {
    dbRef.on('value', (snap) => {
      setRepository(snap.val().repository || []);
      setRepositoryLoaded(true);
      setTest(snap.val().test || []);
      setTestLoaded(true);
      setReady(snap.val().ready || []);
      setReadyLoaded(true);
      setCount(snap.val().count);
    });
  };

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

  const openInfoAboutTicket = (ticket) => {
    setClickedOnTicket(true);
    setTicketCopy(ticket);
  };

  const closeInfoAboutTicket = () => {
    setClickedOnTicket(false);
    setTicketCopy(null);
  };

  const deleteTicket = (ticket) => {
    if (ticket.field === 'repository') {
      dbRef.update({
        repository: repository.filter((t) => t.id !== ticket.id),
        count: count > 0 ? count - 1 : count,
      });
    }
    if (ticket.field === 'test') {
      dbRef.update({
        test: test.filter((t) => t.id !== ticket.id),
        count: count > 0 ? count - 1 : count,
      });
    }
    if (ticket.field === 'ready') {
      dbRef.update({
        ready: ready.filter((t) => t.id !== ticket.id),
        count: count > 0 ? count - 1 : count,
      });
    }
    setClickedOnTicket(false);
  };

  const draggableOverHelp = (elem, draggable) => {
    if (draggable) {
      setDraggableOver(elem);
    }
    return;
  };

  const getTransformField = (field) => {
    const fields = {
      repository,
      test,
      ready,
    };
    return fields[field];
  };

  const getTransformSetField = (field) => {
    const fields = {
      repository: setRepository,
      test: setTest,
      ready: setReady,
    };
    return fields[field];
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
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          if (!result.source) return;

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
          const sourceIndex = result.source.index;
          const draggableElem = getOldDroppableField[sourceIndex];
          const destinationColumnName = result.destination.droppableId;
          const sourceColumnName = result.source.droppableId;

          setElemToFirebase(
            destinationColumnName,
            sourceColumnName,
            getDroppableField,
            getOldDroppableField,
            draggableElem,
            setDroppableField,
            oldSetDroppableField,
            draggableElem.id
          );
          setDraggableOver(null);
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
          draggableOverHelp={draggableOver}
          repositoryLoaded={repositoryLoaded}
          testLoaded={testLoaded}
          readyLoaded={readyLoaded}
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
