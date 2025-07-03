import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import React from 'react'

const CommentDialog = ({open, setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={()=> setOpen(false)}>
            <img src='https://images.pexels.com/photos/800005/pexels-photo-800005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            alt='post_text' />
        </DialogContent>
    </Dialog>
  )
}

export default CommentDialog