import { DateTime, Interval } from 'luxon';

const getInterval = (then) => {
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
  if (i.length('hours', true) < 1) {
    return 'Less than a hour ago.';
  }
  if (i.length('hours', true) < 5) {
    return 'Less than a five hours ago.';
  }
  if (i.length('hours', true) < 12) {
    return 'Less than twelve hours ago.';
  }
  if (i.length('days', true) < 1) {
    return 'Less than a one day ago.';
  }
  if (i.length('days', true) < 2) {
    return 'Less than a two days ago.';
  }
  if (i.length('days', true) < 3) {
    return 'Less than a three days ago.';
  }
  if (i.length('days', true) < 4) {
    return 'Less than a four days ago.';
  }
  if (i.length('days', true) < 5) {
    return 'Less than a five days ago.';
  }
  if (i.length('days', true) < 6) {
    return 'Less than a six days ago.';
  }
  if (i.length('days', true) < 7) {
    return 'Less than a seven days ago.';
  }
  if (i.length('weeks', true) < 1) {
    return 'Less than a one week ago.';
  }
  if (i.length('mounts', true) < 1) {
    return 'Less than a one mounts ago.';
  }
  if (i.length('mounts', true) < 3) {
    return 'Less than a one year ago.';
  } else {
    return 'TIME ERROR';
  }
};

export default getInterval;
