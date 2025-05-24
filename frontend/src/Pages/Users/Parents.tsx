import { AppSidebar } from '@/components/app-sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getParents } from '@/Services/api';
import { getCurrentUser } from '@/Services/authService';
import { ChevronLeft, ChevronRight, MoreVertical, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { c } from 'vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';

function Parents() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      console.log(response.name);
      setUsername(response.name);
      setUserId(response._id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  fetchUser();
}, []);

useEffect(() => {
  console.log(username, userId); // This will log both updated values
}, [username, userId]);

  const handleGetParents = async () => {
    try {
      const response = await getParents(username, userId);
      setList(response.data.parents);
      console.log(response.data.parents);

    } catch (error) {
      console.error('Error fetching parents:', error);
    }
  }
useEffect(() => {
  if (username && userId) {
    handleGetParents();
  }
}, [username, userId]);

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
              
              <Input
                placeholder="Search Parents..."
                //value={search}
                //onChange={(e) => setSearch(e.target.value)}
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
              {list.map((parent) => (
                <TableRow key={parent[0].id}>
                    <TableCell>{parent[0].id}</TableCell>
                    <TableCell>{parent[0].name}</TableCell>
                    <TableCell>{parent[0].age}</TableCell>
                    <TableCell>{parent[0].class}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          parent.status === "Active"
                            ? "success"
                            : parent.status === "Inactive"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {parent.status}
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
                            <Link className="w-full" to={`/Users/Parents/${parent[0].id}/${parent[0].name}`}>View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Editing ${parent[0].name}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              ) )}
              
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-end gap-4 items-center mt-4">
            <Button
            //  variant="outline"
            //  disabled={page === 1}
            //  onClick={() => setPage(page - 1)}
            >
              <ChevronLeft />
            </Button>
            <span>

            </span>
            <Button
              variant="outline"
              //disabled={page === totalPages}
              //onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Parents