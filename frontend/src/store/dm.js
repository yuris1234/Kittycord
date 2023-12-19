import csrfFetch from "./csrf";
import { receiveMessages } from "./message"
import { receiveUsers } from "./user";
import { RECEIVE_MESSAGE } from "./message";
import { RECEIVE_USER } from "./user";

export const RECEIVE_DM = "dms/RECEIVE_DM";
export const RECEIVE_DMS = "dms/RECEIVE_DMS";

export const receiveDm = (dm) => ({
    type: RECEIVE_DM,
    payload: dm
})

export const receiveDms = (dms) => ({
    type: RECEIVE_DMS,
    payload: dms
})

export const getDm = (dmId) => (state) => {
    if (state.dms) {
        return state.dms[dmId]
    }
}

export const createDm = (user1, user2) => async (dispatch) => {
    console.log('hello from create Dm')
    const res = await csrfFetch('/api/dms', {method: "POST", headers: {'Content-Type': 'application/json'}});
    if (res.ok) {
        console.log('dm successfully created')
        const data = await res.json();
        const user1Res = await csrfFetch('/api/membership_joins', {method: "POST",  body: JSON.stringify({user_id: user1, membership_type: "Dm", membership_id: data.dm.id}), headers: {'Content-Type': 'application/json'}});
        const user1ResJSON = await user1Res.json();
        console.log(user1ResJSON);
        if (user1Res.ok) {
            console.log('membershipjoin1 successfully created')
            const user2Res = await csrfFetch('/api/membership_joins', {method: "POST",  body: JSON.stringify({user_id: user2, membership_type: "Dm", membership_id: data.dm.id}), headers: {'Content-Type': 'application/json'}});
            const user2ResJSON = await user2Res.json();
            console.log(user2ResJSON);
            if (user2Res.ok) {
                console.log('membershipjoin2 successfully created')
                const dmRes = await csrfFetch(`/api/dms/${data.dm.id}`);
                const dm = await dmRes.json();
                dispatch(receiveDm(dm))
                return dm;
            }
        }
    }
}

export const fetchDm = (dmId) => async (dispatch) => {
    const res = await csrfFetch(`/api/dms/${dmId}`);
    const data = await res.json();
    dispatch(receiveDm(data));
}

// export const fetchDms = () => async (dispatch) => {
//     const res = await csrfFetch('/api/dms');
//     const data = await res.json();
//     dispatch(receiveDms(data));
// }

const dmsReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_DM:
            nextState[action.payload.dm.id] = action.payload.dm
            return nextState;
        case RECEIVE_DMS:
            return {...nextState, ...action.payload.dms}
        // case RECEIVE_MESSAGE:
        //     debugger
        //     return nextState;
        case RECEIVE_USER:
            return {...nextState, ...action.payload.dms}
        default:
            return state;
    }
}
export default dmsReducer;