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
import { ChevronLeft, ChevronRight, MoreVertical, Plus } from 'lucide-react';

function Parents() {
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
                        // onChange={(e) => {
                        //   setKids({ ...kids, name: e.target.value });
                        // }}
                      />
                      <Input
                        placeholder="Code"
                        // onChange={(e) => {
                        //   setKids({ ...kids, code: e.target.value });
                        // }}
                      />
                    </div>
                    <div className="grid w-full grid-cols-1 md:gird-cols-2 gap-2">
                      <Select
                        // onValueChange={(v) => {
                        //   setKids({ ...kids, gender: v });
                        // }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Boy">Male</SelectItem>
                          <SelectItem value="Girl">Female</SelectItem>
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
                    <Button type="submit" //onClick={AddKid}
                    >
                      Add Parent
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Input
                placeholder="Search children..."
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