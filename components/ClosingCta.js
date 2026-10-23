import Link from "@/components/SmartLink";
import { ChatIcon } from "@/components/Icons";
import { whatsappUrl } from "@/lib/site";
import styles from "./ClosingCta.module.css";

export default function ClosingCta() {
  return (
    <section className={styles.cta} aria-labelledby="closing-title">
      <div className={`container ${styles.inner}`} data-reveal>
        <div>
          <h2 id="closing-title">Questions before you decide?</h2>
          <p>Mitch replies personally. Ask about dates, availability, pricing or anything else.</p>
        </div>
        <div className="btn-row">
          <Link href="/contact" className="btn btn-primary">
            Make an enquiry
          </Link>
          <a href={whatsappUrl()} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            <ChatIcon />
            WhatsApp Mitch
          </a>
        </div>
      </div>
    </section>
  );
}
