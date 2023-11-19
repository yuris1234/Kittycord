import csrfFetch from "./csrf";
import { receiveMessages } from "./message"

export const RECEIVE_DM = "dms/RECEIVE_DM";

export const receiveDm = (dm) => ({
    type: RECEIVE_DM,
    payload: dm
})

export const fetchDm = (dmId) => async (dispatch) => {
    const res = await csrfFetch(`/api/dms/${dmId}`);
    const data = await res.json();
    dispatch(receiveDm(data));
    dispatch(receiveMessages(data));
}

const dmsReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_DM:
            // debugger
            nextState[action.payload.dm.id] = action.payload.dm
            return nextState;
        default:
            return state;
    }
}
export default dmsReducer;