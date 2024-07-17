import Image from 'next/image'
import React from 'react'
import Profilephoto from './shared/Profilephoto'
import { IPostDocument } from '@/models/post.model'

const SideBar = ({ user , posts  }: { user: any , posts: IPostDocument[]}) => {
  return (
    <div className="hidden md:block w-[20%] border border-gray-50 rounded bg-white h-fit">
      <div className='flex flex-col w-full h-fit relative items-center'>
        <div className="w-full h-16 overflow-hidden">
          {
            user && (
              <Image
                src={"/banner.jpeg"}
                alt="Linkedin Logo"
                className='w-full h-full rounded-t'
                width={200}
                height={200}
              />
            )
          }
        </div>
        <div className="absolute top-8">
          <Profilephoto src={user?.imageUrl} />
        </div>
        <div className='py-3 w-full'>
          <h2 className='text-sm font-medium pb-1 text-center'>{user ? user?.firstName : "User"}  {user ? user?.lastName : ""}</h2>
          <h3 className='text-sm font-light text-center'>@{user ? user?.username : "User"}</h3>
          <hr className='my-2 w-[80%] text-center mx-auto' />
        </div>

      </div>
      <div className='px-3 py-1 hover:bg-slate-200 cursor-pointer'>
        <div className="flex justify-between  ">
          <h3 className='text-sm '>Post Impressions</h3>
          <h3 className='text-sm text-blue-500'>80</h3>
        </div>
      </div>
      <div className='px-3 py-1 hover:bg-slate-200 cursor-pointer'>
        <div className="flex justify-between">
          <h3 className='text-sm '>Posts</h3>
          <h3 className='text-sm text-blue-500'>{posts.length}</h3>
        </div>
      </div>
    </div>
  )
}

export default SideBar
