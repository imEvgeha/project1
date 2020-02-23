import { DateTime, Interval } from 'luxon';

const getInterval = then => {
  let date = DateTime.local();
  const dateTimeThen = DateTime.fromMillis(then);
  let i = Interval.fromDateTimes(dateTimeThen, date);
  if (i.length('minutes', true) < 1) {
    return 'Less than a minute ago.';
  }
  if (i.length('minutes', true) < 5) {
    return 'Less than a five minutes ago.';
  }
  if (i.length('minutes', true) < 10) {
    return 'Less than a ten minutes ago.';
  }
  if (i.length('minutes', true) < 15) {
    return 'Less than a fifteen minutes ago.';
  }
  if (i.length('minutes', true) < 30) {
    return 'Less than a thirty minutes ago.';
  }
  if (i.length('minutes', true) < 60) {
    return 'Less than a hour ago.';
  } else {
    return 'TIME';
  }
};

export default getInterval;
