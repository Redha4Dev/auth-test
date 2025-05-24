import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import FullCalendar from '@fullcalendar/react'
import { List, Sidebar } from 'lucide-react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import React, { useEffect, useState } from 'react'
import Pancake from "../assets/pancake.svg";
import Omelet from "../assets/omelet.svg";
import Wrap from "../assets/wrap.svg";
import Muffins from "../assets/muffins.svg";

import Rice from "../assets/rice.svg";
import Smoothie from "../assets/smoothie.svg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox'
import { addMeal } from '@/Services/api'
import { getCurrentUser } from '@/Services/authService'
import { set } from 'date-fns'

function Meals() {
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [username , setUsername] = useState('');

  const handleCardClick = (mealName: string) => {
    setSelectedMeal(mealName);
    setOpen(true);
  };


  const handleSubmit = async () => {
    console.log({
      title: selectedMeal,
      startTime,
      endTime,
      daysOfWeek: selectedDays
    });
    try {
      const response = await addMeal({
      title: selectedMeal,
      startTime,
      endTime,
      daysOfWeek: selectedDays,
      school : username
    });
    } catch (error) {
      console.error("Error adding meal:", error);
    }
    setOpen(false);
    // Optional: clear inputs or push to calendar
  };

  const [selectedDays, setSelectedDays] = useState<number[]>([]);

const toggleDay = (dayNumber: number) => {
  setSelectedDays(prev =>
    prev.includes(dayNumber)
      ? prev.filter(day => day !== dayNumber)
      : [...prev, dayNumber]
  );
  console.log(selectedDays);
};

const daysOfWeekMap = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
];
  const handleGetUser = async () => {
    try {
      const response = await getCurrentUser();
      setUsername(response.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    handleGetUser();
  }, []);


    
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
      title: 'Omelet',
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
  <div className='h-fit my-4 text-center p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    <Card onClick={() => handleCardClick("Pancake")} className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-2xl">Pancake</CardTitle>
        <CardDescription>Breakfast</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-between'>
        <img src={Pancake} alt="" />
      </CardContent>  
    </Card>
    <Card onClick={() => handleCardClick("Omelet")} className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Omelet</CardTitle>
    <CardDescription>Breakfast</CardDescription>
  </CardHeader>
  <CardContent className='flex justify-between'>
    <img src={Omelet} alt="Omelet" />
  </CardContent>
</Card>

<Card onClick={() => handleCardClick("Chicken Wrap")} className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Chicken Wrap</CardTitle>
    <CardDescription>Lunch</CardDescription>
  </CardHeader>
  <CardContent className='flex justify-between'>
    <img src={Wrap} alt="Chicken Wrap" />
  </CardContent>
</Card>

<Card onClick={() => handleCardClick("Mini Muffins")} className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Mini Muffins</CardTitle>
    <CardDescription>Breakfast Snack</CardDescription>
  </CardHeader>
  <CardContent className='flex justify-between'>
    <img src={Muffins} alt="Mini Muffins" />
  </CardContent>
</Card>


<Card onClick={() => handleCardClick("Rice")} className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Rice</CardTitle>
    <CardDescription>Lunch</CardDescription>
  </CardHeader>
  <CardContent className='flex justify-between'>
    <img src={Rice} alt="Veggie Rice" />
  </CardContent>
</Card>

<Card onClick={() => handleCardClick("smoothie")} className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Smoothie</CardTitle>
    <CardDescription>Snack</CardDescription>
  </CardHeader>
  <CardContent className='flex justify-between'>
    <img src={Smoothie} alt="Smoothie" />
  </CardContent>
</Card>

  </div>

                </div>

  <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Add Meal Event</DialogTitle>
      <DialogDescription>
        Add a schedule for <strong>{selectedMeal}</strong>
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="startTime" className="text-right">Start Time</Label>
        <Input id="startTime" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="endTime" className="text-right">End Time</Label>
        <Input id="endTime" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid gap-2">
  <Label>Select Days of Week</Label>
  <div className="flex flex-wrap gap-2">
    {daysOfWeekMap.map(day => (
      <div key={day.value} className="flex items-center space-x-2">
        <Checkbox
          id={`day-${day.value}`}
          checked={selectedDays.includes(day.value)}
          onCheckedChange={() => toggleDay(day.value)}
        />
        <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
      </div>
    ))}
  </div>
</div>

    </div>
    <DialogFooter>
      <Button onClick={handleSubmit}>Add to Calendar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

            </SidebarInset>
        </SidebarProvider>
  )
}

export default Meals