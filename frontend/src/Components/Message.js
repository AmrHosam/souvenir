import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <Alert className='mx-5 my-4 ' variant={variant} >{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
