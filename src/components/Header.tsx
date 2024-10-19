import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className='py-3 px-5 flex justify-between shadow-md'>
            <img src='/logo.svg' width={100} height={100}/>

            {isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Link href={'/dashboard'}>
                        <Button variant="outline">Dashboar</Button>
                    </Link>
                    <UserButton/>
                </div>
            ):(
                <Link href={'/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            )}
        </div>
    )
}

export default Header
