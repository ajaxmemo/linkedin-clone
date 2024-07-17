import React, { useState } from 'react'
import Profilephoto from './shared/Profilephoto'
import { Bookmark, Heart, MessageSquareText, Share, Share2, ThumbsUp, X } from 'lucide-react'
import { IPostDocument } from '@/models/post.model'
import Image from 'next/image'
import TimeAgo from 'react-timeago'
import { currentUser } from '@clerk/nextjs/server'
import { deletePost, dislikeServerEvent,  getLikes, likeServerEvent } from '@/lib/serverAction'
import { useUser } from '@clerk/nextjs'
import Commentinput from './shared/Commentinput'
import CommentBox from './shared/CommentBox'

const Posts =  ({ user, post }: { user: any, post: IPostDocument }) => {
  const [likes, setLikes] = useState<any>(post.likes?.length);
  const [likeStatus, setLikeStatus] = useState(post.likes);
  const [liked, setLiked] = useState<boolean>(false);
  const [commentbar, setCommentbar] = useState(false);

  const likePost = async (postId: string) => {
    try {
      setLiked(!liked);
      let likes = await getLikes(postId);
      likes?.includes(user?.id)? await dislikeServerEvent(postId) : await likeServerEvent(postId);
      likes = await getLikes(postId);
      setLikes(likes?.length);
      setLikeStatus(likes);
      
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className='mx-6 my-2 bg-white border border-gray-100 rounded-sm p-3 '>
      <div className="flex justify-between w-full">
        <div className='flex gap-2 w-full'>
          <Profilephoto src={post?.user.profilePhoto!} />
          <div className='w-full'>
            <h2 className='text-sm font-medium'>{post?.user.firstName} {post?.user.lastName}</h2>
            <h3 className='text-xs font-light'>{post?.user.bio!}</h3>
            <h3 className='text-xs font-light'><TimeAgo date={new Date(post.createdAt)} /></h3>
            <div className='py-2'>
              <p>{post?.description}</p>
              {
                post?.imageUrl && (
                  <Image
                    src={post?.imageUrl!}
                    alt='post'
                    width={500}
                    height={500}
                    className='w-full mx-auto my-3'

                  />
                )
              }

            </div>
            <div className="flex justify-between">
              {
                likes != 0 && (
                  <div className='flex text-sm gap-2'>
                    <Heart className='fill-red-600 text-red-600 text-xs w-3' /> <span>{likes} Likes</span>
                  </div>
                )
                
              }
              {
                post.comments?.length != 0 &&(
                  <div className='flex text-sm gap-2 cursor-pointer hover:underline' onClick={()=> setCommentbar(!commentbar)}>
                     <span>{post.comments?.length} Comments</span>
                  </div>
                )
              }

            </div>
            <hr className='my-3' />
            <div className='flex justify-between'>
              <div onClick={() => likePost(post?._id)} className='flex align-middle items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-sm'>{!likeStatus?.includes(user?.id)?<ThumbsUp /> : <ThumbsUp className='fill-blue-600' />} <span>Like</span></div>
              <div onClick={()=> setCommentbar(!commentbar)} className='flex align-middle items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-sm'><MessageSquareText /> <span>Comment</span></div>
              <div className='flex align-middle items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-sm'><Share2 /> <span>Share</span></div>
              <div className='flex align-middle items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-sm'><Bookmark /> <span>Save</span></div>

            </div>
            {
              commentbar &&(
                <div>
                <Commentinput user={user} postId={post?._id} />
                {
                 
                  post?.comments?.map((comment: any)=>{
                    return (
                      <CommentBox key={comment._id} comment={comment}/>
                    )
                })
                }
                
              </div>
              )
            }
           
          </div>

        </div>
        <div>
          <button>

            {user?.id == post?.user.userId &&
              (
                <X onClick={() => deletePost(post?._id)} className=' hover:rounded-full hover:bg-gray-100' />
              )}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Posts
