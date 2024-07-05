"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CurrentPageHeader({ data }) {
    const pathname = usePathname();
    const [currentHeader, setCurrentHeader] = useState('');

    // Extract slugs, names, and types from data with proper prefixing
    const items = data.map(item => {
        const prefix = item._type === 'typeface' ? 'font' : item._type;
        return {
            type: item._type,
            name: item.name || item.title,
            slug: `/${prefix}/${item.slug.current}`
        };
    });

    useEffect(() => {
        if (pathname === '/') {
            setCurrentHeader('On Display');
        }
        else if (pathname === '/studios') {
            setCurrentHeader('Design Studios');
        }
        else if (pathname === '/fonts-gallery') {
            setCurrentHeader('Fonts Gallery');
        }
        else if (pathname === '/fonts-in-use') {
            setCurrentHeader('Fonts in Use');
        }
        else if (pathname === '/projects') {
            setCurrentHeader('Projects');
        }
        else if (pathname === '/dashboard') {
            setCurrentHeader('Bookmarks');
        }
        else {
            const matchedItem = items.find(item => item.slug === pathname);
            if (matchedItem) {
                setCurrentHeader(`${matchedItem.type.charAt(0).toUpperCase() + matchedItem.type.slice(1)}: ${matchedItem.name}`);
            } else {
                setCurrentHeader(`Current Slug: ${pathname}`);
            }
        }
    }, [pathname, items]);

    return (
        <div className='animate-fadeIn font-medium tracking-[1%]' key={pathname}>{currentHeader}</div>
    );
}