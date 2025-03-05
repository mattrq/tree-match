"use client"

import { useMemo } from 'react';

import styles from "./page.module.css";
import Image from "next/image";

import {useUser} from "@auth0/nextjs-auth0";
import {Logo} from "@/components/logo";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const {user} = useUser();

    const ProfilePicture = useMemo(() => {
        try {
            if (user?.picture) {
                return <Image className={styles.picture} alt="profile picture" src={user.picture} height={24} width={24}/>
            }
        } catch (e) {
            // Ignore
        }
        return <Image className={styles.picture} alt="profile picture" src="/user.svg" height={24} width={24}/>
    },[user?.picture])

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Logo/>
                <div className={styles.profile}>
                    {ProfilePicture}
                    {user?.nickname}
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