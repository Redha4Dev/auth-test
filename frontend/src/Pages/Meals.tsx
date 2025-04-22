import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import FullCalendar from '@fullcalendar/react'
import { List, Sidebar } from 'lucide-react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import React, { useEffect, useState } from 'react'

function Meals() {
    
      return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger  className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-2xl font-bold">Meals</h1>
                  </div>
                </header>
                <div className='p-4 mx-auto w-[95%] h-full   bg-[#F8F8F8] rounded-lg shadow-md'>
                <FullCalendar
  plugins={[listPlugin, dayGridPlugin]}
  initialView="listWeek"
  height="100%"
  dateClick={(info) => alert(`Clicked on: ${info.dateStr}`)}
  events={[
    {
      title: 'Breakfast',
      daysOfWeek: [0, 1, 2, 3, 4], // Sunday to Thursday
      startTime: '08:00:00',
      endTime: '09:00:00',
      startRecur: '2024-01-01',
    },
    {
      title: 'Soup',
      daysOfWeek: [1], // Monday
      startTime: '10:00:00',
      endTime: '11:00:00',
      startRecur: '2024-01-01',
    },
    {
      title: 'Salad',
      daysOfWeek: [3], // Wednesday
      startTime: '14:00:00',
      endTime: '15:30:00',
      startRecur: '2024-01-01',
    },
  ]}
/>

                </div>
            </SidebarInset>
        </SidebarProvider>
  )
}

export default Meals