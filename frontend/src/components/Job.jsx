import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {  Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate();
    const jobId = 'hjsdfikfwk';
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'> Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost"> 12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">12 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate('/description/${jobId}')} variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job