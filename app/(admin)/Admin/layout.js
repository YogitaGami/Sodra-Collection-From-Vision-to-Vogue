// app/admin/layout.js
import Link from "next/link";
import "../../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Admin | Sodra",
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

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!isAdmin) {
    return (
      <html lang="en">
        <body>
          <div className="flex flex-col justify-center items-center p-4 w-full min-h-[90vh]">
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p>You are not authorized to view this page.</p>
            <Link
              href="/"
              className="mt-3 text-[#0680d0] text-lg hover:underline"
            >
              <p>
                Visit Site <span>Sodra Collection</span>
              </p>
            </Link>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <SessionWrapper>
        <div className="flex h-screen">
          <aside className="w-64 bg-[#71c1f6cf] text-[#0680d0] p-5 space-y-6">
            <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
            <nav className="space-y-3 font-bold text-lg">
              <Link href="/Admin" className="block hover:underline">
                Dashboard
              </Link>
              <Link href="/Admin/users" className="block hover:underline">
                Users
              </Link>
              <Link href="/Admin/dresses" className="block hover:underline">
                Dresses
              </Link>
              <Link href="/Admin/accessories" className="block hover:underline">
                Accessories
              </Link>
              <Link href="/Admin/artpieces" className="block hover:underline">
                Art Pieces
              </Link>
              <Link href="/Admin/madeToOrders" className="block hover:underline">
                Made-To-Orders
              </Link>
              <Link href="/Admin/madeToOrderSubmissions" className="block hover:underline">
                Made-to-Order Submissions
              </Link>
              <Link href="/Admin/orders" className="block hover:underline">
                Orders
              </Link>
              <Link href="/Admin/messages" className="block hover:underline">
                Messages
              </Link>
            </nav>
            <Link href="/" className="pt-5 text-lg block hover:underline">
              Sodra Collection <span className="text-[12px]">View Site</span>
            </Link>
          </aside>
          <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
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
        </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
