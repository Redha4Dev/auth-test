import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function Mail() {
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
            <div className='flex flex-col flex-1 m-4 p-4 bg-[#EFEFEF] rounded-xl '>

            </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Mail;