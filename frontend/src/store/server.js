import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./user";
export const RECEIVE_SERVER = "servers/RECEIVE_SERVER";
export const RECEIVE_SERVERS = "servers/RECEIVE_SERVERS";

export const receiveServer = (server) => ({
    type: RECEIVE_SERVER,
    payload: server
})

export const getServer = (serverId) => (state) => {
    if (serverId && state.servers[serverId]) {
        return state.servers[serverId]
    }
}

export const getServers = (serverIds) => (state) => {
    if (serverIds) {
        const holder = Object.values(state.servers).filter((server) => serverIds?.includes(server.id));
        return holder;
    }
}

export const createServer = (userId, server) => async (dispatch) => {
    const res = await csrfFetch('/api/servers', {method: "POST", body: JSON.stringify(server)});
    if (res.ok) {
        const data = await res.json();
        const res2 = await csrfFetch('/api/membership_joins', {method: "POST", body: JSON.stringify({user_id: userId, membership_type: "Server", membership_id: data.server.id}), headers: {'Content-Type': 'application/json'}});
        if (res2.ok) {
            dispatch(receiveServer(data));
        }
    }
}

export const fetchServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveServer(data));
    }
}

const serversReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_SERVER:
            nextState[action.payload.server.id] = action.payload.server
            return nextState
        case RECEIVE_USER:
            return {...nextState, ...action.payload.servers}

        default:
            return nextState
    }
}

export default serversReducer