import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmEmail} from '../actions/userActions'

function ConfirmEmailScreen({match, location,history}) {

    const id = match.params.email
    const code = location.search ? String(location.search.split('=')[1]) : null
    const dispatch = useDispatch()

    const userPasswordReset = useSelector(state => state.userEmailConfirm)
    const { EmailConfirmSuccess, loadingConfirmEmail } = userPasswordReset

    
    useEffect(() => {
        if (id && code) {
            dispatch(confirmEmail(id, code))
        }
        if (EmailConfirmSuccess){
            history.push('/profile')
        }
    }, [dispatch, history, id, code, EmailConfirmSuccess])


    return (
        <div>
            Confirm Email
            <p>id: {id}</p>
            <p>Code: {code}</p>
        </div>
    )
}

export default ConfirmEmailScreen
