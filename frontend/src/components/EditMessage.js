import { useSelector } from "react-redux"
import { updateMessage } from "../store/message"
import { closeModal } from "../store/modal"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { openModal } from "../store/modal"

function EditMessage({message}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState(message.body)

    let component = <textarea onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
        if (e.code === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        } else if (e.code === 'Escape' && !e.shiftKey) {
            handleEscape(e);
        }
        }}> 
        </textarea>

    const handleSubmit = e => {
        dispatch(updateMessage({...message, body: body}))
        dispatch(openModal('view'));
    }

    const handleEscape = e => {
        dispatch(openModal('view'));
    }

    return (
        <>
            <div>
                <textarea onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                            handleSubmit(e);
                        } else if (e.code === 'Escape' && !e.shiftKey) {
                            handleEscape(e);
                        }
                    }}> 
                </textarea>
            </div>
        </>
    )
}

export default EditMessage