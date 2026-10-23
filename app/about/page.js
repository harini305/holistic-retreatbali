import Link from "@/components/SmartLink";
import Motion from "@/components/Motion";
import Photo from "@/components/Photo";
import PageIntro from "@/components/PageIntro";
import ClosingCta from "@/components/ClosingCta";
import styles from "./page.module.css";

// Biography from /the-facilitator/ and /retreat/ (docs/source-audit/content/pages).
// Unconfirmed years (audit 08, F8), the unclear "Member Imta" credential and the
// historical facilitator line-up (F10) are left out until the business confirms them.

export const metadata = {
  title: "About Mitch Rilett",
  description:
    "Mitch Rilett hosts Holistic Retreat Bali, a small-group retreat in Sanur that connects guests with traditional Balinese healers and practitioners.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Motion />
      <PageIntro title="About Mitch and the retreat">
        Holistic Retreat Bali grew out of one person&apos;s search for genuine healers, and the wish to make that
        path easier for others.
      </PageIntro>

      <section className="section" aria-labelledby="mitch-title">
        <div className={`container ${styles.bio}`}>
          <div className={styles.bioMedia}>
            <figure className="media" data-reveal-image>
              <Photo name="mitch-portrait" alt="Mitch Rilett, host of Holistic Retreat Bali" priority sizes="(min-width: 960px) 420px, 90vw" />
            </figure>
            <dl className={styles.roles}>
              <dt>Practice</dt>
              <dd>Private holistic life coaching and counselling</dd>
              <dd>Meditation teacher</dd>
            </dl>
          </div>

          <div className={styles.bioText} data-reveal>
            <h2 id="mitch-title">Mitch Rilett</h2>
            <p className="lead">
              Mitch has lived in Bali for many years and, before that, visited the island often. Much of that time
              was spent locating, and then working with, traditional Balinese practitioners in his own pursuit of
              growth.
            </p>
            <p>
              Before Bali, he worked in well-known Australian media organisations, including the ABC, which exposed
              him to a global community and a gradual awareness of his own spiritual needs. In 2011 he formalised his
              experience with the Inner-Voyage Holistic Life Counselling qualification.
            </p>
            <p>
              He has counselled people from many walks of life in the ideas and practices of happiness, including
              people, and their loved ones, affected by addiction.
            </p>
            <blockquote className={styles.pull}>
              <p>
                &ldquo;If you&apos;re seeking change, or on a path of self-discovery and need some help to move
                forward, I&apos;d love to work with you.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className={`section ${styles.approach}`} aria-labelledby="approach-title">
        <div className={`container ${styles.approachGrid}`}>
          <div data-reveal>
            <h2 id="approach-title">Why the retreat exists</h2>
            <p>
              The idea was born after meeting many people who came to Bali hoping to find spiritual guidance. In most
              cases, a lot of time and money was spent searching for genuine traditional healers and advisers.
            </p>
            <p>
              Having spent years finding and working with those practitioners himself, Mitch realised he could
              smooth the path for others. The retreat brings a small group to them, with everything on the ground
              taken care of.
            </p>
          </div>
          <ul className={styles.principles} data-reveal-stagger>
            <li>
              <h3>Small on purpose</h3>
              <p>No more than six guests, each with a private room and en-suite, so nothing is generic or rushed.</p>
            </li>
            <li>
              <h3>Healers, not a timetable</h3>
              <p>
                Yoga and meditation prepare you for the work. The heart of the week is private sessions with
                Balinese healers and practitioners.
              </p>
            </li>
            <li>
              <h3>Nothing pushed</h3>
              <p>Nothing is preached, nothing is pushed, and there are no upsells during your stay.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="table-title">
        <div className={`container ${styles.table}`}>
          <figure className="media" data-reveal-image>
            <Photo name="villa-courtyard" alt="The garden courtyard and pavilion at Villa Paradise" sizes="(min-width: 960px) 640px, 100vw" />
          </figure>
          <div data-reveal>
            <h2 id="table-title">A personal welcome</h2>
            <p>
              Mitch answers enquiries personally, and most guests talk to him before they decide. There is no sales
              pitch. Ask whatever you need to know about the healers, the week or the villa.
            </p>
            <p className={styles.more}>
              <Link href="/#week" className="text-link">
                See how the week runs
              </Link>
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
