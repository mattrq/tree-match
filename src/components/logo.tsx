"use client"

import Image from "next/image";

import styles from './logo.module.css';

const LogoText = () => <>
        <strong className={styles.green}>Tree</strong>
        <strong className={styles.brown}>Match</strong>
    </>

export const Logo = ({size = 24, textPosition='left'}: { size?: number, textPosition?: 'left' | 'bottom' }) =>
    <div className={`${styles.logo} ${textPosition === 'bottom'?styles.bottom:''}`}>
        <Image alt="TreeMatch Logo" src='/logo.jpg' height={size} width={size}/>
        {textPosition === 'bottom' ? <div><LogoText /></div> : <LogoText/>}
    </div>

