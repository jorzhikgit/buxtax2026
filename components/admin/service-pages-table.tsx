"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { toggleServicePagePublishAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ServicePage } from "@/types";
import { formatDate } from "@/lib/utils";

export function ServicePagesTable({ pages }: { pages: ServicePage[] }) {
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-[28px] border border-border bg-white shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.slug}>
              <TableCell>{page.title}</TableCell>
              <TableCell>/services/{page.slug}</TableCell>
              <TableCell>{page.published ? "Published" : "Draft"}</TableCell>
              <TableCell>{formatDate(page.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/services/edit/${page.slug}`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        const result = await toggleServicePagePublishAction(page.id, !page.published);
                        setStatus(result.message);
                      })
                    }
                  >
                    {page.published ? "Unpublish" : "Publish"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {status ? <p className="p-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
