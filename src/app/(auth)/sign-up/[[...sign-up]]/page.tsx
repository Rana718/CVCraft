"use client"
import { SignUp } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='flex justify-center my-20 items-center'>
      <SignUp/>
    </div>
  )
}

export default SignInPage