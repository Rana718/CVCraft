import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';

function Header() {
    const { isSignedIn } = useUser();

    return (
        <div className='py-3 px-5 flex justify-between shadow-md'>
            <Image src='/logo.svg'
                alt='Resume Icon'
                width={80}
                height={80} />

            {isSignedIn ? (
                <div className='flex gap-2 items-center'>
                    <Link href={'/dashboard'}>
                        <Button variant="outline">Dashboar</Button>
                    </Link>
                    <UserButton />
                </div>
            ) : (
                <Link href={'/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            )}
        </div>
    )
}

export default Header
