"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CurrentPageHeader() {
    const pathname = usePathname();
    const [currentHeader, setCurrentHeader] = useState('');

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
            setCurrentHeader(`Current Slug: ${pathname}`);
        }
    }, [pathname]);

    return (
        <div>{currentHeader}</div>
    );
}

// "use client";
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';

// // Simulate fetching title based on slug
// const fetchTitleBySlug = async (slug) => {
//   // Replace this with your actual data fetching logic
//   const titles = {
//     '/': 'Home Page',
//     '/about': 'About Us',
//     '/contact': 'Contact Us'
//   };
//   return titles[slug] || 'Page Not Found';
// };

// export default function CurrentPageHeader() {
//     const pathname = usePathname();
//     const [currentHeader, setCurrentHeader] = useState('');

//     useEffect(() => {
//         const getTitle = async () => {
//             const title = await fetchTitleBySlug(pathname);
//             setCurrentHeader(title);
//         };

//         getTitle();
//     }, [pathname]);

//     return (
//         <div>{currentHeader}</div>
//     );
// }