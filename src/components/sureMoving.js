import React from 'react';

const SureMoving = props => {
  return (
    <div className="backgroundInfo">
      <div className="sureMoving">
        <h3>Вы точно хотите перенести билет на другое поле?</h3>
        <button onClick={props.moving}>Перенести</button>
        <button onClick={props.cancel}>Отмена</button>
      </div>
    </div>
  );
};

export default SureMoving;
