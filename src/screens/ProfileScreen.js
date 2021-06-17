import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from '../components'
import { getUserDetails, updateUserProfile, verifyUserEmail, passwordResetEmail } from '../actions/userActions'
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
    const [messageVariant, setMessageVariant] = useState('')
    const [alert, setAlert] = useState('false')


    const dispatch = useDispatch()

    const userPasswordResetEmail = useSelector(state => state.userPasswordResetEmail)
    const { resetEmailSentSuccess, loadingSendPassResetEmail } = userPasswordResetEmail

    const userVerifyEmail = useSelector(state => state.userVerifyEmail)
    const { verifcationSuccess, loadingEmailVerification } = userVerifyEmail


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, updateError } = userUpdateProfile

    const [showPhoneVerify, setShowPhoneVerify] = useState(false);

    const handleShow = () => {
        setShowPhoneVerify(true)
    }



    useEffect(() => {

        const timer = setTimeout(() => {
            setAlert(false);
        }, 3500);



        // To clear or cancel a timer, you call the clearTimeout(); method, 
        // passing in the timer object that you created into clearTimeout().


        if (!userInfo) {
            history.push('/login')
        }
        else {

            if (!user || !user.name || success || userInfo._id !== user._id) {
                setAlert(true);
                clearTimeout(timer)
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                setMessageVariant('success')
                setMessage('Get Updated Profile Success')

            }
            if (resetEmailSentSuccess) {
                // history.push('/profile')

            }
            if (verifcationSuccess) {
                clearTimeout(timer)
            }

            if (updateError) {
                setName(user.name)
                setEmail(user.email)
                setAuthyPhone(user.authy_phone)
                setVerifyEmail(user.email_verified)
                setVerifyPhone(user.phone_verified)
            }
            if (error) {
                dispatch(logout())

            }
            else {
                setName(user.name)
                setEmail(user.email)
                setAuthyPhone(user.authy_phone)
                setVerifyEmail(user.email_verified)
                setVerifyPhone(user.phone_verified)
            }
            // clearTimeout(timer)

        }
        // return () => ;

    }, [dispatch, history, userInfo, user, success, updateError, resetEmailSentSuccess, verifcationSuccess])




    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessageVariant('danger')

            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'authy_phone': authy_phone,
            }))
            setAlert(true);
            setMessageVariant('info')
            setMessage('Attempting Profile Update')
        }
    }

    const handlePhoneFormClose = () => {
        setShowPhoneVerify(false)
        history.push('/profile')
    }


    const handlePasswordReset = () => {
        console.log("Sending code")
        dispatch(passwordResetEmail(user.email))
        setAlert(true);
        setMessageVariant('info')
        setMessage('Sending Password Reset')
    }

    const handleEmailVerify = () => {
        console.log("Sending Email")
        dispatch(verifyUserEmail(user.email))
        setAlert(true);
        setMessageVariant('info')
        setMessage('Sending Email Verification')
    }
    
    


    return (
        <Row>

            <VerifyPhoneForm
                number={authy_phone}
                show={showPhoneVerify}
                handleClose={() => { handlePhoneFormClose() }}
            />
            <Col md={3}>
                <h2>User Profile</h2>
                {alert && message && <Message variant={messageVariant}>{message}</Message>}

                {alert && updateError && <Message variant='danger'>{updateError}</Message>}

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
                            <Button className="" style={{ padding: '.005em 2em .001em 2em', fontSize: '.9em' }} variant="outline-danger" onClick={handleEmailVerify}>Verify</Button>

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

                    <Row>
                        <Col>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Col>

                        {user.email_verified &&
                        <Col>
                        <Button className="" style={{ padding: '.001em .2em .001em .5em', fontSize: '.9em' }} variant="outline-danger" onClick={handlePasswordReset} >Reset Password</Button>

                        </Col>
                        }
                    </Row>

                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
