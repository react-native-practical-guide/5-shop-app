import { SIGN_UP, LOG_IN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case SIGN_UP:
            return {
                token: action.token,
                userId: action.userId
            }
            case LOG_IN:
                return {
                    token: action.token,
                    userId: action.userId
                }
    
        default: 
           return state
    } 
}