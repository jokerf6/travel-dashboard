export default function AllPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="  flex  h-screen w-screen  bg-[#1F332B]">{children}</main>
  );
}
