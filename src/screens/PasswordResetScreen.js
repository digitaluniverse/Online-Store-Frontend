import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'actions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Loader, Message, FormContainer } from '../components'

function PasswordResetScreen({ match, location, history }) {

    let search = new URLSearchParams(location.search);
    const id = location.search ? String(search.get('token')) : null
    const code = location.search ? String(search.get('code')) : null
    // const [email, setEmail] = useState(location.search ? String(search.get('email')) : null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageVariant, setMessageVariant] = useState('')
    const [ip, setIp] = useState('')

    const dispatch = useDispatch()
    const [resetConfirmation, setResetConfirmation] = useState(false)

    const userPasswordResetAuth = useSelector(state => state.userPasswordResetAuth)
    const { resetEmailConfirmSuccess, loadingConfirmPassResetEmail , token} = userPasswordResetAuth

    const userPasswordReset = useSelector(state => state.userPasswordReset)
    const { loadingPasswordReset, resetPasswordSuccess , userInfo} = userPasswordReset

    fetch("https://api.ipify.org?format=json")
    .then(response => {
      return response.json();
     }, "jsonp")
    .then(res => {
      console.log(res)
      setIp(res.ip)
    })
    .catch(err => console.log(err))
    
    useEffect(() => {


        if (resetPasswordSuccess){
            history.push('/profile')

        }
        if (id && code && !loadingConfirmPassResetEmail && !resetEmailConfirmSuccess) {
            dispatch(userActions.passwordResetAuth(id, code))
        }
        if (resetEmailConfirmSuccess) {
            setResetConfirmation(true)
            setMessage('password reset email confirmed... Enter a new Password')
            setMessageVariant('success')


        }
        if ((!loadingConfirmPassResetEmail) && (!resetEmailConfirmSuccess && !resetConfirmation)){
            // history.push('/profile')
            setMessage('go back to profile')
            setMessageVariant('danger')
        }

    }, [dispatch, history, id, code, resetEmailConfirmSuccess, token, resetPasswordSuccess])



    const submitPasswordResetHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(userActions.passwordReset(password,token))
            console.log("Updating Password Password")

            setMessage('')
        }

    }

    return (
        <div>
            {!resetConfirmation &&
            <div>
            <h1>YOU REALLY SHOULDN'T BE HERE</h1>
            {/* <h1>THIS IS YOU –––> {ip}</h1> */}
            { message && <Message variant={'danger'}>{"YOU ARE NOT AUTHORIZED TO BE HERE!!!! We are Tracking Your IP:  "+ip+" WE ILL FIND YOU AND WE WILL KILL YOU, BEST SECURE SHOP TEAM" }</Message>}

            </div>
            }

            {resetConfirmation &&
                <div>
                { message && <Message variant={messageVariant}>{message}</Message>}

                <h1>Reset Password</h1>

                 <p>Temp ID: {id}</p>

                    <FormContainer>
                        <Form onSubmit={submitPasswordResetHandler}>

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
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Reset Password
                            </Button>

                        </Form>

                    </FormContainer>

                </div>

            }
        </div>
    )
}

export default PasswordResetScreen
