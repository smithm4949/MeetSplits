import React from 'react';
import EntrantItem from '../EntrantItem';

const EntrantList = ({entrants, handleEntrantFinish, numSplits, startTime, heatIndex}) => {
  
  const entrantItems = entrants
  .map((entrant, index) => (
    <EntrantItem
      key={index}
      athletes={entrant.athletes}
      handleEntrantFinish={handleEntrantFinish}
      numSplits={numSplits}
      startTime={startTime}
      heatIndex={heatIndex}
    />
  ));
  return (
    {entrantItems}
  );
};

export default EntrantList;
