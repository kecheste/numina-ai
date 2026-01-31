export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-[100dvh] overflow-y-auto">{children}</div>;
}
