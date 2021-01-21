Using React useReducer + useContext to create redux effect:
STEP 1) create counter(functionality/ubdation in App.js) using the reducer hook
STEP 2) to provide and consume the counter context in the required components

useReducer hook gives us the access to the state and the dispatch method

we want to dispatch actions from other components and so we use context to
provide count value and dispatch method and to consume the same from other components


//how we doing in this app


const UserContext = createContext()

inside the userReducer.js(simple reducer function)


const initialState = null
//i.e no data related to user
const reducer = (state, action)=>{
    if(action.type=="USER"){
        return action.payload
    }
    return state
}

