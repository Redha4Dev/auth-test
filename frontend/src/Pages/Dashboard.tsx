import React from 'react'
import clsx from 'clsx'
import { FormProvider } from './Steps/FormContext'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@radix-ui/react-separator'
import { Calendar } from '@/components/ui/calendar'
import { User, ToyBrick, Mail } from 'lucide-react'
import { MultipleBar } from '@/components/ui/MultiBar'
import { Piechart } from '@/components/ui/PieChar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function Dashboard() {
  const genral_data = [
    {
      title: 'Total Users',
      value: 100,
      icon: <User />,
      color: 'green'
    },
    {
      title: 'Total Kids',
      value: 170,
      icon: <ToyBrick />,
      color: 'blue'
    },
    {
      title: 'daily Messages',
      value: 20,
      icon: <Mail/>,
      color: 'red'
    }
  ]
  const colorMap = {
    green: "bg-green-300",
    blue: "bg-blue-300",
    red: "bg-red-300",
  };
  return (
    <FormProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col my-3 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-4">
            <div className='md:col-span-3 bg-muted/50 p-3 gap-3  h-fit grid md:grid-cols-3 rounded-xl'>
            {genral_data.map((data, index) => (
              <div key={index} className={`flex items-center gap-5 shadow-md flex-col justify-center p-4 rounded-xl bg-white`}>
                <div className={clsx("flex p-4 rounded-full items-center shadow-sm justify-center", colorMap[data.color] || "bg-gray-300")}>
                  {data.icon}
                </div>
                <div className="flex gap-3 flex-col items-center justify-center">
                <div className="text-sm font-semibold">{data.title}</div>
                  <div className="text-2xl font-bold">{data.value}</div>
                </div>
                
              </div>
            ))}
            <div className='col-span-3 grid gap-3 grid-cols-1 md:grid-cols-5'>
                <div className='md:col-span-3'>
                  <MultipleBar/>
                </div>
                <div className='md:col-span-2'>
                  <Piechart/>
                </div>
            <div>
              
              </div>
              <div className='col-span-5 p-4 shadow-lg rounded-xl bg-white w-full'>
              <Table>
                <TableCaption>A list of your recent Users.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Regestration date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Parent</TableCell>
                    <TableCell>Accepted</TableCell>
                    <TableCell className="text-right">01-03-2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Accepted</TableCell>
                    <TableCell className="text-right">25-02-2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              </div>
            </div>
            </div>
            <div className='flex justify-center w-full '>
            <Calendar className=""/>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
        </SidebarProvider>
    </FormProvider>
  )
}

export default Dashboard