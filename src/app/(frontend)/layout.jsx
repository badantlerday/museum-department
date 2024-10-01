import "@/app/globals.css";
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {draftMode().isEnabled && (
          <a
            className="fixed right-0 bottom-0 text-[9px] uppercase tracking-wide font-medium rounded-sm bg-md-grey-200 text-md-grey-600 py-2 px-3 m-4 z-50 hover:bg-black hover:text-white transition-colors"
            href="/api/draft-mode/disable"
          >
            Disable preview
          </a>
        )}  
        {children}
        {draftMode().isEnabled && <VisualEditing />}
        <Toaster toastOptions={{}} />
        <Footer />
      </body>
    </html>
  );
}

