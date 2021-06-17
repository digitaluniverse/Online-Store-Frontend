import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {


    useEffect(() => {

      }, []);     
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default Message
