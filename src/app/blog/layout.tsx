import { BlogGuard } from "@/components/BlogGuard";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogGuard>{children}</BlogGuard>;
}
