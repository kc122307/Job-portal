import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import store from '@/redux/store';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const {allJobs, isLoading} = useSelector(store=>store.job)
  
  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent'>Latest & Top </span> Job Openings</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }
  
  return (
      <div className='max-w-7xl mx-auto my-20'>
          <h1 className='text-4xl font-bold'><span className='bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent'>Latest & Top </span> Job Openings</h1>
          <div className='grid grid-cols-3 gap-4 my-5 min-h-[300px]'>
              {
                  allJobs.length <= 0 ? (
                    <div className="col-span-3 text-center py-8">
                      <span className="text-muted-foreground text-lg">No Job Available</span>
                    </div>
                  ) : (
                    allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                  )
              }
          </div>
      </div>
  )
}

export default LatestJobs