import React, { useEffect, useState, useMemo } from "react";
import { getKids, addKid, deleteKid } from "@/Services/api";
import { getCurrentUser } from "@/Services/authService";
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
import { set } from "date-fns";

function Kids() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [childs, setChilds] = useState([]);
  const [kids, setKids] = useState({
    name: "",
    parent: "",
    id: "",
    school: "",
    teacher: "",
    age: 3,
    gender: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUsername(response.name);
        setUserId(response._id);
        setKids((prev) => ({
          ...prev,
          school: response.name,
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      handleListKids();
    }
  }, [userId]);

  const handleListKids = async () => {
    try {
      const res = await getKids(username, userId);
      setChilds(res.kids);
    } catch (error) {
      console.error("Error fetching kids:", error);
    }
  };

  const handleAddKid = async () => {
    if (!kids.name || !kids.gender) {
      alert("Please fill in all required fields.");
      return;
    }
    setKids((prev) => ({ ...prev, school: username }));
    try {
      await addKid(kids);
      await handleListKids(); // refresh list
    } catch (error) {
      console.error("Error adding kid:", error);
    }
  };

  const handleRemoveKid = async (kid) => {
    try {
      await deleteKid(kid);
      setChilds((prev) => prev.filter((c) => c.id !== kid.id));
    } catch (error) {
      console.error("Error deleting kid:", error);
    }
  };

  const filteredChildren = useMemo(() => {
    return childs.filter(
      (child) =>
        child.name?.toLowerCase().includes(search.toLowerCase()) ||
        child.class?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, childs]);

  const totalPages = Math.ceil(filteredChildren.length / pageSize);
  const displayedChildren = filteredChildren.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="p-4 bg-white mx-4 rounded-lg shadow">
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
                        placeholder="Parent Name"
                         onChange={(e) => {
                           setKids({ ...kids, parent: e.target.value });
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
                      <Input placeholder="Age" type="number" onChange={(e) => {
                           setKids({ ...kids, age: e.target.value });
                         }} />
                    </div>
                    <div className="grid w-full grid-cols-1 md:gird-cols-2 gap-2">
                        <Input placeholder="Teacher name" onChange={(e) => {
                           setKids({ ...kids, teacher: e.target.value });
                        }} />
                        <Input placeholder="Class" type="number" onChange={(e) => {
                           setKids({ ...kids, classRoom: e.target.value });
                        }} />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleAddKid}>
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedChildren.length > 0 ? (
                displayedChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>{child.id}</TableCell>
                    <TableCell>{child.name}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              className="w-full"
                              to={`/Users/Kids/${child.id}/${child.name}`}
                            >
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              className="w-full"
                              to={`/Users/Kids/${child.id}/${child.name}?edit=1`}
                            >
                              Edit
                            </Link>
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

          {/* Pagination */}
          <div className="flex justify-end gap-4 items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft />
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
