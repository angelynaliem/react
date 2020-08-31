import { 
    SET_GETTING_TICKET_DATA, 
    SET_TICKET_DATA, 
    SET_TICKET_ERROR, 
    ADD_NEW_TICKET, 
    SET_LOGIN_USER,
    SET_NEW_LOGIN_USER} 
    from "../actions/actions";

export const initialState = {
    tickets: [],
    user: {},
    isFetching: false,
    error: null
}

export const ticketReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_GETTING_TICKET_DATA:
            return {
                ...state,
                isFetching: true,
            }
        case SET_TICKET_DATA:
            return {
                ...state,
                isFetching: false,
                tickets: action.payload
            }
        case SET_TICKET_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case ADD_NEW_TICKET:
            return {
                ...state,
                isFetching: true,
                tickets: [...state.tickets]
            }
        case SET_LOGIN_USER:
            return {
                ...state,
                isFetching: true,
                user: action.payload
            }
        case SET_NEW_LOGIN_USER:
            return {
                ...state,
                isFetching: false,
                user: [...state.user]
            }
        default:
            return state;
    }
} 