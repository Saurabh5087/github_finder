import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";

function UserResults() {
  // users state is used to store all the user fecthed on page load
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Calling FetchUsers functions on every page load
  useEffect(() => {
    fetchUsers()
  }, [])

  // Fetch User function to get the users array from GithHub API 
  const fetchUsers = async () => {
    const response = await fetch("https://api.github.com/users")
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  if(!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols:3 md:grid-cols-2">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }

}

export default UserResults