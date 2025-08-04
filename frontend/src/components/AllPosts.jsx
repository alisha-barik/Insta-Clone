import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const AllPosts = () => {
  const {posts} = useSelector(store=>store.post);
  console.log(posts)
  return (
    <div>
        {
            posts.map((post)=><Post post={post} key={post._id}/>)
        }
    </div>
  )
}

export default AllPosts