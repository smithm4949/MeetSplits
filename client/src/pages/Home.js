import { useQuery } from '@apollo/client';

// import any queries needed
import { QUERY_USER } from '../utils/queries';

const Home = () => {
  // call our query
  const { loading, data } = useQuery(QUERY_USER, {
    fetchPolicy: "no-cache"
  });
  const user = data?.user || {name: 'anonymous'};

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to the Track Timing App!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Hello {user.name}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>Finished Loading!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
