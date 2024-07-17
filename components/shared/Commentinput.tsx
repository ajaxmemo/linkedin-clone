import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import Profilephoto from './Profilephoto'
import { useUser } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { log } from 'console'
import { Anybody } from 'next/font/google'
import { commentPosts } from '@/lib/serverAction'

const Commentinput =  ({user,postId}:{user:any,postId:string}) => {
 
  const  [textInuput, setTextInuput] = useState<string>("");
  const textChangeHandler = (e:any)=>{
    setTextInuput(e.target.value);
  }
   const commentPost = async (formData: FormData)=>{
    const inputText = formData.get('inputText') as string;
    console.log(inputText);
    try {
        await commentPosts(inputText,postId);
        setTextInuput("");
    } catch (error) {
        console.log(error);
        
    }
   
    
   }
  return (
    <div className='flex gap-2 w-full py-2'>
         <Profilephoto src={user?.imageUrl}/>
        <form action={commentPost} className='w-full'>
        <Input
        name="inputText"
        placeholder='Add a comment'
        className='rounded-full '
        onChange={textChangeHandler}
        value={textInuput}
        />
        </form>
    </div>
  )
}

export default Commentinput
