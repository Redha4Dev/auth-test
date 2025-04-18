import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import FullCalendar from '@fullcalendar/react'
import { Sidebar } from 'lucide-react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useEffect, useState } from 'react'

function Scheduling() {
  const [events , setEvents] = useState([
    { title: 'Meeting', date: '2025-04-21' },
    { title: 'Workshop', date: '2025-04-22' },
  ]);

  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger  className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-2xl font-bold">Scheduling</h1>
              </div>
            </header>
            <div className='p-4 mx-auto h-fit w-[95%]  bg-[#F8F8F8] rounded-lg shadow-md'>
              <FullCalendar plugins={[dayGridPlugin]} 
              initialView="dayGridMonth"
              dateClick={(info) => alert(`Clicked on: ${info.dateStr}`)}
              events={[
                { title: 'Meeting', date: '2025-04-21' },
                { title: 'Workshop', date: '2025-04-22' },
              ]}
              />
            </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Scheduling