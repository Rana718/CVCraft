"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function EditResume() {
    const params = useParams();

    useEffect(()=>{
        console.log(params.id)
    })

  return (
    <div>
      hekllo edit resume
    </div>
  )
}

export default EditResume
