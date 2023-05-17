import { createContext, useState } from 'react';

const GithubContext = createContext()
const GITHUB_URL = "https://api.github.com"

// Creating and Exporting a Provider function which will
// wrap around those components(Children) who requires
// the states defined in this provider function
export const GithubProvider = ({children}) => {
  
  // users state is used to store all the user fecthed on page load
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch User function to get the users array from GithHub API 
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`)
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  return(
    <GithubContext.Provider 
    value={{ 
      users,
      loading,
      fetchUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext