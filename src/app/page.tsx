
import styles from "./page.module.css";
import {Logo} from "@/components/logo";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo size={150} textPosition="bottom" />

        <div>Lets get started finding your perfect tree.</div>
        <div>Start by sign-in or registering.</div>

        <div className={styles.ctas}>
          <a
              className={styles.primary}
              href="/auth/login"
              rel="noopener noreferrer"
          >
            Log in
          </a>
          <a
              href="/auth/login?screen_hint=signup"
              className={styles.secondary}
              rel="noopener noreferrer"
          >
            Sign up
          </a>
        </div>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
