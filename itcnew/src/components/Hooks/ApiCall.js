import useFetch from "./useFetch";

function ApiCall() {
  //const BASE_URL = "https://reqres.in/api/users/";
  const BASE_URL = 'https://jsonplaceholder.typicode.com/users';
  //const BASE_URL = "https://inshortsapi.vercel.app/news?category=all";
  const { data: users, loading, error } = useFetch(BASE_URL);
  return (
    <div className="App">
      <h1>Custom React Hook (Data Fetching)</h1>
      {loading && <h3>loading...</h3>}
      {error && <h3>Error: Something went wrong</h3>}
      <div>
        users length: {users.length}
        {
            users && users.map((user, index) => {
                return (
                    <div key={index}>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                    </div>
                )
            })
        }
        
      </div>
    </div>
  );
}

export default ApiCall;