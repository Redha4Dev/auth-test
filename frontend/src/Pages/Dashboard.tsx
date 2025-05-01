import React, { use, useEffect, useState } from "react";
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
import { getKids } from "@/Services/api";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUser } from "@/Services/authService";

function Dashboard() {

  const [username, setUsername] = useState("");
  const [id, setId] = useState(""); 
  const [kids, setKids] = useState({})
  
  const [kidsNumber, setKidsNumber] = useState(0);
  const [UsersNumber, setUsersNumber] = useState(0);
  const ListKids = async () => {
    try {
      const response = await getKids(username, id);
      console.log("Kids API response:", response);
  
      // Make sure response and response.data exist
        setKids(response.data);
        setKidsNumber(response.size);

    } catch (error) {
      console.error("Error fetching kids:", error);
    }
  };
  const {user} = useAuth();
  
  const handleGetUser = async () => {
    try {
      const reponse = await getCurrentUser();
      console.log(reponse);
      setUsername(reponse.username);
      setId(reponse.id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetUser();
  }, []);
  
   useEffect(() => {
      if (id) { // Only call when ID is available
        ListKids();
      }
    }, [id]);
  const genral_data = [
    {
      title: "Total Users",
      value: 100,
      icon: <User />,
      color: "green",
    },
    {
      title: "Total Kids",
      value: kidsNumber,
      icon: <ToyBrick />,
      color: "blue",
    },
    {
      title: "daily Messages",
      value: 20,
      icon: <Mail />,
      color: "red",
    },
  ];
  const colorMap:any = {
    green: "bg-green-300",
    blue: "bg-blue-300",
    red: "bg-red-300",
  };
  const PiechartData = [
    { browser: "Intact", visitors: 275, fill: "var(--color-chrome)" },
    {
      browser: "Attention-Deficit",
      visitors: 200,
      fill: "var(--color-safari)",
    },
    {
      browser: "Eating Disorders",
      visitors: 287,
      fill: "var(--color-firefox)",
    },
    { browser: "ASD", visitors: 173, fill: "var(--color-edge)" },
    { browser: "Depression", visitors: 190, fill: "var(--color-other)" },
  ];
  const chartData = [
    { grade: "1st", boys: 6, girls: 6 },
    { grade: "2nd", boys: 7, girls: 7 },
    { grade: "3rd", boys: 8, girls: 8 },
    { grade: "4th", boys: 9, girls: 9 },
    { grade: "5th", boys: 10, girls: 10 },
    { grade: "6th", boys: 11, girls: 11 },
  ]
  
  const chartConfig = {
    boys: {
      label: "Boys",
      color: "hsl(var(--chart-1))",
    },
    girls: {
      label: "Girls",
      color: "hsl(var(--chart-2))",
    },
  }

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
            <div className="grid auto-rows-min gap-4 grid-cols-1 xl:grid-cols-4">
              <div className="xl:col-span-3 bg-muted/50 p-3 gap-3  h-fit grid md:grid-cols-3 rounded-xl">
                {genral_data.map((data, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-5 shadow-md flex-col justify-center p-4 rounded-xl bg-white`}
                  >
                    <div
                      className={clsx(
                        "flex p-4 rounded-full items-center shadow-sm justify-center",
                        colorMap[data.color] || "bg-gray-300"
                      )}
                    >
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
  bars={[
    { dataKey: "boys" },
    { dataKey: "girls" },
  ]}
  title="Average Age of Kids"
  description="Per Grade Level"
  footerTrendText="Age trend is consistent"
  footerNote="Ages for boys and girls from 1st to 6th grade"
/>
                  </div>
                  <div className="md:col-span-2 col-span-5">
                    <Piechart chartData={PiechartData} title={"Kids Status"} />
                  </div>
                  <div></div>
                  <div className="col-span-5 p-4 shadow-lg rounded-xl bg-white w-full">
                    <Table>
                      <TableCaption>A list of your recent Users.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Username</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">
                            Regestration date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>Parent</TableCell>
                          <TableCell>Accepted</TableCell>
                          <TableCell className="text-right">
                            01-03-2025
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>Teacher</TableCell>
                          <TableCell>Accepted</TableCell>
                          <TableCell className="text-right">
                            25-02-2025
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="flex xl:flex-col  gap-3 justify-center xl:justify-normal xl:items-center rounded-xl  p-4  h-fit ">
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
                        <TableCell className="font-medium">vacation</TableCell>
                        <TableCell>All</TableCell>
                        <TableCell className="text-right">01-03-2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">vacation</TableCell>
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
