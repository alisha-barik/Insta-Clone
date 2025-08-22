
import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//it will get all the post for an individual feeds.. like all the users postds
const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers= async () => {
            try{
                const res = await axios.get('http://localhost:8000/api/v1/user/suggestedusers', {withCredentials:true})
                if(res.data.success){
                    console.log("sucess brother")
                    dispatch(setSuggestedUsers(res.data.users))
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchSuggestedUsers();
    }, []);
};
export default useGetSuggestedUsers;