import React from 'react'
import Profilephoto from './Profilephoto'
import { useUser } from '@clerk/nextjs'
import { ICommentDocument } from '@/models/comment.model'

const CommentBox = ({ comment }: { comment: ICommentDocument }) => {
   
  return (
    <div className='px-2 flex gap-2 py-2 my-3'>
      <Profilephoto src={comment?.user?.profilePhoto!}/>
        <div className='bg-gray-100 w-full p-3 rounded-tr-lg rounded-bl-lg'>
            <h3 className='text-sm font-semibold text-black'>{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</h3>
            <p className='mt-2 text-sm'>{comment.textMessage}</p>
        </div>
    </div>
  )
}

export default CommentBox
