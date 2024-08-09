import Link from "next/link"

export default function NotFound() {
  return (
    <main className="pt-48">
      <div className="px-4 lg:px-0 article font-medium text-xl lg:text-2xl max-w-2xl mx-auto tracking-[0.5%]">
      <span className="uppercase">404 Not Found — </span>
      Could not find requested resource
      <Link
          href="/"
          className="inline-block border border-black mt-4 p-3 text-xs uppercase tracking-wide hover:bg-black hover:text-white transition-all"
        >
        Return home
        </Link>
      </div>
    </main>
  )
}


