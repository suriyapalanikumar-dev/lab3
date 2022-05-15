import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user: null
    },
    reducers:{
        register:(state, action) =>{
            state.user = action.payload
        },
        login:(state, action) =>{
            state.user = action.payload
        },
        logout:(state) =>{
            state.user =null
        },
        dollarSelect:(state, action)=>{
            state.user = action.payload
        },
        dollarInitial:(state, action)=>{
            state.user = action.payload
        },
        itemSelect:(state,action)=>{
            state.user = action.payload
        },
        shopSelect:(state,action)=>{
            state.user=action.payload
        },
        shopImg:(state,action)=>{
            state.user = action.payload
        },
        shopDisplay:(state,action)=>{
            state.user = action.payload
        },
        itemConsidered:(state,action)=>{
            state.user = action.payload
        },
        searchCriteria:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const {register, login, logout, dollarSelect, itemSelect, dollarInitial, shopSelect, shopImg, shopDisplay, itemConsidered, searchCriteria} = userSlice.actions
export const authenticateUser = (state) => state.user.user
export default userSlice.reducer;
