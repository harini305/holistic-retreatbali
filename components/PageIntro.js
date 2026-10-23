import styles from "./PageIntro.module.css";

export default function PageIntro({ title, children }) {
  return (
    <section className={`${styles.intro} on-navy`}>
      <div className="container" data-hero>
        <h1>{title}</h1>
        {children && <p className={styles.lead}>{children}</p>}
      </div>
    </section>
  );
}
