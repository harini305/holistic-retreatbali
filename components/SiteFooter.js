import Image from "next/image";
import Link from "@/components/SmartLink";
import { contact, images, whatsappUrl } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={`${styles.footer} on-navy`}>
      <div className="container">
        <div className={styles.top}>
          <Link href="/" className={styles.logo} aria-label="Holistic Retreat Bali, home">
            <Image
              src={images.logo.src}
              width={images.logo.width}
              height={images.logo.height}
              alt="Holistic Retreat Bali"
              loading="lazy"
            />
          </Link>
          <nav aria-label="Footer">
            <ul className={styles.links}>
              <li>
                <Link href="/">The retreat</Link>
              </li>
              <li>
                <Link href="/about">About Mitch</Link>
              </li>
              <li>
                <Link href="/contact">Enquire</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <address className={styles.contact}>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>
              {contact.addressLines[0]}, {contact.addressLines[1]}
            </span>
          </address>
          <p className={styles.legal}>
            © {new Date().getFullYear()} Holistic Retreat Bali · <em>{contact.entity}</em>
          </p>
        </div>
      </div>
    </footer>
  );
}
