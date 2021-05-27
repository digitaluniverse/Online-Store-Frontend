import axios from 'axios'
import api from "api";

import {
    REACT_APP_AUTH_CLIENT_ID,
    REACT_APP_AUTH_CLIENT_SECRET,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
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

    USER_REGISTER_PHONE_REQUEST,
    USER_REGISTER_PHONE_SUCCESS,
    USER_REGISTER_PHONE_FAIL,

} from '../constants/userConstants'

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const token = userInfo ? userInfo.access_token : null;

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const authConfig = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
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
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })

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


        const { data } = await api().get(
            `/api/users/${id}/`,
            authConfig
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
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