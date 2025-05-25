import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";

import { addMeal, getMeals, removeMeal, removeMessage } from "@/Services/api";
import { getCurrentUser } from "@/Services/authService";

import Pancake from "../assets/pancake.svg";
import Omelet from "../assets/omelet.svg";
import Wrap from "../assets/wrap.svg";
import Muffins from "../assets/muffins.svg";
import Rice from "../assets/rice.svg";
import Smoothie from "../assets/smoothie.svg";

const daysOfWeekMap = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
];

const mealsData = [
  { title: "Pancake", desc: "Breakfast", img: Pancake },
  { title: "Omelet", desc: "Breakfast", img: Omelet },
  { title: "Chicken Wrap", desc: "Lunch", img: Wrap },
  { title: "Mini Muffins", desc: "Snack", img: Muffins },
  { title: "Rice", desc: "Lunch", img: Rice },
  { title: "Smoothie", desc: "Snack", img: Smoothie },
];

function Meals() {
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [username, setUsername] = useState("");
  const [meals, setMeals] = useState([]);

  const handleCardClick = (mealName: string) => {
    setSelectedMeal(mealName);
    setOpen(true);
  };

  const toggleDay = (dayNumber: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const handleSubmit = async () => {
    try {
      const mealData = {
        title: selectedMeal,
        startTime,
        endTime,
        daysOfWeek: selectedDays,
        school: username,
      };

      await addMeal(mealData);
      await handleGetMeals();
      setOpen(false);
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const handleGetUser = async () => {
    try {
      const user = await getCurrentUser();
      setUsername(user.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleGetMeals = async () => {
    try {
      const response = await getMeals(username);
      setMeals(response.meal);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (username) {
      handleGetMeals();
    }
  }, [username]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex items-center gap-2 px-4 h-16 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4 mx-2" />
          <h1 className="text-2xl font-bold">Meals</h1>
        </header>

        <main className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
          {/* Calendar */}
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Scheduled Meals</CardTitle>
              <CardDescription>View upcoming meals by week.</CardDescription>
            </CardHeader>
            <CardContent>
              <FullCalendar
                plugins={[listPlugin, dayGridPlugin]}
                initialView="listWeek"
                height="auto"
                events={meals}
              />
            </CardContent>
          </Card>

          {/* Meal Cards */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mealsData.map((meal) => (
              <Card
                key={meal.title}
                onClick={() => handleCardClick(meal.title)}
                className="cursor-pointer hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{meal.title}</CardTitle>
                  <CardDescription>{meal.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <img src={meal.img} alt={meal.title} className="w-20 h-20" />
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Meal Delete Section */}
          <section className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Delete a Meal</h2>
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal._id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{meal.title}</p>
                    <p className="text-sm text-muted-foreground">ID: {meal._id}</p>
                  </div>
                  <Button variant="destructive" onClick={() => handleDeleteMeal(meal._id)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Add Meal Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Add Meal Event</DialogTitle>
              <DialogDescription>
                Schedule your <strong>{selectedMeal}</strong> meal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  End
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div>
                <Label>Select Days</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {daysOfWeekMap.map((day) => (
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
  );
}

export default Meals;

async function handleDeleteMeal(mealId: string) {
  try {
    await removeMeal(mealId);
    console.log(`Deleted meal with ID: ${mealId}`);
    // refetch meals
  } catch (error) {
    console.error("Error deleting meal:", error);
  }
}
