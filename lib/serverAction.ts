"use server"

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"
import { error } from "console";
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from "./db";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";

export const createPostAction = async (inputText:string, selectedFile:string) =>{
    await connectDB();
    const user = await currentUser();
    if(!user) throw new Error("User Not Authenticated");
    if(!inputText) throw new Error("Input field required");
    const image = selectedFile;
    const userData: IUser = {
        firstName: user.firstName || "User",
        lastName: user.lastName || "Name",
        userId: user.id,
        profilePhoto: user.imageUrl
    }
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET // Click 'View Credentials' below to copy your API secret
    });
    try {
        if(image){
            const imageUrl = await cloudinary.uploader.upload(image);
            await Post.create({
                description: inputText,
                user:userData,
                imageUrl:imageUrl?.secure_url,
            })
            revalidatePath("/");
        }else{
            await Post.create({
                description: inputText,
                user:userData,
               
            })
            revalidatePath("/");
        }
    } catch (error:any) {
        throw new Error(error)
    }

}
export const getPosts = async () =>{
    await connectDB();
    try {
       const posts = await Post.find().sort({ createdAt: -1 }).populate({ path: 'comments', options: { sort: { createdAt: -1 } } });
        console.log(posts);
        return JSON.parse(JSON.stringify(posts));
        
    } catch (error:any) {
        console.log(error);
        
    }
}
export const deletePost = async ( postId:any) =>{
    await connectDB();
    try {
        console.log(postId);
        
        const result = await Post.findByIdAndDelete(postId);
        revalidatePath("/");

    } catch (error) {
       console.log(error);
       
    }
}
export const likeServerEvent = async (postId:string) =>{
    await connectDB();
    try {
        const user = await currentUser();
        const post = await Post.findById({_id:postId});
        await post?.updateOne({$addToSet:{likes: user?.id}});
       
        return { title: "Liked successfully" };
        
    } catch (error) {
        console.log(error);
        
    }
}
export const dislikeServerEvent = async (postId:string) =>{
    await connectDB();
    try {
        const user = await currentUser();
        const post = await Post.findById({_id:postId});
        await post?.updateOne({$pull:{likes: user?.id}});
       
        console.log("disliked");
        
        return { title: "Disliked successfully" };
        
    } catch (error) {
        console.log(error);
        
    }
}
export const getLikes = async (postId:string) =>{
    await connectDB();
    try {
       
        const post = await Post.findById({_id:postId});
       
        return post?.likes;
        
    } catch (error) {
        console.log(error);
        
    }
}
export const commentPosts = async (inputText:string,postId:string) =>{
    await connectDB();
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const userDatabase: IUser = {
            firstName: user.firstName || "user",
            lastName: user.lastName || "lastname",
            userId: user.id,
            profilePhoto: user.imageUrl
        }
        const comment =  await Comment.create({
            textMessage: inputText,
            user: userDatabase,
        });
        
        const post = await Post.findById({_id: postId });
         if (!post) throw new Error('Post not found');
        //  console.log(comment);
         
         post.comments?.push(comment._id);
      
        await post?.save();


        revalidatePath("/");
    } catch (error) {
        console.log(error);
        
    }
}
export const get = async (postId:string) =>{
    try {
        await connectDB();
        const post = Post.findById({_id:postId});
        

        const comments = await post.populate({
            path:'comments',
            options:{sort:{createdAt:-1}},
        });

        return comments;

    } catch (error) {
        console.log(error);
        
    }
}