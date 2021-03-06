import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message, FormContainer } from '../components'
import { userActions} from '../actions'
import { PasswordResetForm } from 'screens'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authy_phone, setAuthyPhone] = useState('')
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const [showConfirmButton, setShowConfirmButton] = useState('false')
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);
    const [messageVariant, setMessageVariant] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    
    const userVerifyEmail = useSelector(state => state.userVerifyEmail)
    const { verifcationSuccess, loadingEmailVerification } = userVerifyEmail


    const handlePasswordResetModal = () => {
        setShowPasswordReset(true)
    }


    const handleEmailVerify = () => {
        console.log("Sending Email")
        dispatch(userActions.verifyUserEmail(email))
        setMessageVariant('info')
        setMessage('Sending Email Verification')
    }
    

    
    useEffect(() => {


        if (userInfo) {
            history.push(redirect)
        }
        if (!error || !loading){
            setShowConfirmButton(false)
        }

        if (error == "verification") {
            setShowConfirmButton(true);
            setMessageVariant('warning')
            setMessage("Email must be verified before login");
        }
        else {
            setMessage(error);
        }
    }, [history, userInfo, error, redirect, showPasswordReset, message])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userActions.login(email, password))
    }
    const submitAuthyLogin = (e) => {
        e.preventDefault()
        dispatch(userActions.authyLogin(authy_phone, code))
    }

    const handlePasswordResetFormClose = () => {
        console.log("Password Reset Form Close")
        setShowPasswordReset(false)
        history.push('/login')
    }

    const handleVerifyEmailFormClose = () => {
        console.log("Verify Email Form Close")
        setShowPasswordReset(false)
        // history.push('/login')
    }


    return (
        <Container>
                {message && <Message variant={messageVariant}>{message}</Message>}


            {loading && <Loader />}

            <PasswordResetForm
                show={showPasswordReset}
                handleClose={() => { handlePasswordResetFormClose() }}
            />
            

            

            <Row>

                <Col>

                    <FormContainer>
                        <Row>
                        <h1>Sign In</h1>
            {showConfirmButton &&
                <Link
                    to={redirect ? `/confirm-email/?email=${email}&send=true` : '/login'}>
                    <Button variant='primary'>
                     Click here to Resend Verification
                    </Button >                
                    </Link>
            }

                        </Row>

                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value); setShowConfirmButton(false)}}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Sign In
                            </Button>

                        </Form>



                        <Row className='py-3'>

                            <Col>
                                New Customer? <Link
                                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    Register
                                </Link>
                            </Col>
                            <Col className='py-3'>
                                <Button style={{ padding: '.1em 1em .1em 1em', fontSize: '.8em' }} type='submit' variant='outline-danger' onClick={handlePasswordResetModal}>
                                    Reset Password
                                </Button>
                            </Col>
                        </Row>




                    </FormContainer>
                </Col>
                <Col>
                    <FormContainer>
                        <h1>Sign In With Authy</h1>
                        <Form onSubmit={submitAuthyLogin}>

                            <Form.Group controlId='authy_phone'>
                                <Form.Label>Phone</Form.Label>
                                <PhoneInput
                                    country={'us'}
                                    value={authy_phone}
                                    onChange={(authy_phone) => setAuthyPhone(authy_phone)}
                                />
                            </Form.Group>


                            <Form.Group controlId='token'>
                                <Form.Label>Authy Code</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Authy Code'
                                    value={code}
                                    minLength='7'
                                    maxLength='7'

                                    onChange={(e) => setCode(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Sign In
                            </Button>

                        </Form>






                    </FormContainer>
                    
                </Col>



            </Row>
            
        </Container>
    )
}

export default LoginScreen