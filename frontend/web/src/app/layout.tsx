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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-screen w-full bg-background text-text">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
