'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function customLink({ data = {} }) {
  const pathname = usePathname()
  if (data?.type == "internal") {
    return (
      <Link href={data?.internal?.slug}>
        {data?.text ? data?.text : data?.internal?.title}
      </Link>
    )
  } else if (data?.type == "relative") {
    return <Link href={data?.relative} className={`${pathname === data?.relative ? ' text-black' : 'text-[#999999]'}`}>{data?.text ? data?.text : data?.relative}</Link>
  } else {
    return (
      <a href={data?.external} target="_blank">
        {data?.text ? data?.text : data?.external}
      </a>
    )
  }
}
