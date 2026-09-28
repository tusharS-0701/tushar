import styles from './AppSkeleton.module.css'

function Line({ width }: { width: string }) {
  return <span className={styles.line} style={{ width }} />
}

export function AppSkeleton() {
  return <main className={styles.page} aria-busy="true" aria-label="Loading page">
    <header className={styles.header}><span className={styles.brand} /><nav><Line width="42px" /><Line width="55px" /><Line width="40px" /><Line width="45px" /></nav><span className={styles.button} /></header>
    <section className={styles.hero}>
      <div className={styles.heroCopy}><Line width="135px" /><span className={styles.title} /><span className={styles.titleShort} /><div className={styles.copy}><Line width="100%" /><Line width="91%" /><Line width="68%" /></div><div className={styles.actions}><span className={styles.buttonWide} /><span className={styles.buttonWide} /></div></div>
      <span className={styles.portrait} />
    </section>
    <section className={styles.content}><div className={styles.sectionTitle}><Line width="150px" /><Line width="90px" /></div><div className={styles.cards}>{[0,1,2].map((item)=><article key={item}><span className={styles.thumbnail} /><div><Line width="45%" /><Line width="92%" /><Line width="75%" /><Line width="55%" /></div></article>)}</div><span className={styles.banner} /></section>
    <span className="sr-only">Loading content…</span>
  </main>
}
