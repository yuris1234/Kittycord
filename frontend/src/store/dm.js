import csrfFetch from "./csrf";

export const RECEIVE_DM = "dms/RECEIVE_DM";

const receiveDm = (dm) => ({
    type: RECEIVE_DM,
    dm
})

export const fetchDm = (dmId) => async (dispatch) => {
    const res = await csrfFetch(`api/dms/${dmId}`);
    const data = await res.json();
    dispatch(receiveDm(data));
}

const dmsReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_DM:
            return {...nextState, ...action.dm};
        default:
            return state;
    }
}
export default dmsReducer;