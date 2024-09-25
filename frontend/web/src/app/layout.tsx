import { ApolloWrapper } from "@/lib/apollo";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="h-screen w-screen bg-background text-text">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
