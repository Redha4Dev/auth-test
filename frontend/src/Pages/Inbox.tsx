import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import Header from '@/components/ui/Header'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { getAllMessages, SendMessage } from '@/Services/api'
import { getCurrentUser } from '@/Services/authService'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Inbox() {

    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [recever, setRecever] = useState("");
    const [message, setMessage] = useState("");

    const handleGetUser = async () => {
        try {
          const reponse = await getCurrentUser();
          console.log(reponse);
          setUsername(reponse.id);
          console.log(username)
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        handleGetUser();
      }, []);
    const handleGetAllMessages = async () => {
            try {
                const response = await getAllMessages(username);
                console.log("✅ getAllMessages response:", response);
                setMessages(response.messages.reverse());
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
            handleGetAllMessages();
        }, [username])
    const handleSendMessage = async () => {
        try {
            const response = await SendMessage(username, recever, message);
        } catch (error) {
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
            <header>
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className='text-2xl font-bold'>Inbox</h1>
            </div>
            </header>
            <div className='flex flex-col flex-1 m-4 p-4 bg-[#EFEFEF] rounded-xl '>
                <div className='w-full ml-auto  items-end'>
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                            Send Mail <Plus/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Mail</DialogTitle>
                                <DialogDescription>
                                    Enter the ID to send the mail
                                </DialogDescription>
                            </DialogHeader>
                            <Input placeholder='Enter the ID' onChange={(e) => setRecever(e.target.value)}/>
                            <Textarea value={message}
                            onChange={(e) => setMessage(e.target.value)} placeholder='Enter the message'  />
                            <Button onClick={handleSendMessage}>Send Mail</Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <Table>
                    <TableHeader>
                    <TableRow>
                          <TableHead className="w-[100px]">From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead className="w-full">Subject</TableHead>
                          <TableHead className="text-right">
                            Date
                          </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message) => (
                            <TableRow className='cursor-pointer bg-white' onClick={() => navigate(`/Inbox/${message._id}`)} key={message._id}>
                                <TableCell>{message.sender.name}</TableCell>
                                <TableCell>{message.receiver.name}</TableCell>
                                <TableCell className='text-gray-500 truncate'>{message.message}</TableCell>
                                <TableCell className="text-right">{message.sentAt.substring(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </div>
        </SidebarInset>
    </SidebarProvider>

  )
}

export default Inbox