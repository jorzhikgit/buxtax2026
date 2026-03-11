import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { localizePath, type Locale } from "@/lib/i18n";

export function BlogCard({ 
  post,
  locale
}: { 
  post: BlogPost;
  locale?: Locale;
}) {
  const href = locale ? localizePath(`/blog/${post.slug}`, locale) : `/blog/${post.slug}`;

  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <CardTitle className="font-display text-2xl leading-tight">
          <Link href={href} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
        <Link href={href} className="text-sm font-semibold text-primary">
          Читать статью
        </Link>
      </CardContent>
    </Card>
  );
}
