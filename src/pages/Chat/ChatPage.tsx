import React, { useEffect, useState, useRef } from "react"
import './Chat.css'
import { useDispatch } from "react-redux"
import { getReceivedMessages, sendChatMessage, stopReceivedMessages } from "../../redux/chatReducer"
import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { NavLink, Navigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/reduxHooks"

type ChatMessageType =
    {
        message: string
        photo: string
        userId: number
        userName: string
    }

const ChatPage: React.FC = () => {
    return <div>
        <Chat></Chat>
    </div>
}

const Chat: React.FC = React.memo(() => {

    let status = useSelector((state: AppStateType) => state.chat.status)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useAppDispatch()
    useEffect(() => {
        debugger
        dispatch(getReceivedMessages())
        return () => {
            dispatch(stopReceivedMessages())
        }
    }, [])

    if (!isAuth) {
        return <Navigate to="/profile" />;
    } else
        return <div>
            {status === 'error' ? <div>Error. Please restart page</div> :
                <div>
                    <Messages></Messages>
                    <AddMessages></AddMessages>
                </div>}
        </div>
})

const Messages: React.FC = React.memo(() => {
    const [autoScroll, setAutoScroll] = useState(false)
    let messageAnchorRef = useRef<HTMLDivElement>(null)
    let messages = useSelector((state: AppStateType) => state.chat.messages)
    useEffect(() => {
        if (autoScroll) {
            messageAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
        }

    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let el = e.currentTarget
        if (Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight) < 300) {
            setAutoScroll(true)
        } else {
            setAutoScroll(false)
        }
    }
    return <div style={{ height: 780, overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map((c) => <Message message={c}></Message>)}
        <div ref={messageAnchorRef}></div>
    </div>
})

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {

    return <div className="singleMessage">
        <NavLink to={"/profile/" + message.userId}>
            <div><b>{message.userName}</b> </div>
        </NavLink>
        <img src={message.photo}></img>
        <div>{message.message}</div>
    </div>
})



const AddMessages: React.FC = () => {

    const dispatch = useAppDispatch()
    let status = useSelector((state: AppStateType) => state.chat.status)
    let [message, setMessage] = useState('')
    const sendMessage = () => {
        dispatch<any>(sendChatMessage(message))
        setMessage("")
    }
    return <div className={'sendWindow'} >
        <div >
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            <button disabled={status !== 'ready'} onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage