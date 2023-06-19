import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { UserType } from "../types/UserType";

export interface UserState{
    userData: UserType;
}

const initialState: UserState = {
    userData:{
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
    }
};

export const userSlice = createSlice({
    name:"userState",
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<UserType>) =>{
            state.userData = action.payload;
        },
        setUnLoggedUser: (state) => {
            state.userData = {...initialState.userData, id:undefined};
            toast.warning('Logged out');
        }
    }
});

export const {setLoggedUser} = userSlice.actions;
export const {setUnLoggedUser} = userSlice.actions;

export default userSlice.reducer;