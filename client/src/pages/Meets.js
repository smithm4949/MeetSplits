import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// import any queries needed
import { QUERY_MEETS } from '../utils/queries';

const Meets = () => {
  // call our query
  const { loading, data } = useQuery(QUERY_MEETS);
  const meets = data?.meets || [];

  let meetList = meets.map(meet => (
    <Link className="btn btn-lg btn-info m-2" to={`/meets/${meet._id}`}>
      {meet.name}
    </Link>
  ))

  return (
    <div>
      {meetList}
    </div>
  );
};

export default Meets;
