export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, messageId) => {
  return {
    type: OPEN_MODAL,
    modal,
    messageId
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}

const initialState = {modal: null};


const modalsReducer = (state=initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
          return {modal: action.modal, id: action.messageId}
        case CLOSE_MODAL:
          return {modal: null}
        default:
          return state;
    }
}

export default modalsReducer