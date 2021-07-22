import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions} from '../actions'
import { Loader, Message, FormContainer } from 'components'
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ConfirmEmailScreen({ match, location, history }) {

    let search = new URLSearchParams(location.search);
    const id = location.search ? String(search.get('token')) : null
    const code = location.search ? String(search.get('code')) : null
    const [email, setEmail] = useState(location.search ? String(search.get('email')) : null)
    const [message, setMessage] = useState('')
    const [messageVariant, setMessageVariant] = useState('')
    const [showVerifyForm, setShowVerifyForm] = useState(false)
    const [showError, setShowError] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [send, setSend] = useState(search.has('send') ? true : false)



    const dispatch = useDispatch()

    const userVerifyEmail = useSelector(state => state.userVerifyEmail)
    const { verifcationSuccess, loadingEmailVerification, error, error_type } = userVerifyEmail

    const userEmailConfirm = useSelector(state => state.userEmailConfirm)
    const { EmailConfirmSuccess, loadingConfirmEmail, userInfo } = userEmailConfirm


    

    useEffect(() => {
        if(send){
            dispatch(userActions.verifyUserEmail(email))
            setMessageVariant('success')
            setMessage('Confirmation email sent check your junk folder if you can not find it')
            setSend(false)
        }
        if (!id && !code) {
            setShowVerifyForm(true)
        }
        if (id && code && !loadingConfirmEmail && !EmailConfirmSuccess && !confirmed) {
            dispatch(userActions.confirmEmail(id, code))
            console.log("dispatching")
        }
        if (EmailConfirmSuccess) {
            setMessage("verified "+ userInfo.verified)
            setMessageVariant('success')
            setConfirmed(true)
        }
        if (!EmailConfirmSuccess & id & code & !email) {
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


    }, [dispatch, history, id, code, EmailConfirmSuccess, error, loadingEmailVerification, message, confirmed, send ])


    const closeVerifyModal = () => {
        setShowVerifyForm(false)
    }


    const submitVerifyHandler = (e) => {
        e.preventDefault()
        dispatch(userActions.verifyUserEmail(email))
        setMessage('')
    }

    return (
        <div>
            {id ? <div>token: {id}</div>: ''}
            {code ? <div>code: {code}</div>: ''}
            {email != '' ? <div>email: {email}</div>: ''}
            {send ? <div>send: {String(send)}</div>: ''}

            {message && <Message variant={messageVariant}>{message}</Message>}
            {
                (confirmed || error_type == 'email_exists') ?
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
                                            Send Confirmation
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
