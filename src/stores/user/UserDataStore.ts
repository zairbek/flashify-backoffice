import {createSlice} from "@reduxjs/toolkit";

type InitialStateType = {
    token: string | null;
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    sex: string | null;
    status: string;
}

const initialState: InitialStateType = {
    token: null,
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    sex: null,
    status: null,
}


const UserDataStore = createSlice({
    name: 'userData',
    initialState,
    reducers: {

    }
})