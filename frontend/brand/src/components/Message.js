import React from 'react'

const MessageError = ({msg, type}) => {
    return (<div className={`message ${type}`} >
     <p>{msg}</p>
    </div>)
}

export default MessageError