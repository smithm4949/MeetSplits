import React, { useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_EVENT_INSTANCE } from '../utils/queries';
import { ADD_SPLITS } from '../utils/mutations';

import EntrantList from '../components/EntrantList';
import HeatTabs from '../components/HeatTabs';

const EventInstance = (props) => {
 
  // if not logged in, redirect home

  // use a query to check if there is already an event instance
  // if no, create and open 'add heat' component in model

  const [startTime, setStartTime] = useState(null);
  const [addSplits, { error }] = useMutation(ADD_SPLITS);
  const [timerDisplay, setTimerDisplay] = useState('00:00:00');
  let timerInterval;
  let numEntrantsFinished = 0;

  const { heatIndex } = useSearchParams();
  const { eventId } = useParams();

  const teamId = "64501bad858de65a741e37c8";
  //for each heat, make a tab
  //setup heats[heatId]

  const {
    loading: eventLoading,
    error: eventError,
    data: eventData
  } = useQuery(QUERY_EVENT_INSTANCE, {
    variables: { eventId, teamId },
  });

  const event = eventData?.eventInstance || {};
  let currentHeat = heatIndex || 0;

  async function handleEntrantFinish(heatIndex, entrantIndex, splitsArray) {
    //save splits for entrants in parent state
    
    // call mutation to save info, refresh page
    event.heats[currentHeat].entrants[entrantIndex].splitTimes = splitsArray;
    numEntrantsFinished++;
    if (numEntrantsFinished === event.entrants.length) {
      clearInterval(timerInterval);
    }
    try {
      const { data } = await addSplits({
        variables: { eventId, splitsArray, heatIndex, entrantIndex },
      });
    } catch (e) {
      console.error(e);
    }

  }

  function handleStartHeat() {
    setStartTime(new Date());
    startTimer();
  }

  
  function startTimer() {

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 10);

    function updateTimer () {
      let timerString = '';
      let currentTime = new Date();
      let elapsedTime = currentTime - startTime;
      
      let minutes = Math.floor(elapsedTime / 60000);
      let seconds = Math.floor((elapsedTime%60000) / 1000);
      let milliseconds = elapsedTime%1000;
      
      if(minutes <= 9){
        timerString += `0${minutes}:`;
      }
      else if (minutes > 9){
        timerString += `${minutes}:`;
      }

      if(seconds <= 9){
        timerString += `0${seconds}:`;
      }
      else if (seconds > 9){
        timerString += `${seconds}:`;
      }
      
      if(milliseconds <= 9){
        timerString += `0${milliseconds}`;
      }
      else if (milliseconds > 9){
        timerString += `${milliseconds}`;
      }
      setTimerDisplay(timerString);
    }

  }
  //const entrants = event.heats[currentHeat].entrants;

  if (eventLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-row justify-center">
      <div className="col-12 col-lg-10">
        <div className="row">
          <HeatTabs
            heats={event.heats}
            eventId={event.meetEvent}
          />
        </div>
        <div className="row">
          {timerDisplay}
        </div>
        <div className="row">
          <EntrantList
            entrants={event.heats[currentHeat].entrants}
            handleEntrantFinish={handleEntrantFinish}
            numSplits={event.legs.length}
            heatIndex={currentHeat}
            startTime={startTime}
          />
          <button onClick={handleStartHeat}>
            Start Race
          </button>
        </div>
      </div>
    </main>
  );
};

export default EventInstance;
