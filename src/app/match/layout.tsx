"use client"

import styles from "./page.module.css";
import Image from "next/image";

import {useUser} from "@auth0/nextjs-auth0";
import {Logo} from "@/components/logo";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const {user} = useUser();

    if (!user) {
        return <div>Loading ...</div>;
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Logo/>
                <div className={styles.profile}>
                    <Image className={styles.picture} alt="profile picture" src={user.picture ?? '/user.svg'}
                           height={24} width={24}/>
                    {user.nickname}
                    <a href="/auth/logout" title="Click to logout">
                        <Image alt="logout icon" src='/logout.png' height={14} width={14}/>
                    </a>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>

            </footer>
        </div>
    );
}