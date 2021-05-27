import React, { useState, useEffect } from 'react'
import { Loader, Message, FormContainer } from 'components'
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { verifyUserPhone, registerUserPhone } from '../actions/userActions'

function VerifyPhoneForm({ number, show, handleClose }) {
    const [authy_phone, setAuthyPhone] = useState(number)
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')




    const dispatch = useDispatch()

    const userVerifyPhone = useSelector(state => state.userVerifyPhone)
    const { verifcationSuccess, loadingPhoneVerification } = userVerifyPhone

    const userRegisterPhone = useSelector(state => state.userRegisterPhone)
    const { registrationSuccess, loadingPhoneRegistration } = userRegisterPhone


    useEffect(() => {

        // if (verifcationSuccess && ((!registrationSuccess && !loadingPhoneRegistration)|| loadingPhoneVerification) ) {
        //     dispatch(verifyUserPhone(authy_phone))
        // } else {
        //     console.log()
        // }

    }, [dispatch, verifcationSuccess])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(verifyUserPhone(authy_phone))
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
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='number'>
                            <Form.Label className="mr-3" >Phone Number
                        </Form.Label>

                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter Phone Number'
                                value={authy_phone}
                                onChange={(e) => setAuthyPhone(e.target.value)}
                            >
                            </Form.Control>

                        </Form.Group>



                        <Button size='sm' type='submit' variant='primary'>
                            Send Verification Code
                        </Button>

                    </Form>


                </FormContainer>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
          </Button>

            </Modal.Footer>
        </Modal>


    )
}

export default VerifyPhoneForm
