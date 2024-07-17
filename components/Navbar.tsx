import React from 'react'
import Image from 'next/image'
import logo from '../public/linkedin-logo.png'
import Searchbar from './Searchbar'
import NavItems from './NavItems'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <div className='shadow-sm pt-1 pb-3'>
      <div className="flex mx-auto max-w-6xl justify-between items-center">
        <div className='flex justify-center items-center gap-3'>
          <div className="logo">
            <Image
              src={logo}
              alt="Linkedin Logo"
              width={50}
              height={50}
            />
          </div>
          <div className="search md:block hidden">
            <Searchbar />
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <div className="flex md:block hidden">
            <NavItems />
          </div>
          <div>
            <SignedOut>
              <Button variant="secondary">

                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
