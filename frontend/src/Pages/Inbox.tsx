import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import Header from '@/components/ui/Header'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import React from 'react'

function Inbox() {
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
                            <Input placeholder='Enter the ID' />
                            <Textarea placeholder='Enter the message' />
                            <Button>Send Mail</Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <Table>
                    <TableHeader>
                    <TableRow>
                          <TableHead className="w-[100px]">Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">
                            Date
                          </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className='cursor-pointer bg-white'>
                            <TableCell>User234</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell className="text-right">Today</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </SidebarInset>
    </SidebarProvider>

  )
}

export default Inbox