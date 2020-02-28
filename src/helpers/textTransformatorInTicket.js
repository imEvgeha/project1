const textTransformatorInTicket = (text, type) => {
  if (type === 'name' && text.length > 10) {
    return text.slice(0, 10) + '...';
  }
  if (type === 'title' && text.length > 25) {
    return `${text.slice(0, 25)}...`;
  }
  return text;
};

export default textTransformatorInTicket;
