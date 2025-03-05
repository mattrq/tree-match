import styles from "@/app/match/page.module.css";
import {FC, ReactElement} from "react";

const buttonVariants = {
    primary: styles.primary,
    secondary: styles.secondary
}

export type ButtonProps =
    { variant: keyof typeof buttonVariants,
        children: string,
        isLoading?: boolean
    } &
    (
        {type: 'link', href: string} |
        {type: 'button', href?: never}
    );

export type Button = FC<ButtonProps>;
export const Button: Button = ({children, type  = 'button', variant = 'secondary', ...props}: ButtonProps) => {
    if (type==='link') {
        return <a className={buttonVariants[variant]} href={props.href}>{children}</a>
    }
    return <button type="submit" className={buttonVariants[variant]} disabled={props.isLoading}>{children}</button>
}

export const ButtonGroup = ({children}: { children: ReactElement<ButtonProps, Button> }) =>
    <div className={styles.ctas}>
        {children}
    </div>

