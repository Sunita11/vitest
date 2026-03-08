import useFetchWithCache from "../customHooks/fetchApiWithCache";

function Users() {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetchWithCache("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users &&
          Array.isArray(users) &&
          // @ts-expect-error
          users.map((user: any) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default Users;
