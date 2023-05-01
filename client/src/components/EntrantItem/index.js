import React, { useState } from 'react';

const EntrantItem = (props) => {

  const [finishedRunning, setFinishedRunning] = useState(false);
  const [splits, setSplits] = useState([{
    dateTime: props.startTime,
    elapsedTime: 0,
    split: 0
  }]);
  const [splitsString, setSplitsString] = useState('Splits: ');
  let splitIndex = 0;

  function handleClick() {
    if (splits[0].dateTime && !finishedRunning) {
      let prevSplits = splits;
      let splitDateTime = new Date();
      let newSplit = {
        dateTime: splitDateTime,
        elapsedTime: (splitDateTime - prevSplits[0].dateTime),
        split: (splitDateTime - prevSplits[splitIndex].dateTime)
      };
      setSplits([...prevSplits, newSplit]);
      updateSplitsDiplay(newSplit);
      splitIndex++;
      if (splitIndex === props.numSplits) {
        entrantFinishedRace();
      };
    }
  }

  function updateSplitsDiplay(newSplit) {
    let splitsDisplay = splitsString;
    if (splitIndex !== 0) {
      splitsDisplay =+ ','
    }
    splitsDisplay += `${formatTime(newSplit.elapsedTime)} (${formatTime(newSplit.split)})`;
    setSplitsString(splitsDisplay);
    
  }

  function formatTime(time) {
    let seconds = time * 1000;
    let timeString = `${seconds}`;
    if (seconds > 60) {
      let minutes = seconds / 60;
      let remainder = seconds % 60;
      timeString = `${minutes}:${remainder}`;
    }
    return timeString;
  }

  function entrantFinishedRace() {
    setFinishedRunning(true);
    props.handleEntrantFinish(props.heatIndex, props.key, splits);
    //TO DO: disable card visually
  }

  return (
    <div class="card" onClick={handleClick}>
      <div class="card-body">
        <h5 class="card-title">Entrant {props.key}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">{props.athletes}</h6>
        <p class="card-text">{splitsString}</p>
      </div>
    </div>
  );
};

export default EntrantItem;
