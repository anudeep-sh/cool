import React, { useState } from 'react';
import ContestClock from '../ContestClock';

const Clock = ({ startingDate, duration, contest_going }) => {
  const [Days, setDays] = useState(0);
  const [Minutes, setMinutes] = useState(0);
  const [Hours, setHours] = useState(0);
  const [Seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);

  const startTimer = () => {
    const interval = setInterval(() => {
      const now = new Date().getTime() / 1000;
      const distance = startingDate + duration - now;
      const days = Math.floor(distance / (24 * 60 * 60));
      const hours = Math.floor((distance % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((distance % (60 * 60)) / 60);
      const seconds = Math.floor(distance % 60);

      if (distance < 0) {
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
      return () => {
        clearInterval(interval);
      };
    }, 1000);
  };

  startTimer();
  setTimeout(() => {
    setStart(true);
  }, 3000);

  return (
    <>
      <ContestClock
        start={start}
        contestStatus={contest_going}
        days={Days}
        mins={Minutes}
        hours={Hours}
        seconds={Seconds}
      />
    </>
  );
};

export default Clock;
