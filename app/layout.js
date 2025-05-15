import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
// import { CartItemProvider } from "@/context/Context";
import StoreProvider from "@/redux/StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sodra Collection",
  description:
    "Sodra Collection offers a seamless experience to buy or rent stylish fashion pieces, combining tradition and modern trends.",
  keywords: [
    "Sodra Collection",
    "fashion",
    "buy dresses",
    "rent outfits",
    "ethnic wear",
    "modern fashion",
    "online clothing store",
  ],
  authors: [{ name: "Sodra Collection" }],
  creator: "Sodra Collection",
  openGraph: {
    title: "Sodra Collection",
    description:
      "Buy or rent beautiful fashion pieces for every occasion. Discover elegance with Sodra Collection.",
    url: "https://yourdomain.com",
    siteName: "Sodra Collection",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Razorpay script */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <StoreProvider>
            <Navbar />
            <div className="h-fit z-[-2] w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,#71c1f6_100%)]">
              {children}
            </div>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
