import React, { useState, useEffect } from 'react'
import { Loader, Message, FormContainer } from 'components'
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { passwordResetEmail } from '../actions/userActions'

function PasswordResetForm({ show, handleClose }) {
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')


    const dispatch = useDispatch()
    const userPasswordResetEmail = useSelector(state => state.userPasswordResetEmail)
    const { resetEmailSentSuccess, loadingSendPassResetEmail } = userPasswordResetEmail


    useEffect(() => {

        if (resetEmailSentSuccess) {
            handleClose()
        }

    }, [dispatch, resetEmailSentSuccess, show])


    const closeDialog = () => {
        handleClose()
    }

    const submitRegisterHandler = (e) => {
        e.preventDefault()
        dispatch(passwordResetEmail(email))
        setMessage('')
    }

    return (

        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>Password Reset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormContainer>
                    <Form onSubmit={submitRegisterHandler}>

                        <Form.Group controlId='email'>
                            <Form.Label className="mr-3" >Enter Email
                    </Form.Label>

                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter Your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>

                        </Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                    <Button size='md' type='submit' variant='primary'>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Container>

                    </Form>



                </FormContainer>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeDialog}>
                    Close
          </Button>

            </Modal.Footer>
        </Modal>


    )
}

export default PasswordResetForm
