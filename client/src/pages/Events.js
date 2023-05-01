import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// import any queries needed
import { QUERY_EVENTS } from '../utils/queries';

const Events = () => {
  // call our query
  const { loading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  let eventList = events.map(event => (
    <Link className="btn btn-lg btn-info m-2" to={`/events/${event.meetEvent}`}>
      {event.name}
    </Link>
  ))

  return (
    <div>
      {eventList}
    </div>
  );
};

export default Events;
