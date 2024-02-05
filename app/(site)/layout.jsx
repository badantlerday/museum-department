import '../globals.css'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {token} from '@/lib/sanity.fetch'
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PreviewProvider = dynamic(() => import('@/components/PreviewProvider'))

export default async function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {draftMode().isEnabled ? (
          <PreviewProvider token={token}>{children}</PreviewProvider>
        ) : (
          children
        )}
        <Footer />
      </body>
    </html>
  )
}