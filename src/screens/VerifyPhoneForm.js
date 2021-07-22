import React, { useState, useEffect } from 'react'
import { Loader, Message, FormContainer } from 'components'
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../actions'

function VerifyPhoneForm({ number, show, handleClose }) {
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')
    const [codeSent, setCodeSent] = useState(false)


    const dispatch = useDispatch()
    const userVerifyPhone = useSelector(state => state.userVerifyPhone)
    const { verifcationSuccess, loadingPhoneVerification } = userVerifyPhone

    const userRegisterPhone = useSelector(state => state.userRegisterPhone)
    const { registrationSuccess, loadingPhoneRegistration, error } = userRegisterPhone


    useEffect(() => {
        if (show && !codeSent) {
            sendCode()
        }
        if (registrationSuccess) {
            setCodeSent(false)
            window.location.reload();
            handleClose()
        }

    }, [dispatch, verifcationSuccess, codeSent, show,registrationSuccess])


    const closeDialog = () => {
        setCodeSent(false)
        handleClose()
    }

    const sendCode = () => {
        console.log("Sending code")
        dispatch(userActions.verifyUserPhone(number))
        setMessage('')
        setCodeSent(true)
    }

    const submitRegisterHandler = (e) => {
        e.preventDefault()
        dispatch(userActions.registerUserPhone(number, token))
        setMessage('')

    }

    return (

        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>Phone Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormContainer>
                    <Form onSubmit={submitRegisterHandler}>




                        <Form.Group controlId='code'>
                            <Form.Label className="mr-3" >Enter SMS Code
                    </Form.Label>

                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter Code sent to your Phone'
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            >
                            </Form.Control>

                        </Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                    <Button size='md' variant='primary' onClick={sendCode}>
                                        Re-Send Code
                                    </Button>
                                </Col>
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

export default VerifyPhoneForm
