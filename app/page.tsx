import Feed from "@/components/Feed";
import News from "@/components/News";
import SideBar from "@/components/Sidebar";
import { getPosts } from "@/lib/serverAction";

import { User, currentUser } from "@clerk/nextjs/server";
import { log } from "console";

export default async function Home() {
  const user = await currentUser();
  const postData = await getPosts();
  console.log(user);
  const userData = JSON.parse(JSON.stringify(user)); 
  return (
   <div className="pt-3 ">
    <div className="max-w-6xl mx-auto flex justify-between">
      {/* left sidebar  */}
      <SideBar user = {user} posts= {postData}/>
      {/* feed */}
      <Feed user = {userData} posts= {postData}/>
      {/* news */}
      <News/>
    </div>
   </div>
  );
}
