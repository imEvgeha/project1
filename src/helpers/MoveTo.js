const MoveTo = (id, neededElem, elemPush, set1, set2, where) => {
  console.log(id);
  const elem = neededElem.find(ticket => ticket.id === id);
  const neededId = neededElem.indexOf(elem);
  const newNeededElem = neededElem.slice();
  const deletedElem = newNeededElem[neededId];
  newNeededElem.splice(neededId, 1);
  set1(newNeededElem);
  set2([...elemPush, deletedElem]);
  elem.field = where;
};

export default MoveTo;
