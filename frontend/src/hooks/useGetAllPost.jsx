import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//it will get all the post for an individual feeds.. like all the users postds
const useGetAllPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try{
                const res = await axios.get('http://localhost:8000/api/v1/post/all', {withCredentials:true})
                if(res.data.success){
                    console.log("sucess brother")
                    dispatch(setPosts(res.data.posts))
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;