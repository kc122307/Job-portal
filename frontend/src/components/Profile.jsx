import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'

const skills = ["Html", "Css", "Javascript", "Reactjs"]

const Profile = () => {
    const isResume = false;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src='https://th.bing.com/th/id/OIP.KBuZjyxYAuvYzhryALHh_AHaGw?w=208&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='Profile' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Fullname</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elite</p>
                        </div>
                    </div>
                    <Button className="text-right" ><Pen /></Button>
                </div>

                <div>

                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>example@gmail.com</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>1234567890</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    {
                        skills.length !== 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                    }
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href="" className='text-blue-500 w-full hover:underline cursor-pointer'></a> : <span>NA</span>
                    }
                </div>

                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Applied Job Table   */}
                    <AppliedJobTable/>
                </div>
            </div>
        </div>
    )
}

export default Profile