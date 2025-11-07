import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-xl border bg-card text-foreground shadow transition hover:shadow-lg hover:border-primary/50 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-muted-foreground'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-muted-foreground'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='bg-secondary/60 text-secondary-foreground font-medium' variant="secondary">{job?.position} Positions</Badge>
                <Badge className='border-primary text-primary font-medium' variant="outline">{job?.jobType}</Badge>
                <Badge className='border-fuchsia-500 text-fuchsia-400 font-medium' variant="outline">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards