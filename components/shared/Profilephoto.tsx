import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profilephoto = ({src}:{src:string}) => {
    return (
        <div>
            <Avatar>
                <AvatarImage src={src} width={80} height={80} />
                
            </Avatar>

        </div>
    )
}

export default Profilephoto
