export default async function RootLayout({children}) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>
          {children}
      </body>
    </html>
  )
}