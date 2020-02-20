const MoveTo = (id, neededElem, elemPush, set1, set2) => {
  const elem = neededElem.find(ticket => ticket.id === id);
  const neededId = neededElem.indexOf(elem);
  const newNeededElem = neededElem.slice();
  const deleteElem = newNeededElem[neededId];
  newNeededElem.splice(neededId, 1);
  set1(newNeededElem);
  set2([...elemPush, deleteElem]);
};

export default MoveTo;
