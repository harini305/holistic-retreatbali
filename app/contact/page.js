import Motion from "@/components/Motion";
import PageIntro from "@/components/PageIntro";
import EnquiryForm from "@/components/EnquiryForm";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { contact, whatsappUrl } from "@/lib/site";
import styles from "./page.module.css";

// FAQ answers are from the /retreat/ landing page. Questions about payment amounts
// are left out until the current price is confirmed (audit 08, F1).
const FAQ = [
  {
    q: "Do I need to be spiritual, or fit, or experienced?",
    a: "No. Guests have ranged from long-time meditators to declared sceptics who came on a friend's recommendation. Yoga is gentle and optional. An open mind is enough.",
  },
  {
    q: "Is this religious?",
    a: "No. There is one Hindu temple ceremony, explained beforehand by our priest, which guests consistently name as a highlight. Beyond that, nothing is preached and nothing is expected of you.",
  },
  {
    q: "Can I come on my own?",
    a: "Most guests do. Every bedroom is single occupancy with its own bathroom, so you always have somewhere private to withdraw to.",
  },
  {
    q: "I am bringing my partner. Is it cheaper for two?",
    a: "No, and that is deliberate. The price is per person because every guest has their own bedroom and bathroom. Your private sessions happen in that room, and couples often find they need to process very different things at very different moments.",
  },
  {
    q: "What if the work brings something up?",
    a: "It often does. Mitch is there all week, meals are shared, and free time is built in to process. Nothing goes further than you want it to.",
  },
  {
    q: "What is the personal details form for?",
    a: "It goes to the healers before you arrive: a few questions about you and what has brought you here, so the week is shaped around you rather than starting from scratch on the Sunday.",
  },
  {
    q: "What about allergies and dietary needs?",
    a: "All catered for. Tell Mitch when you enquire. Meals are freshly prepared three times a day.",
  },
  {
    q: "Should I book extra days in Bali?",
    a: "Past guests recommend it. A few days afterwards to decompress before flying home makes a real difference.",
  },
];

export const metadata = {
  title: "Enquire",
  description:
    "Ask Mitch about upcoming retreat dates, availability and pricing for Holistic Retreat Bali in Sanur, by WhatsApp, email or phone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Motion />
      <PageIntro title="Enquire about a retreat">
        Ask about dates, availability, pricing or anything else. Mitch replies personally, and an enquiry commits you
        to nothing.
      </PageIntro>

      <section className="section" id="enquire" aria-labelledby="form-title">
        <div className={`container ${styles.layout}`}>
          <div>
            <h2 id="form-title" className={styles.formTitle}>
              Write to Mitch
            </h2>
            <EnquiryForm />
          </div>

          <aside className={styles.direct} aria-labelledby="direct-title" data-pin>
            <h2 id="direct-title">Or contact Mitch directly</h2>
            <ul>
              <li>
                <ChatIcon />
                <div>
                  <span className={styles.label}>WhatsApp</span>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    {contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li>
                <PhoneIcon />
                <div>
                  <span className={styles.label}>Phone</span>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <MailIcon />
                <div>
                  <span className={styles.label}>Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </li>
              <li>
                <PinIcon />
                <div>
                  <span className={styles.label}>Address</span>
                  <address>
                    Holistic Retreat Bali
                    <br />
                    {contact.addressLines[0]}
                    <br />
                    {contact.addressLines[1]}
                  </address>
                  <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className={`section ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={`container ${styles.faqGrid}`}>
          <div className={styles.faqHead} data-pin>
            <h2 id="faq-title">Before you ask</h2>
            <p className="lead">A few of the questions guests ask most often.</p>
          </div>
          <div className={styles.faq}>
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
