import SuggestedUser from "@/components/SuggestedUser";
import { createSlice } from "@reduxjs/toolkit";
import { setSelectedPost } from "./postSlice";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,
    },
    reducers:{
        setAuthUser:(state, action)=>{
            state.user = action.payload;
        },
        setSuggestedUsers:(state, action)=>{
            state.suggestedUsers = action.payload; 
        },
        setUserProfile:(state, action)=>{
            state.userProfile = action.payload;
        },
        setSelectedUser:(state, action)=>{
            state.selectedUser = action.payload;
        },
            toggleFollow: (state, action) => {
      const targetUserId = action.payload;
      if (!state.user) return;

      const isFollowing = state.user.following.includes(targetUserId);

      if (isFollowing) {
        // Unfollow
        state.user.following = state.user.following.filter(
          (id) => id !== targetUserId
        );
      } else {
        // Follow
        state.user.following.push(targetUserId);
      }
    },
    }
});
export const {setAuthUser, setSuggestedUsers, setUserProfile, setSelectedUser, toggleFollow} = authSlice.actions;
export default authSlice.reducer;