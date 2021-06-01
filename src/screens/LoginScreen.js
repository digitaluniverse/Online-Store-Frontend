import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message, FormContainer } from '../components'
import { login, authyLogin } from '../actions/userActions'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authyEmail, setAuthyEmail] = useState('')
    const [code, setCode] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const submitAuthyLogin = (e) => {
        e.preventDefault()
        dispatch(authyLogin(authyEmail, code))
    }



    return (

        <Row>
            <Col>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <FormContainer>
                    <h1>Sign In</h1>

                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
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
                    </Row>



                </FormContainer>
            </Col>
            <Col>
                <FormContainer>
                    <h1>Sign In With Authy</h1>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitAuthyLogin}>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email '
                                value={authyEmail}
                                onChange={(e) => setAuthyEmail(e.target.value)}
                            >
                            </Form.Control>
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
    )
}

export default LoginScreen