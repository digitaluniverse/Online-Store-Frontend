import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from '../components'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { VerifyPhoneForm } from 'screens'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { logout } from '../actions/userActions'


function ProfileScreen({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [authy_phone, setAuthyPhone] = useState('')

    const [verifyEmail, setVerifyEmail] = useState(false)
    const [verifyPhone, setVerifyPhone] = useState(false)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const [showPhoneVerify, setShowPhoneVerify] = useState(false);

    const handleShow = () => {
        setShowPhoneVerify(true)
    }


    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }
        else {
            if(error){
                // dispatch(logout())
            }
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setAuthyPhone(user.authy_phone)
                setVerifyEmail(user.email_verified)
                setVerifyPhone(user.phone_verified)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'authy_phone': authy_phone,
            }))
            setMessage('')
        }
    }

    const handlePhoneFormClose = () => {
        setShowPhoneVerify(false)
        history.push('/profile')
    }

    return (
        <Row>

            <VerifyPhoneForm
                number={authy_phone}
                show={showPhoneVerify}
                handleClose={() => {handlePhoneFormClose()}}
            />
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
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
                        <Form.Label className="mr-3" >Email Address
                        </Form.Label>
                        {verifyEmail ?
                            <i style={{ padding: '0em 2em 0em 2em', fontSize: '1.5em', color: "limegreen" }} className={'far fa-check-square'}> </i>
                            :
                            <Button className="" style={{ padding: '.005em 2em .001em 2em', fontSize: '.9em' }} variant="outline-danger">Verify</Button>

                        }
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId='authy_phone'>
                        <Form.Label className="mr-3" >Phone Number
                        </Form.Label>
                        {verifyPhone ?
                            <i style={{ padding: '0em 2em 0em 2em', fontSize: '1.5em', color: "limegreen" }} className={'far fa-check-square'}> </i>
                            :
                            <Button className="" style={{ padding: '.005em 2em .001em 2em', fontSize: '.9em' }} variant="outline-danger" onClick={handleShow}>Verify</Button>

                        }
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Phone Number'
                            value={authy_phone}
                            onChange={(e) => setAuthyPhone(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>


                    {/* 
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

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group> */}

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
