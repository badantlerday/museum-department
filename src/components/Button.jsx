import Link from 'next/link';

const Button = ({ href, children, onClick }) => {
    if (href) {
        return (
            <Link href={href} className="inline-block border border-md-black p-3 text-xs uppercase tracking-[1px] hover:bg-md-black hover:text-white transition-all">
                    {children}
            </Link>
        );
    }

    return (
        <button className="inline-block border border-md-black p-3 text-xs uppercase tracking-[1px] hover:bg-md-black hover:text-white transition-all" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
