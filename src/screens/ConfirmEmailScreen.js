import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmEmail, verifyUserEmail } from '../actions/userActions'
import { Loader, Message, FormContainer } from 'components'
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ConfirmEmailScreen({ match, location, history }) {

    const id = match.params.email
    const code = location.search ? String(location.search.split('=')[1]) : null
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageVariant, setMessageVariant] = useState('')
    const [showVerifyForm, setShowVerifyForm] = useState(false)
    const [showError, setShowError] = useState(false)
    const [Confirmed, setConfirmed] = useState(false)


    const dispatch = useDispatch()

    const userVerifyEmail = useSelector(state => state.userVerifyEmail)
    const { verifcationSuccess, loadingEmailVerification, error } = userVerifyEmail

    const userEmailConfirm = useSelector(state => state.userEmailConfirm)
    const { EmailConfirmSuccess, loadingConfirmEmail, userInfo } = userEmailConfirm




    useEffect(() => {
        if (!id && !code) {
            setShowVerifyForm(true)
        }
        if (id && code && !loadingConfirmEmail && !EmailConfirmSuccess) {
            dispatch(confirmEmail(id, code))
            console.log("dispatching")
        }
        if (EmailConfirmSuccess) {
            setMessage(userInfo)
            setMessageVariant('success')
            setConfirmed(true)
        }
        if (!EmailConfirmSuccess) {
            setMessage("Email Confirmation Invalid")
            setMessageVariant('danger')
        }
        if(error && !loadingEmailVerification){
            if (error == 'Email already verified'){
                setConfirmed(true)
                setMessage(error)
                closeVerifyModal()
                // history.push("/login")
            }
            setShowError(true)
        }

        // if (loadingEmailVerification){
        //     setShowError(false)
        // }


    }, [dispatch, history, id, code, EmailConfirmSuccess, error, loadingEmailVerification, message])


    const closeVerifyModal = () => {
        setShowVerifyForm(false)
    }


    const submitVerifyHandler = (e) => {
        e.preventDefault()
        dispatch(verifyUserEmail(email))
        setMessage('')
    }

    return (
        <div>
            {message && <Message variant={messageVariant}>{message}</Message>}
            {
                Confirmed ?
                <Link to="/login">
                <Button>
                     Click here to login
                </Button>
            </Link>
                    :  <Link to="/confirm-email">
                    <Button>
                         Confirm Email
                    </Button>
                </Link>
            }

            <Modal show={showVerifyForm} onHide={closeVerifyModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title>Confirm Email</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                {showError && <Message variant={'danger'}>{error}</Message>}

                    <FormContainer>
                        <Form onSubmit={submitVerifyHandler}>

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
                    <Button variant="primary" onClick={closeVerifyModal}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ConfirmEmailScreen
