import Link from "@/components/SmartLink";
import Motion from "@/components/Motion";
import Photo from "@/components/Photo";
import { ArrowIcon, ChatIcon } from "@/components/Icons";
import { contact, whatsappUrl } from "@/lib/site";
import styles from "./page.module.css";

// Copy is drawn from the /retreat/ landing page (docs/source-audit/content/pages/retreat.md).
// Price, specific dates, review counts and the "9+ sessions" figure are deliberately
// omitted until the business confirms them (audit 08, F1/F2/F5/F13).

const PRACTICES = [
  {
    title: "The traditional Balian",
    text: "A highly respected Balinese healer visits each guest privately, working in ways passed down for generations. Not a show for tourists.",
  },
  {
    title: "The listrik healer",
    text: "A private session with a listrik healer in their own home: the one guests struggle hardest to describe afterwards.",
  },
  {
    title: "Energy and emotion work",
    text: "Shamanic healing, sound healing, Reiki, block removal and higher-self work. Each practitioner is different, and the order is chosen for how your week is going.",
  },
  {
    title: "Hands and body",
    text: "Traditional Balinese massage, medical intuitive massage and reflexology, so the body is cared for alongside everything else.",
  },
  {
    title: "Breath and stillness",
    text: "Morning meditation, chakra and deep-breath work, Hatha and Kundalini yoga, and tai chi. Gentle, and always optional.",
  },
  {
    title: "The long conversations",
    text: "Chinese astrology, a nutrition evaluation, and the unhurried talks around the dinner table that guests mention as often as the sessions.",
  },
];

const SESSIONS = "Two private healing sessions in your room";

const WEEK = [
  { day: "Sunday", note: "Arrival", items: ["Lunch: the retreat begins", "Holistic group chat", "Sound healing group", "Dinner"] },
  { day: "Monday", items: ["Meditation", "Breakfast", "Group yoga", "Lunch", SESSIONS, "Dinner"] },
  { day: "Tuesday", items: ["Meditation", "Breakfast", "Group deep breath", "Lunch", SESSIONS, "Dinner"] },
  {
    day: "Wednesday",
    note: "Out all day",
    items: ["Cleansing and blessing at the water temple, with our priest", "Lunch in Gianyar", "Afternoon at a Balinese healer's house", "Dinner"],
  },
  { day: "Thursday", items: ["Meditation", "Breakfast", "Group yoga", "Lunch", SESSIONS, "Dinner"] },
  { day: "Friday", items: ["Meditation", "Breakfast", "Free time", "Lunch", SESSIONS, "Dinner"] },
  { day: "Saturday", note: "Departure", items: ["Meditation", "Brunch at Sindhu Beach", "The retreat concludes"] },
];

const QUOTES = [
  {
    text: "I wasn't looking for a yoga-only or spa-style retreat with facials and green juices coming out of my ears. I wanted something real. And this was exactly that.",
    who: "Fiona, Scotland",
    when: "October 2025",
  },
  {
    text: "It focussed on breathwork, nervous system reset and energy healing, but not in a religious or hippy way. You're definitely in a safe pair of hands.",
    who: "Maz, Australia",
    when: "October 2025",
  },
  {
    text: "I arrived as a sceptic, unsure if it would truly have an impact. I never felt overwhelmed by what I was discovering.",
    who: "Tambra, USA",
    when: "February 2025",
  },
];

