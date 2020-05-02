import React, { useEffect, useReducer } from 'react';
import WorkField from './WorkField';
import TicketInfo from './TicketInfo';
import { DragDropContext } from 'react-beautiful-dnd';
import fire from '../fire';
import reducer from '../reducer';

const LIMIT_AMOUNT_TICKETS = 4;

function MPC() {
  // * MCP - Main Project Component
  const initialState = {
    name: '',
    title: '',
    count: 0,
    repository: [],
    test: [],
    ready: [],
    ticketCopy: null,
    clickedOnTicket: null,
    repositoryLoaded: false,
    testLoaded: false,
    readyLoaded: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const dbRef = fire.database().ref();
  let draggableOver = null;

  const {
    name,
    title,
    count,
    repository,
    test,
    ready,
    ticketCopy,
    clickedOnTicket,
    repositoryLoaded,
    testLoaded,
    readyLoaded,
  } = state;

  useEffect(() => {
    installAllElements();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let fireRepository = null;
    let fireCount = null;
    let timeStamp = new Date().getTime();

    if (name === '') {
      alert('ERROR - Name field is required');
      return;
    }
    if (repository.length === LIMIT_AMOUNT_TICKETS) {
      return;
    }
    dispatch({ type: 'value', field: 'name', value: '' });
    dispatch({ type: 'value', field: 'title', value: '' });

    dbRef.on('value', (snap) => {
      fireRepository = snap.val().repository || [];
      fireCount = snap.val().count || 0;
    });

    dbRef.update({
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
      count: fireCount + 1,
    });
  };

  const setElemToFirebase = (
    destinationColumnName,
    sourceColumnName,
    elem,
    id
  ) => {
    let fireRepository = null;
    let fireTest = null;
    let fireReady = null;
    let fireCount = null;

    const fillAllFireVariables = (snap) => {
      fireRepository = snap.val().repository || [];
      fireTest = snap.val().test || [];
      fireReady = snap.val().ready || [];
      fireCount = snap.val().count || 0;
    };

    if (destinationColumnName === sourceColumnName) return;
    if (destinationColumnName === 'repository') {
      dbRef.on('value', (snap) => {
        fillAllFireVariables(snap);
      });
      elem.field = 'repository';

      dbRef.set({
        repository: [...fireRepository, elem],
        test: fireTest.filter((t) => t.id !== id),
        ready: fireReady.filter((t) => t.id !== id),
        count: fireCount,
      });
      return;
    }

    if (destinationColumnName === 'test') {
      dbRef.on('value', (snap) => {
        fillAllFireVariables(snap);
      });
      elem.field = 'test';

      dbRef.set({
        repository: fireRepository.filter((t) => t.id !== id),
        test: [...fireTest, elem],
        ready: fireReady.filter((t) => t.id !== id),
        count: fireCount,
      });
      return;
    }

    if (destinationColumnName === 'ready') {
      dbRef.on('value', (snap) => {
        fillAllFireVariables(snap);
      });
      elem.field = 'ready';

      dbRef.set({
        repository: fireRepository.filter((t) => t.id !== id),
        test: fireTest.filter((t) => t.id !== id),
        ready: [...fireReady, elem],
        count: fireCount,
      });
    }
  };

  const downloadAllElements = () => {
    installAllElements();
  };

  const installAllElements = () => {
    dbRef.on('value', (snap) => {
      dispatch({
        type: 'value',
        field: 'repository',
        value: snap.val().repository || [],
      });
      dispatch({ type: 'value', field: 'repositoryLoaded', value: true });
      dispatch({
        type: 'value',
        field: 'test',
        value: snap.val().test || [],
      });
      dispatch({ type: 'value', field: 'testLoaded', value: true });
      dispatch({
        type: 'value',
        field: 'ready',
        value: snap.val().ready || [],
      });
      dispatch({ type: 'value', field: 'readyLoaded', value: true });
      dispatch({ type: 'count', value: snap.val().count });
    });
  };

  const openInfoAboutTicket = (ticket) => {
    dispatch({ type: 'clickedOnTicket', value: true });
    dispatch({ type: 'ticketCopy', value: ticket });
  };

  const closeInfoAboutTicket = () => {
    dispatch({ type: 'clickedOnTicket', value: false });
    dispatch({ type: 'ticketCopy', value: null });
  };

  const deleteTicket = (ticket) => {
    const variants = {
      repository: () => {
        dbRef.update({
          repository: repository.filter((t) => t.id !== ticket.id),
          count: count > 0 ? count - 1 : count,
        });
      },
      test: () => {
        dbRef.update({
          test: test.filter((t) => t.id !== ticket.id),
          count: count > 0 ? count - 1 : count,
        });
      },
      ready: () => {
        dbRef.update({
          ready: ready.filter((t) => t.id !== ticket.id),
          count: count > 0 ? count - 1 : count,
        });
      },
    };

    variants[ticket.field]();
    dispatch({ type: 'clickedOnTicket', value: false });
  };

  const draggableOverHelp = (elem, draggable) => {
    draggable ? (draggableOver = elem) : (draggableOver = null);
  };

  const getTransformField = (field) => {
    const fields = {
      repository,
      test,
      ready,
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

          const getOldDroppableField = getTransformField(
            result.source.droppableId
          );
          const sourceIndex = result.source.index;
          const draggableElem = getOldDroppableField[sourceIndex];
          const destinationColumnName = result.destination.droppableId;
          const sourceColumnName = result.source.droppableId;

          setElemToFirebase(
            destinationColumnName,
            sourceColumnName,
            draggableElem,
            draggableElem.id
          );

          downloadAllElements();
          draggableOver = null;
        }}
      >
        <WorkField
          dispatch={dispatch}
          handleSubmit={handleSubmit}
          name={name}
          title={title}
          repository={repository}
          test={test}
          ready={ready}
          openInfoAboutTicket={openInfoAboutTicket}
          draggableOverHelp={draggableOverHelp}
          draggableOver={draggableOver}
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
