import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          [1,2,3,4].map((item,index) => (
            <TableRow key={index}>
              <TableCell>12-02-2003</TableCell>
              <TableCell>Frontend</TableCell>
              <TableCell>Tcs</TableCell>
              <TableCell className="text-right" variant="ghost"><Badge variant="ghost">Accepted</Badge></TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable