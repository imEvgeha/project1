const MoveTo = (
  id,
  currentField,
  whereField,
  setCurrentField,
  setWhereField
) => {
  const elem = currentField.find((ticket) => ticket.id === id);
  const elemId = currentField.indexOf(elem);
  const newCurrentField = currentField.slice();
  const deletedElem = newCurrentField[elemId];
  newCurrentField.splice(elemId, 1);
  setCurrentField(newCurrentField);
  setWhereField([...whereField, deletedElem]);
};

export default MoveTo;
