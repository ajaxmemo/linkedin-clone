'use client';
import React, { use, useState } from 'react'
import Profilephoto from './shared/Profilephoto'
import { PostDialogue } from './PostDialogue'
import { Client } from '@clerk/nextjs/server'
import Posts from './Posts';
import { getPosts } from '@/lib/serverAction';
import { IPost, IPostDocument } from '@/models/post.model';

const Feed =  ({ user, posts }: { user: any , posts: IPostDocument[] }) => {
  const [open , setOpen] = useState<boolean>(false);
  const inputClickHandler =  ()=>{
    setOpen(true)
  }
  
  // const postData = JSON.parse(JSON.stringify(getPosts()));
  // console.log(JSON.parse(JSON.stringify(postData)));
  
  return (
    <div className='w-[60%] mx-auto'>
    <div className='flex flex-1  items-center bg-white border border-gray-50 rounded mx-6 h-fit p-3'>
      <div>
      <Profilephoto src={user?.imageUrl} />
      
      </div>
      <div className='w-full ml-3'>
        <input 
        type="text"
        placeholder='Start a post...'
        className='w-[100%] border-2 border-gray-200 rounded-full cursor-pointer px-2 py-2 hover:bg-slate-100 text-sm'
        onClick={inputClickHandler}
        />
      </div>
      <div>
        <PostDialogue  open = {open} setOpen= {setOpen} user={user}  />
      </div>
    </div>
    {
      posts?.map(( post)=>{
       return(
          <Posts key={post?.id} post={post} user= {user}  />
       ) 
      })
    }
     
    </div>
  )
}

export default Feed
