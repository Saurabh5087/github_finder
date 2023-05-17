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

  // Get search results
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text
    })
    setLoading()
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
    const {items} = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: items
    })
  }

  // Clear users from state
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USER'
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
      searchUsers,
      clearUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext