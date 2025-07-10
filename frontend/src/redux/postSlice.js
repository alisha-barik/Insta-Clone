import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name : "post",
    initialState : {
        posts : [],
    },
    reducers : {
        setPost:(state, action) => {
            state.posts = action.payload
        }
    }
});
export const {setPosts} = postSlice.actions;
export default postSlice.reducer;