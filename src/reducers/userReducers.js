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


export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


// export const userRefreshReducer = (state = {}, action) => {
//     switch(action.type){
//         case USER_REFRESH_REQUEST:
//             return {loading:true}

//         case USER_REFRESH_SUCCESS:
//             return {loading: false, userInfo: action.payload}
//         case USER_REFRESH_FAIL:
//             return {loading: false, error: action.payload}
//         case USER_LOGOUT:
//             return {}
//         default:
//             return state
//     }
// }


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }


        default:
            return state
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, updateError: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const userVerifyPhoneReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_VERIFY_PHONE_REQUEST:
            return { loadingPhoneVerification: true }

        case USER_VERIFY_PHONE_SUCCESS:
            return { loadingPhoneVerification: false, verifcationSuccess: true, userInfo: action.payload }

        case USER_VERIFY_PHONE_FAIL:
            return { loadingPhoneVerification: false, error: action.payload }

        default:
            return state
    }
}



export const userVerifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_VERIFY_EMAIL_REQUEST:
            return { loadingEmailVerification: true }

        case USER_VERIFY_EMAIL_SUCCESS:
            return { loadingEmailVerification: false, verifcationSuccess: true, userInfo: action.payload }

        case USER_VERIFY_EMAIL_FAIL:
            return { loadingEmailVerification: false, error: action.payload }

        default:
            return state
    }
}

export const userPasswordResetEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PASSWORD_RESET_EMAIL_REQUEST:
            return { loadingSendPassResetEmail: true }

        case USER_PASSWORD_RESET_EMAIL_SUCCESS:
            return { loadingSendPassResetEmail: false, resetEmailSentSuccess: true, userInfo: action.payload }

        case USER_PASSWORD_RESET_EMAIL_FAIL:
            return { loadingSendPassResetEmail: false, error: action.payload }

        default:
            return state
    }
}

export const userPasswordResetConfirmReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PASSWORD_RESET_REQUEST:
            return { loadingConfirmPassResetEmail: true }

        case USER_PASSWORD_RESET_SUCCESS:
            return { loadingConfirmPassResetEmail: false, resetEmailConfirmSuccess: true, userInfo: action.payload }

        case USER_PASSWORD_RESET_FAIL:
            return { loadingConfirmPassResetEmail: false, error: action.payload }

        default:
            return state
    }
}



export const userEmailConfirmReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONFIRM_EMAIL_REQUEST:
            return { loadingConfirmEmail: true }

        case USER_CONFIRM_EMAIL_SUCCESS:
            return { loadingConfirmEmail: false, EmailConfirmSuccess: true, userInfo: action.payload }

        case USER_CONFIRM_EMAIL_FAIL:
            return { loadingConfirmEmail: false, error: action.payload }

        default:
            return state
    }
}


export const userRegisterPhoneReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_PHONE_REQUEST:
            return { loadingPhoneRegistration: true }

        case USER_REGISTER_PHONE_SUCCESS:
            return { loadingPhoneRegistration: false, registrationSuccess: true, userInfo: action.payload }

        case USER_REGISTER_PHONE_FAIL:
            return { loadingPhoneRegistration: false, error: action.payload }

        default:
            return state
    }
}