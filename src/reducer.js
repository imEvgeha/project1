export default function (state, action) {
  switch (action.type) {
    case 'clickedOnTicket':
      return {
        ...state,
        clickedOnTicket: action.value,
      };
    case 'ticketCopy':
      return {
        ...state,
        ticketCopy: action.value,
      };
    case 'value':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'count':
      return {
        ...state,
        count: action.value,
      };
    default:
      return state;
  }
}
