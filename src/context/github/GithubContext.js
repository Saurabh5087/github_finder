import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext()

// Creating and Exporting a Provider function which will
// wrap around those components(Children) who requires
// the states defined in this provider function
export const GithubProvider = ({children}) => {
  const intialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, intialState)

  return(
    <GithubContext.Provider 
    value={{ 
      ...state,
      dispatch
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext