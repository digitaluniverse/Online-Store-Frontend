import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message, FormContainer } from '../components'
import { userActions } from '../actions'

function RegisterScreen({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageVariant, setMessageVariant] = useState('')
    const [showLoginButton, setShowLoginButton] = useState(false)
    const [showConfirmButton, setShowConfirmButton] = useState(false)

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, error_type, loading, registrationSuccess } = userRegister

    useEffect(() => {
        if (registrationSuccess) {
            setShowLoginButton('true')
            setMessageVariant('success')
            setMessage('Check your inbox for a verification email')
        }
        if (error) {
            setMessageVariant('danger')
            setMessage(error)
            if (error_type) {
                switch (error_type) {

                    case 'exists':
                        setShowLoginButton(true)
                        setMessage(error, error_type)
                        console.log('exists')
                    case 'verify':
                        setShowConfirmButton(true)
                        setMessage(error, error_type)
                        console.log('verify')

                    default:
                        setShowConfirmButton(false)
                        setMessage(error, error_type)
                        console.log(error_type)                }

            }
        }
    }, [history, registrationSuccess, redirect, error, error_type])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessageVariant('danger')
            setMessage('Passwords do not match')
        } else {
            dispatch(userActions.register(name, email, password))
        }

    }


    return (
        <FormContainer>
            <h1>Sign Up</h1>

            {message && <Message variant={messageVariant}>{message}</Message>}
            {/* {error && <Message variant='danger'>{error}</Message>} */}
            {loading && <Loader />}
            {showLoginButton &&
                <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    <Button variant='primary'>
                     Click here to login
                    </Button >
                </Link>
            }
            {showConfirmButton &&
                <Link
                    to={redirect ? `/confirm-email/?email=${email}&send=true` : '/login'}>
                    <Button variant='primary'>
                     Click here to Resend Verification
                    </Button >                
                    </Link>
            }
{ !registrationSuccess && 
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>
}
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen