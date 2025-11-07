import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-gradient-to-b from-background to-muted/30 rounded-xl'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Chase the Dream & <br /> Land the Job <span className='bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent'>Dream Jobs</span></h1>
                <p className='text-muted-foreground'>Thousands of verified jobs from top companies — just for you.</p>
                <div className='flex w-[40%] shadow border border-border pl-3 rounded-full items-center gap-4 mx-auto bg-card text-foreground'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent placeholder:text-muted-foreground'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-primary hover:bg-primary/90">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection