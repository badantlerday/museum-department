import Link from "next/link";
export default function Navigation() {
    return (
    <header className="p-10 lg:px-20 space-x-6">
    <Link href="/">Home</Link>
    <Link href="/projects">Projects</Link>
    <Link href="/admin">Admin</Link>
    </header>
)
}