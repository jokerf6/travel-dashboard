import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Provider } from "./provider";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styles

export const metadata: Metadata = {
  title: "Apex Stocks",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/smallLogo.png" />
      </head>
      <body>
        <Provider>{children}</Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
