const MoveTo = (id, neededElem, elemPush, set1, set2, where) => {
  const elem = neededElem.find(ticket => ticket.id === id);
  elem.field = where;
  const neededId = neededElem.indexOf(elem);
  const newNeededElem = neededElem.slice();
  const deletedElem = newNeededElem[neededId];
  newNeededElem.splice(neededId, 1);
  set1(newNeededElem);
  set2([...elemPush, deletedElem]);
};

export default MoveTo;
