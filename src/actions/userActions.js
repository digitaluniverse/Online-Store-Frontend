import axios from 'axios'
import api from "api";

import {
    REACT_APP_AUTH_CLIENT_ID,
    REACT_APP_AUTH_CLIENT_SECRET,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_REFRESH_REQUEST,
    USER_REFRESH_SUCCESS,
    USER_REFRESH_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_VERIFY_PHONE_REQUEST,
    USER_VERIFY_PHONE_SUCCESS,
    USER_VERIFY_PHONE_FAIL,

    USER_VERIFY_EMAIL_REQUEST,
    USER_VERIFY_EMAIL_SUCCESS,
    USER_VERIFY_EMAIL_FAIL,

    USER_CONFIRM_EMAIL_REQUEST,
    USER_CONFIRM_EMAIL_SUCCESS,
    USER_CONFIRM_EMAIL_FAIL,

    USER_PASSWORD_RESET_REQUEST,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAIL,

    USER_PASSWORD_RESET_EMAIL_REQUEST,
    USER_PASSWORD_RESET_EMAIL_SUCCESS,
    USER_PASSWORD_RESET_EMAIL_FAIL,

    USER_REGISTER_PHONE_REQUEST,
    USER_REGISTER_PHONE_SUCCESS,
    USER_REGISTER_PHONE_FAIL,

} from '../constants/userConstants'




const config = {
    headers: {
        "Content-Type": "application/json"
    }
};




export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const { data } = await api().post(
            '/api/users/login/',
            {
                'username': email,
                'password': password,
                'grant_type': 'password',
                'client_id': REACT_APP_AUTH_CLIENT_ID,
                'client_secret': REACT_APP_AUTH_CLIENT_SECRET,
            },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        console.log("data", data)

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.response.data.error_description,
        })
    }
}

export const authyLogin = (authy_phone, token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const { data } = await api().post(
            '/api/users/authy/login/',
            {
                'authy_phone': `+${authy_phone}`,
                'token': token,
            },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        console.log("data", data)

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const confirmEmail = (id, code) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CONFIRM_EMAIL_REQUEST
        })
        const { data } = await api().post(
            '/api/users/email/confirm/',
            {
                'id': id,
                'code': code,
            },
            config
        )
        dispatch({
            type: USER_CONFIRM_EMAIL_SUCCESS,
            payload: data
        })
        console.log("data", data)


    } catch (error) {
        dispatch({
            type: USER_CONFIRM_EMAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const verifyUserEmail = (email) => async (dispatch,getState) => {
    try {
        
        dispatch({
            type: USER_VERIFY_EMAIL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const token = userInfo ? userInfo.access_token : null;

        // const authConfig = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //     },
        // };

        const { data } = await api().put(
            '/api/users/email/verify/',
            {
                'email': email
            },
            config
        )
        dispatch({
            type: USER_VERIFY_EMAIL_SUCCESS,
            payload: data
        })
        console.log("data", data)


    } catch (error) {
        dispatch({
            type: USER_VERIFY_EMAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const passwordResetEmail = (email) => async (dispatch,getState) => {
    try {
        
        dispatch({
            type: USER_PASSWORD_RESET_EMAIL_REQUEST
        })


        const { data } = await api().put(
            '/api/users/password-reset/send-email/',
            {
                'email': email
            },
            config
        )
        dispatch({
            type: USER_PASSWORD_RESET_EMAIL_SUCCESS,
            payload: data
        })
        console.log("data", data)

    } catch (error) {
        dispatch({
            type: USER_PASSWORD_RESET_EMAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const passwordReset = (id, code) => async (dispatch) => {
    try {
        dispatch({
            type: USER_PASSWORD_RESET_REQUEST
        })
        const { data } = await api().post(
            '/api/users/password-reset/confirm/',
            {
                'id': id,
                'code': code,
            },
            config
        )
        dispatch({
            type: USER_PASSWORD_RESET_SUCCESS,
            payload: data
        })
        console.log("data", data)


    } catch (error) {
        dispatch({
            type: USER_PASSWORD_RESET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const refresh = () => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState()

    const refresh_token = userInfo ? userInfo.refresh_token : null;
    if(!refresh_token) {

        dispatch(logout())
    }
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const { data } = await api().post(
            '/api/users/login/',
            {
                'grant_type': 'refresh_token',
                'client_id': REACT_APP_AUTH_CLIENT_ID,
                'client_secret': REACT_APP_AUTH_CLIENT_SECRET,
                'refresh_token': refresh_token
            },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        console.log("data", data)
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log("ERROR HERE")
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        dispatch(logout())
    }
}



export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })

}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const { data } = await api().post(
            '/api/users/register/',
            {
                'name': name,
                'email': email,
                'password': password,
                'grant_type': 'password',
                'client_id': REACT_APP_AUTH_CLIENT_ID,
                'client_secret': REACT_APP_AUTH_CLIENT_SECRET,
            },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const token = userInfo ? userInfo.access_token : null;

        const authConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        

        const { data } = await api().get(
            `/api/users/${id}/`,
            authConfig
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        // if (error.response.status === 403) {
        //     try {
        //     dispatch(refresh())
        //     console.log("Should try to refresh")

        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // }


        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const token = userInfo ? userInfo.access_token : null;

        const authConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await api().put(
            `/api/users/profile/update/`,
            user,
            authConfig
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const verifyUserPhone = (authy_phone) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_VERIFY_PHONE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const token = userInfo ? userInfo.access_token : null;

        const authConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        

        const { data } = await api().post(
            `/api/users/authy/verify-phone/`,
            {
                'authy_phone': authy_phone
            },
            authConfig
        )

        dispatch({
            type: USER_VERIFY_PHONE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_VERIFY_PHONE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const registerUserPhone = (authy_phone, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REGISTER_PHONE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const access_token = userInfo ? userInfo.access_token : null;

        const authConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        };


        const { data } = await api().post(
            `/api/users/authy/register-phone/`,
            {
                'authy_phone': authy_phone,
                'token': token
            },
            authConfig
        )

        dispatch({
            type: USER_REGISTER_PHONE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_PHONE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}