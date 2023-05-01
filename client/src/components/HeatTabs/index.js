import React from 'react';
import { Link } from 'react-router-dom';

const HeatTabs = (props) => {
  const heatList = props.heats
  .map((heat, index) => (
    <Link className="btn btn-lg btn-info m-2"
    to={`/events/${props.eventId}?heatIndex=${index}`}>
      Heat {`${heat.heatNumber}`}
    </Link>
  ))
  return (
    <nav className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        {heatList}
      </div>
    </nav>
  );
};

export default HeatTabs;
