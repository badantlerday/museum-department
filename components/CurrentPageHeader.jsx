"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CurrentPageHeader({ data }) {
    const pathname = usePathname();
    const [currentHeader, setCurrentHeader] = useState('');

    // Extract slugs, names, and types from data with proper prefixing
    const items = data.map(item => {
        // const prefix = item._type === 'typeface' ? 'font' : item._type;
        let prefix;
        let type = item._type;
        let name = item.name || item.title
        if (item._type === 'typeface') {
            prefix = 'font';
        } else if (item._type === 'interview') {
            prefix = 'interviews';
        } else if (item._type === 'city') {
            prefix = 'reference';
        } else if (item._type === 'country') {
            prefix = 'reference';
        } else if (item._type === 'person') {
            prefix = 'reference';
        } else if (item._type === 'category') {
            prefix = 'reference';
            name = "Reference";
        } else {
            prefix = item._type;
        }
        return {
            type: type,
            name: name,
            slug: `/${prefix}/${item.slug.current}`
        };
    });

    useEffect(() => {
        if (pathname === '/') {
            setCurrentHeader('On Display');
        }
        else if (pathname === '/become-a-patron') {
            setCurrentHeader('Become a Patron');
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
                if (matchedItem.type === 'category' || matchedItem.type === 'city' || matchedItem.type === 'country' || matchedItem.type === 'person') {
                    setCurrentHeader(`Reference`);
                }
                else {
                    setCurrentHeader(`${matchedItem.type.charAt(0).toUpperCase() + matchedItem.type.slice(1)}: ${matchedItem.name}`);
                }
                
            } else {
                setCurrentHeader(`Current Slug: ${pathname}`);
            }
        }
    }, [pathname, items]);

    return (
        <div className='animate-fadeIn font-medium text-base tracking-[1%]' key={pathname}>{currentHeader}</div>
    );
}