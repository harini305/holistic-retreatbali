import Link from "@/components/SmartLink";
import Photo from "@/components/Photo";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h1>This page can&apos;t be found</h1>
          <p className="lead">
            It may have moved when the website was rebuilt. The retreat details, Mitch&apos;s story and contact
            options are all a click away.
          </p>
          <div className="btn-row">
            <Link href="/" className="btn btn-primary">
              Go to the home page
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact Mitch
            </Link>
          </div>
        </div>
        <figure className={`media ${styles.media}`}>
          <Photo name="villa-entrance" alt="The entrance gate to Villa Paradise" sizes="(min-width: 768px) 360px, 80vw" />
        </figure>
      </div>
    </section>
  );
}
