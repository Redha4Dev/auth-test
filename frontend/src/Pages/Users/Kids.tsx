import React, { useEffect, useState } from "react";
import { getKids, addKid, getKid, ListKids, deleteKid } from "@/Services/api";
import { jwtDecode } from "jwt-decode";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoreVertical,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/Services/authService";

const childrenData = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Child ${i + 1}`,
  age: Math.floor(Math.random() * 4) + 3, // Random age between 3-6
  class: `Class ${String.fromCharCode(65 + (i % 3))}`, // Class A, B, C
  status: ["Active", "Inactive", "Pending"][i % 3], // Cycle statuses
}));

function Kids() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [childs, setChilds] = useState([]);
  const [kids, setKids] = useState({
    name: "",
    code: "",
    parent: "",
    id: "",
    school: "ESI",
    teacher: "aaaa",
    age: 3,
    gender: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const handleGetUser = async () => {
      try {
        const reponse = await getCurrentUser();
        console.log(reponse);
        setUsername(reponse.name);
        setId(reponse._id);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
      handleGetUser();
      setKids(prev => ({
        ...prev,
        parent: username,
        id: id,
      }));
  }, []);

  useEffect(() => {
    if (id) { // Only call when ID is available
      HandleListKids();
    }
  }, [id]);
  
  const filteredChildren = childs.filter(
    (child) =>
      child.name?.toLowerCase().includes(search.toLowerCase()) ||
      child.class?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredChildren.length / pageSize);
  const displayedChildren = filteredChildren.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  

  const HandleListKids = async () => {
    try {
      const newkids = await getKids(username, id);
      console.log(newkids.kids);
      setChilds(newkids.kids);
      console.log(newkids.kids);
    } catch (error) {
      console.error("Error fetching kids:", error);
    }
  };
  const AddKid = async () => {
    try {
      await addKid(kids);
    } catch (error) {
      console.log("Error adding kid", error);
    }
  };
  const handleRemoveKid = async (kid) => {
    try {
      await deleteKid(kid);
    } catch (error) {
      console.log("Error deleting kid", error);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="p-4 bg-white mx-4 rounded-lg shadow">
          {/* Header with Search */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Children List</h2>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Add Kid <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add new kid</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new kid.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex space-x-2">
                    <div className="grid w-full grid-cols-1 md:gird-cols-2 gap-2">
                      <Input
                        placeholder="Name"
                         onChange={(e) => {
                           setKids({ ...kids, name: e.target.value });
                         }}
                      />
                      <Input
                        placeholder="Code"
                         onChange={(e) => {
                           setKids({ ...kids, code: e.target.value });
                         }}
                      />
                    </div>
                    <div className="grid w-full grid-cols-1 md:gird-cols-2 gap-2">
                      <Select
                         onValueChange={(v) => {
                           setKids({ ...kids, gender: v });
                         }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Boy">Boy</SelectItem>
                          <SelectItem value="Girl">Girl</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Birth Date" type="date" />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={AddKid}>
                      Add Kid
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Input
                placeholder="Search children..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedChildren.length > 0 ? (
                displayedChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>{child.id}</TableCell>
                    <TableCell>{child.name}</TableCell>
                    <TableCell>{child.age}</TableCell>
                    <TableCell>{child.class}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          child.status === "Active"
                            ? "success"
                            : child.status === "Inactive"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {child.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            
                          >
                            <Link className="w-full" to={`/Users/Kids/${child.id}/${child.name}`}>View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Editing ${child.name}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemoveKid(child)}
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No children found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-end gap-4 items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft />
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Kids;
