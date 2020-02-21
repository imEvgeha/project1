import React from 'react';

const WorkField = props => {
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
                onChange={props.handleChange}
                value={props.name}
                name="name"
              ></input>
            </b>
            <br></br>
            <b>
              Title:
              <input
                type="text"
                onChange={props.handleChange}
                value={props.title}
                name="title"
              ></input>
            </b>
            <br></br>
            <input type="submit"></input>
          </form>
        </div>
      </div>
      <div className="fields">
        <div className="field">{props.fillingField1}</div>
        <div className="field">{props.fillingField2}</div>
        <div className="field">{props.fillingField3}</div>
      </div>
    </div>
  );
};

export default WorkField;
