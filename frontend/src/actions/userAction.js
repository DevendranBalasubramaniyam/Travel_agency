import {
    CLEAR_ERRORS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    NEW_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstant";
import axios from "axios";
import { CLEAR_CART } from "../constants/cartConstant";

// Utility function for headers
const getConfig = (isFormData = false) => ({
    headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
});

// Login action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await axios.post(`/api/v1/users/login`, { email, password }, getConfig());
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data.user,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login Failed";
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMessage,
        });
    }
};

// Register action
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const { data } = await axios.post(`/api/v1/users/signup`, userData, getConfig(true)); // Assuming userData may include files
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.data.user,
        });
        return data.data.user; // Return for further use if needed
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration Failed";
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: errorMessage,
        });
    }
};

// Load user action
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`/api/v1/users/me`);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to load user";
        dispatch({
            type: LOAD_USER_FAIL,
            payload: errorMessage,
        });
    }
};

// Update user profile action
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const { data } = await axios.put("/api/v1/users/me/update", userData, getConfig(true));
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Profile update failed";
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: errorMessage,
        });
    }
};

// Logout action
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/users/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: CLEAR_CART }); // Clear cart on logout
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Logout failed";
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMessage,
        });
    }
};

// Clear errors action
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Update password action
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const { data } = await axios.put("/api/v1/users/passwords/update", passwords, getConfig());
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Password update failed";
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: errorMessage,
        });
    }
};

// Forgot password action
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const { data } = await axios.post("/api/v1/users/forgetPassword", { email }, getConfig());
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Forgot password request failed";
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: errorMessage,
        });
    }
};

// Reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST });
        const { data } = await axios.patch(`/api/v1/users/resetPassword/${token}`, passwords, getConfig());
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Password reset failed";
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: errorMessage,
        });
    }
};
