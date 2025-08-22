import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SuggestedUser from './SuggestedUser'

const RightSidebar = () => {
  const {user} = useSelector(store=>store.auth)
  return (
    <div className='w-fit my-10 pr-32'>
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?._id}`}>
                  <Avatar>
            <AvatarImage
              src={user?.profilePic}
              alt="post_image"
              className="h-8 w-8"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
    <div>
      <h1 className='font-semibold text-sm'>{user?.username}</h1>
      <span className='text-gray-600 text-sm'>{user?.bio || "Bio here..."} </span>
    </div></div>
    <SuggestedUser/>
      </div>
  )
}

export default RightSidebar