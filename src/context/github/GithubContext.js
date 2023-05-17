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
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, intialState)

  // Get initial Users (testing purposes)
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users`)
    const data = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }

  // Set Loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING'
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