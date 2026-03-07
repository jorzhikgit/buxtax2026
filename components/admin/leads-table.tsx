"use client";

import { useState, useTransition } from "react";

import { deleteLeadAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Lead } from "@/types";
import { formatDate } from "@/lib/utils";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-[28px] border border-border bg-white shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Business Type</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.business_type}</TableCell>
              <TableCell className="capitalize">{lead.source}</TableCell>
              <TableCell>{formatDate(lead.created_at)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      const result = await deleteLeadAction(lead.id);
                      setStatus(result.message);
                    })
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {status ? <p className="p-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
