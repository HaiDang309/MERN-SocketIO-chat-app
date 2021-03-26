const INITIAL_STATE = {
    id:'',
    avatar: '',
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "GET_URL_OF_AVATAR":
            return {
                ...state,
                avatar: action.payload.avatar
            };
        case 'GET_ID_OF_USER':
            return {
                ...state,
                id: action.payload.id
            }
        default:
            return state;
    }
}

export default userReducer