import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery, isLoading } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <FilterCard />
                </div>
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                    {isLoading ? (
                        <div className='h-full flex items-center justify-center'>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A38C2]"></div>
                        </div>
                    ) : filterJobs.length <= 0 ? (
                        <div className='h-full flex items-center justify-center'>
                            <span className='text-gray-500 text-lg'>Job not found</span>
                        </div>
                    ) : (
                        <div className='grid grid-cols-3 gap-4'>
                            {
                                filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        key={job?._id}>
                                        <Job job={job} />
                                    </motion.div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs