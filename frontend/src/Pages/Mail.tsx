import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getAllMessages, getMessage, removeMessage } from '@/Services/api'
import { set } from 'date-fns'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Mail() {
    const {id} = useParams();
    const [sender, setSender] = useState('User');
    const [message, setMessage] = useState('');
    const [ID, setID] = useState('');
    const navigate = useNavigate();

    const handleGetMessage = async () => {
        try {
            const response = await getMessage(id);
            console.log("✅ getMessage response:", response);
            setSender(response.name)
            setMessage(response.message)
            setID("<"+response.senderId+">")

        }
        catch (error) {
            console.error(
                "Error fetching messages:",
                error.response?.data?.message || error.message
            );
            throw error;
        }
    }
    
    useEffect(() => {
        handleGetMessage();
    },[])

    const handleRemove = async () => {
        try {
            const response = await removeMessage(id);
            console.log("✅ removeMessage response:", response);
            navigate('/inbox')
        }
        catch (error) {
            console.error(
                "Error fetching messages:",
                error.response?.data?.message || error.message
            );
            throw error;
        }
    }

  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />

                </div>
            </header>
            <div className='flex flex-col flex-1 m-4 p-6 bg-[#EFEFEF] rounded-xl '>
                <div className='flex flex-row items-center gap-3 w-full'>
                    <h1 className='text-xl font-semibold'>
                        {sender}
                        
                    </h1>
                    <p className='text-gray-400 text-xs font-normal'>
                            {ID}
                    </p>
                    <Button onClick={handleRemove} variant={'destructive'}  className='text-xs text-red-100 ml-auto font-normal'>
                        delete
                        <Trash/>
                        </Button>
                </div>
                <div className='my-4 w-full min-h-24 p-4 rounded-xl mx-2 bg-white'>
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Mail;