export default function Home() {
  return (
    <>
      <Motion />

      {/* Hero */}
      <section className={`${styles.hero} on-navy`} aria-labelledby="hero-title">
        <div className={styles.heroMedia} data-hero-media>
          <Photo name="sanur-dawn" alt="" priority sizes="100vw" />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy} data-hero>
            <h1 id="hero-title">A small-group healing retreat in Sanur, Bali</h1>
            <p className={styles.heroLead}>
              Seven days and six nights at Villa Paradise, for no more than six guests. Private sessions with
              traditional Balinese healers, gentle mornings, and everything organised by your host, Mitch Rilett.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary">
                Enquire about a retreat
              </Link>
              <a href={whatsappUrl()} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <ChatIcon />
                Ask Mitch on WhatsApp
              </a>
            </div>
          </div>
          <ul className={styles.heroFacts} aria-label="Retreat at a glance">
            <li>
              <strong>Sanur, Bali</strong>
              <span>Villa Paradise</span>
            </li>
            <li>
              <strong>6 nights</strong>
              <span>Sunday to Saturday</span>
            </li>
            <li>
              <strong>6 guests</strong>
              <span>maximum, own room each</span>
            </li>
            <li>
              <strong>All included</strong>
              <span>meals, sessions, transport</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section screen-section" aria-labelledby="experience-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.splitText} data-reveal>
            <h2 id="experience-title">Most people arrive tired, unsure, and quietly hoping something will shift</h2>
            <p className="lead">
              You do not need to be spiritual, or flexible, or certain about anything. Some of the warmest reviews
              were written by people who turned up as sceptics.
            </p>
            <p>
              Yoga and meditation are here to prepare you for the work, not to fill the week. On four afternoons
              you have two private sessions in your own room, each with a different practitioner.
            </p>
            <ul className={`tick-list ${styles.points}`}>
              <li>Nothing is preached, nothing is pushed, and there are no upsells during your stay.</li>
              <li>Six guests means nothing is generic and nothing is rushed.</li>
              <li>Everything is organised, from the airport pick-up to the last meal.</li>
            </ul>
          </div>
          <figure className={`media ${styles.splitMedia}`} data-reveal-image>
            <Photo name="guests-healer" alt="Retreat guests with a Balinese healer in Ubud" sizes="(min-width: 960px) 600px, 100vw" />
          </figure>
        </div>
      </section>

      {/* Healers and practices */}
      <section id="healers" className={`section ${styles.sand}`} aria-labelledby="healers-title">
        <div className={`container ${styles.healers}`}>
          <figure className={`media ${styles.healersMedia}`} data-reveal-image>
            <Photo name="sound-healing" alt="A sound healing session at the villa" sizes="(min-width: 960px) 420px, 100vw" />
          </figure>
          <div>
            <div className={styles.sectionHead} data-reveal>
              <h2 id="healers-title">Healers it takes years to find</h2>
              <p className="lead">
                Mitch spent years locating these practitioners for his own sake before he ever brought a guest to
                them. They are not in guidebooks and they do not advertise.
              </p>
            </div>
            <ul className={styles.practices} data-reveal-stagger>
              {PRACTICES.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.footnote}>
              The exact therapies for each retreat depend on which healers are available that month, as some
              travel, so the mix varies a little from one retreat to the next.
            </p>
          </div>
        </div>
      </section>

      {/* Temple day */}
      <section id="temple" className={`section on-navy ${styles.temple}`} aria-labelledby="temple-title">
        <div className={`container ${styles.templeGrid}`}>
          <div className={styles.templeText} data-reveal>
            <h2 id="temple-title">A cleansing ceremony at the water temple</h2>
            <p>
              Midweek you leave the villa. A Hindu priest guides you through a purification and blessing at Pura
              Mengening, explaining every step so you understand what is happening rather than watching from
              outside. Lunch follows in Gianyar, then an afternoon at a Balinese healer&apos;s house.
            </p>
            <p>It is the one ceremony of the week. Beyond it, nothing is preached and nothing is expected of you.</p>
          </div>
          <div className={styles.templePhotos}>
            <figure className={`media ${styles.templeMain}`} data-reveal-image>
              <Photo
                name="temple-purification"
                alt="Guests standing in the spring-fed pools during a temple purification"
                sizes="(min-width: 960px) 520px, 100vw"
              />
            </figure>
            <figure className={`media ${styles.templeSide}`} data-reveal-image>
              <Photo name="temple-priest" alt="A Hindu priest preparing offerings at the temple" sizes="(min-width: 960px) 300px, 40vw" />
            </figure>
          </div>
        </div>
      </section>

      {/* The week */}
      <section id="week" className="section screen-section" aria-labelledby="week-title">
        <div className="container">
          <div className={styles.weekHead} data-reveal>
            <h2 id="week-title">Structured enough that you never have to think</h2>
            <p className="lead">
              Mornings together, afternoons private, evenings around the table. The retreat starts around midday on
              Sunday and ends around midday on Saturday.
            </p>
          </div>
          <ol className={styles.week} data-reveal-stagger>
            {WEEK.map((d) => (
              <li key={d.day} className={styles.day}>
                <div className={styles.dayHead}>
                  <h3>{d.day}</h3>
                  {d.note && <span>{d.note}</span>}
                </div>
                <ul>
                  {d.items.map((item, i) => (
                    <li key={i} className={item === SESSIONS ? styles.private : undefined}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Villa */}
      <section id="villa" className={`section screen-section ${styles.sand}`} aria-labelledby="villa-title">
        <div className={`container ${styles.villa}`}>
          <div className={styles.villaText} data-reveal>
            <h2 id="villa-title">A place to retreat to, not just sleep in</h2>
            <p>
              Villa Paradise is two connected villas in a quiet, leafy part of Sanur, with two pools, deep gardens
              and quiet corners to sit in. Every bedroom is large and single occupancy, with a full en-suite, so your
              sessions happen in your own space and you always have somewhere to withdraw to.
            </p>
            <ul className={`tick-list ${styles.points}`}>
              <li>Three fresh meals a day, cooked in the villa.</li>
              <li>Juices and herbal teas from turmeric, ginger, lemongrass and cinnamon.</li>
              <li>Allergies and dietary needs catered for, including vegan, dairy-free and coeliac.</li>
              <li>Air conditioning and fans in every room, and Wi-Fi throughout.</li>
            </ul>
          </div>
          <div className={styles.mosaic}>
            <figure className={`media ${styles.mA}`} data-reveal-image>
              <Photo name="villa-pavilion" alt="The open pavilion at Villa Paradise, Sanur" sizes="(min-width: 960px) 560px, 100vw" />
            </figure>
            <figure className={`media ${styles.mB}`} data-reveal-image>
              <Photo name="villa-garden" alt="The gardens between the two villas" sizes="(min-width: 960px) 280px, 50vw" />
            </figure>
            <figure className={`media ${styles.mC}`} data-reveal-image>
              <Photo name="villa-bedroom" alt="A bedroom opening onto the garden" sizes="(min-width: 960px) 280px, 50vw" />
            </figure>
            <figure className={`media ${styles.mD}`} data-reveal-image>
              <Photo name="food-spread" alt="Lunch on the table at the villa" sizes="(min-width: 960px) 280px, 50vw" />
            </figure>
          </div>
        </div>
      </section>

      {/* Mitch */}
      <section id="mitch" className="section" aria-labelledby="mitch-title">
        <div className={`container ${styles.mitch}`}>
          <figure className={`media ${styles.mitchMedia}`} data-reveal-image>
            <Photo name="mitch-portrait" alt="Mitch Rilett, host of Holistic Retreat Bali" sizes="(min-width: 960px) 400px, 80vw" />
          </figure>
          <div className={styles.mitchText} data-reveal>
            <h2 id="mitch-title">You will be talking to Mitch</h2>
            <p className="lead">
              Mitchell Rilett came to Bali on his own search and spent years finding practitioners most visitors
              never reach.
            </p>
            <p>
              In 2011 he formalised his experience with an Inner-Voyage Holistic Life Counselling qualification,
              after a career in Australian media. He hosts the retreat and answers enquiries personally. Guests
              describe him the same way, over and over: down to earth, funny, no pretence, and no promises he
              cannot keep.
            </p>
            <div className={styles.inlineLinks}>
              <Link href="/about" className="text-link">
                More about Mitch and the retreat <ArrowIcon width={18} height={18} />
              </Link>
              <a href={whatsappUrl()} className="text-link" target="_blank" rel="noopener noreferrer">
                Ask Mitch a question <ArrowIcon width={18} height={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guests */}
      <section className={`section ${styles.guests}`} aria-labelledby="guests-title">
        <div className="container">
          <div className={styles.guestsTop}>
            <div data-reveal>
              <h2 id="guests-title">You arrive alone. You rarely leave that way.</h2>
              <p className="lead">
                Six strangers at lunch on Sunday. By the last brunch on the beach, most groups are still messaging
                each other years later.
              </p>
            </div>
            <figure className={`media ${styles.guestsMedia}`} data-reveal-image>
              <Photo name="beach-group" alt="Guests on Sanur beach on the last morning of a retreat" sizes="(min-width: 960px) 640px, 100vw" />
            </figure>
          </div>
          <ul className={styles.quotes} data-reveal-stagger>
            {QUOTES.map((q) => (
              <li key={q.who}>
                <figure>
                  <blockquote>
                    <p>&ldquo;{q.text}&rdquo;</p>
                  </blockquote>
                  <figcaption>
                    <strong>{q.who}</strong>
                    <span>{q.when} retreat</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <a href={contact.mapsUrl} className="text-link" target="_blank" rel="noopener noreferrer">
            Read guest reviews on Google <ArrowIcon width={18} height={18} />
          </a>
        </div>
      </section>

      {/* Practical */}
      <section id="practical" className={`section ${styles.sand}`} aria-labelledby="practical-title">
        <div className="container">
          <div className={styles.practicalHead} data-reveal>
            <h2 id="practical-title">The practical details</h2>
            <p className="lead">
              Retreats run once a month. For current dates, availability and pricing, ask Mitch directly. He replies
              personally.
            </p>
          </div>
          <div className={styles.practical}>
            <dl className={styles.facts} data-reveal>
              <div>
                <dt>Where</dt>
                <dd>Villa Paradise, Sanur, Bali</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>Seven days, six nights, from midday Sunday to midday Saturday</dd>
              </div>
              <div>
                <dt>Group</dt>
                <dd>Six guests maximum, each in a private room with en-suite</dd>
              </div>
              <div>
                <dt>Arrival</dt>
                <dd>Airport pick-up on arrival is included</dd>
              </div>
            </dl>

            <div className={styles.lists} data-reveal>
              <div>
                <h3>Included</h3>
                <ul className="tick-list">
                  <li>Private bedroom, single occupancy</li>
                  <li>All meals, juices and teas</li>
                  <li>Every therapy and healing session</li>
                  <li>Airport pick-up on arrival</li>
                  <li>Temple ceremony and day trip</li>
                  <li>All transport and excursions</li>
                </ul>
              </div>
              <div>
                <h3>Not included</h3>
                <ul className={styles.dashList}>
                  <li>Flights</li>
                  <li>Travel insurance</li>
                  <li>Departure transfer</li>
                  <li>Personal shopping</li>
                </ul>
              </div>
            </div>

            <div className={styles.booking} data-reveal>
              <h3>How booking works</h3>
              <ol>
                <li>Send an enquiry. It costs nothing and commits you to nothing.</li>
                <li>A deposit holds one of the six places.</li>
                <li>Closer to the date, a short personal form goes to the healers so the week is shaped around you.</li>
                <li>The balance is due 14 days before the retreat.</li>
              </ol>
            </div>
          </div>
          <p className={styles.wellness}>
            The retreat offers complementary wellness practices, not medical treatment. Please continue any care your
            doctor has recommended, and let Mitch know about health conditions or allergies when you enquire.
          </p>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className={`on-navy ${styles.cta}`} aria-labelledby="cta-title">
        <div className={`container ${styles.ctaGrid}`}>
          <div data-reveal>
            <h2 id="cta-title">Send a message. That is all it takes to start.</h2>
            <p>
              No obligation and no pitch. Ask whatever you need to ask. Some people talk to Mitch for an hour and
              decide it is not for them, and that is a good outcome too.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary">
                Make an enquiry
              </Link>
              <a href={whatsappUrl()} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <ChatIcon />
                WhatsApp {contact.phoneDisplay}
              </a>
            </div>
            <p className={styles.ctaSmall}>
              Or email <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
          <figure className={`media ${styles.ctaMedia}`} data-reveal-image>
            <Photo name="table-group" alt="Guests around the table at the villa" sizes="(min-width: 960px) 480px, 100vw" />
          </figure>
        </div>
      </section>
    </>
  );
}
