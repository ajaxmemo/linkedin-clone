import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Images } from "lucide-react"
import React, { useRef , useState} from "react"
import Profilephoto from "./shared/Profilephoto"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { createPostAction } from "@/lib/serverAction"
import { toast } from "sonner"
// import React, { use, useState } from 'react'


export function PostDialogue({ setOpen, open, user }: { setOpen: any, open: boolean, user: any }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setselectedFile] = useState<string>("");
  const  [textInuput, setTextInuput] = useState<string>("");
  const textChangeHandler = (e:any)=>{
    setTextInuput(e.target.value);
  }
  const fileChangeHandler = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(file){
      const imageUrl = await readFileAsDataUrl(file);
      setselectedFile(imageUrl);

    }

  }
  const postActionHandler = async (formData: FormData) =>{
    const inputText = formData.get('inputText') as string;
    try {
        await createPostAction(inputText, selectedFile);
        
        setTextInuput("");
        setOpen(false);

    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
  
      <DialogContent onInteractOutside={() => setOpen(false)}  className="sm:max-w-[425px]">
        
        <DialogHeader>
          <DialogTitle className="flex gap-3 items-center">
            <Profilephoto src={user?.imageUrl}/>
            <div>
              <h3 className="text-sm ">{user?.firstName} {user?.lastName}</h3>
              <p className="text-xs font-light">Post to anyone</p>
            </div>
          </DialogTitle>

        </DialogHeader>
        <form action={(formData) => {
                    const promise = postActionHandler(formData);
                    toast.promise(promise, {
                        loading:'Creating post...',
                        success:'Post created',
                        error:'Failed to create post'
                    })
                }}>
          <div className="flex flex-col">
            <div>
              <Textarea
                id="name"
                name="inputText"
                placeholder="Type your text here"
                onChange={textChangeHandler}
                value={textInuput}
                className="border-none focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div className="my-4">
              {
                selectedFile && (
                  <Image
                    src={selectedFile}
                    height={400}
                    width={400}
                    alt="Preview Image"
                  />
                )
              }
            </div>
              <input type="file" ref={inputRef} onChange={fileChangeHandler} name="image" className="hidden"/>

          </div>
       
        <DialogFooter>
          <Button type="button" onClick={()=> inputRef?.current?.click()}  variant={'ghost'}>
            <Images  />
          </Button>
          <Button type="submit">Post</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
