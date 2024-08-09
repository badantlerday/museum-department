"use client";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import Image from "next/image";


export default function UserSession() {

    const {isAuthenticated} = useKindeBrowserClient();

    return (
        <>
        {isAuthenticated ? (
            <Link href="/dashboard">
                <Image
                    src="/icon-bookmark-menu.svg"
                    width={24}
                    height={24}
                    alt="Dashboard"
                />
            </Link>
            ) : (
            <LoginLink>
                <Image
                    src="/icon-bookmark-menu.svg"
                    width={24}
                    height={24}
                    alt="Login to see your bookmarks"
                />
            </LoginLink>
            )
        }
        </>
      )
}