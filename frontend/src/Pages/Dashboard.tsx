import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FormProvider } from "./Steps/FormContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Calendar } from "@/components/ui/calendar";
import { User, ToyBrick, Mail } from "lucide-react";
import { MultipleBar } from "@/components/ui/MultiBar";
import { Piechart } from "@/components/ui/PieChar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllMessages, getKids } from "@/Services/api";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUser } from "@/Services/authService";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(""); 
  const [kids, setKids] = useState({});
  const [kidsNumber, setKidsNumber] = useState(0);
  const [UsersNumber, setUsersNumber] = useState(0); // Update with actual value if available
  const [messages, setMessages] = useState([]);
  const [dailyMessages, setDailyMessages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalParents, setTotalParents] = useState(0);

  const { user } = useAuth();

  const ListKids = async () => {
    try {
      const response = await getKids(username, id);
      setKids(response.data);
      setKidsNumber(40);
    } catch (error) {
      console.error("Error fetching kids:", error);
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await getCurrentUser();
      setUsername(response.name);
      setId(response._id);
      setKidsNumber(response.kids.length || 0);
      setTotalParents(response.parents.length || 0);
      setTotalTeachers(response.teachers.length || 0);
      setTotalUsers(response.kids.length + response.parents.length + response.teachers.length || 0);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleGetAllMessages = async () => {
    try {
      const response = await getAllMessages(username);
      setMessages(response.messages.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (id) {
      ListKids();
    }
  }, [id]);

  useEffect(() => {
    if (username) {
      handleGetAllMessages();
    }
  }, [username]);

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);
    console.log(today);
    const count = messages.filter(msg => msg.sentAt?.startsWith(today)).length;
    console.log(count);
    setDailyMessages(count);
    console.log(messages);
  }, [messages]);

  const generalData = [
    { title: "Total Users", value: totalUsers, icon: <User />, color: "green" },
    { title: "Total Kids", value: kidsNumber, icon: <ToyBrick />, color: "blue" },
    { title: "Daily Messages", value: dailyMessages, icon: <Mail />, color: "red" },
  ];

  const colorMap = {
    green: "bg-green-300",
    blue: "bg-blue-300",
    red: "bg-red-300",
  };

  const PiechartData = [
    { browser: "Teachers", visitors: totalTeachers, fill: "var(--color-yellow)" },
    { browser: "Parents", visitors: totalParents, fill: "var(--color-green)" },
    { browser: "Kids", visitors: kidsNumber, fill: "var(--color-blue)" },
  ];

  const chartData = [
    { grade: "3", boys: 7, girls: 8 },
    { grade: "4", boys: 7, girls: 7 },
    { grade: "5", boys: 8, girls: 8 },
  ];

  const chartConfig = {
    boys: { label: "Boys", color: "hsl(var(--chart-1))" },
    girls: { label: "Girls", color: "hsl(var(--chart-2))" },
  };

  return (
    <FormProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col my-3 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 grid-cols-1 xl:grid-cols-4">
              <div className="xl:col-span-3 bg-muted/50 p-3 gap-3 h-fit grid md:grid-cols-3 rounded-xl">
                {generalData.map((data, index) => (
                  <div key={index} className="flex items-center gap-5 shadow-md flex-col justify-center p-4 rounded-xl bg-white">
                    <div className={clsx("flex p-4 rounded-full items-center shadow-sm justify-center", colorMap[data.color])}>
                      {data.icon}
                    </div>
                    <div className="flex gap-3 flex-col items-center justify-center">
                      <div className="text-sm font-semibold">{data.title}</div>
                      <div className="text-2xl font-bold">{data.value}</div>
                    </div>
                  </div>
                ))}

                <div className="col-span-3 grid gap-3 grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 col-span-5">
                    <MultipleBar
                      chartData={chartData}
                      chartConfig={chartConfig}
                      xAxisKey="grade"
                      bars={[{ dataKey: "boys" }, { dataKey: "girls" }]}
                      title="Average Age of Kids"
                      description="Per age group"
                      footerTrendText="Age trend is consistent"
                      footerNote="Ages for boys and girls from 3 to 6 years old"
                    />
                  </div>

                  <div className="md:col-span-2 col-span-5">
                    <Piechart chartData={PiechartData} title="School Users" />
                  </div>

                  <div className="col-span-5 p-4 shadow-lg rounded-xl bg-white w-full">
                    <Table>
                      <TableCaption>A list of your recent Users.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Username</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Registration date</TableHead>
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
                          <TableCell className="font-medium">INV002</TableCell>
                          <TableCell>Teacher</TableCell>
                          <TableCell>Accepted</TableCell>
                          <TableCell className="text-right">25-02-2025</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="flex xl:flex-col gap-3 justify-center xl:justify-normal xl:items-center rounded-xl p-4 h-fit">
                <div className="shadow-lg rounded-xl bg-white">
                  <Calendar />
                </div>
                <div className="shadow-lg p-4 bg-white rounded-xl">
                  <h1 className="font-semibold mb-6">Events Table</h1>
                  <Table>
                    <TableCaption>A list of your recent Events.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Event</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Vacation</TableCell>
                        <TableCell>All</TableCell>
                        <TableCell className="text-right">01-03-2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Vacation</TableCell>
                        <TableCell>A-1</TableCell>
                        <TableCell className="text-right">25-02-2025</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </FormProvider>
  );
}

export default Dashboard;
