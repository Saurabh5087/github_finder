import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext()
const GITHUB_URL = "https://api.github.com"

// Creating and Exporting a Provider function which will
// wrap around those components(Children) who requires
// the states defined in this provider function
export const GithubProvider = ({children}) => {
  const intialState = {
    users: [],
    loading: true
  }

  const [state, dispatch] = useReducer(githubReducer, intialState)

  // Fetch User function to get the users array from GithHub API 
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`)
    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }

  return(
    <GithubContext.Provider 
    value={{ 
      users: state.users,
      loading: state.loading,
      fetchUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext