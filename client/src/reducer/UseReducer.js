export const initialState = {
    isAuthenticated: false
};


export const reducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return {
                ...state,
                isAuthenticated: action.payload
            };
        default:
            return state;
    }
};