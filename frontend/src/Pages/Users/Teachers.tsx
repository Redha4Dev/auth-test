import { AppSidebar } from '@/components/app-sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { deleteTeacher, getAllTeacher } from '@/Services/api'; 
import { getCurrentUser } from '@/Services/authService';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Teachers() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUsername(response.name);
        setUserId(response._id);
        console.log(response);
        setList(response.teachers);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleRemoveTeacher = async (teacher) => {
    console.log(teacher);
    try {
      await deleteTeacher(teacher);
      setList((prevList) => prevList.filter((item) => item.id !== teacher.id));
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <div className="p-4 bg-white mx-4 rounded-lg shadow">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Teachers List</h2>

          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { list.length > 0 ? ( list.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.id}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link className="w-full" to={`/Users/Teachers/${teacher.id}/${teacher.name}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Link className="w-full" to={`/Users/Teachers/${teacher.id}/${teacher.name}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRemoveTeacher(teacher)}
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
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )
            }
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-end gap-4 items-center mt-4">
            <Button><ChevronLeft /></Button>
            <Button variant="outline"><ChevronRight /></Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Teachers;
