"use client";

import { useId, useRef, useState } from "react";
import { contact, whatsappUrl } from "@/lib/site";
import { ChatIcon, MailIcon } from "@/components/Icons";
import styles from "./EnquiryForm.module.css";

/*
 * There is no verified form backend for this site (audit 06, feature 7), so this
 * form never claims to have sent anything. It validates the visitor's details,
 * then hands a pre-filled message to WhatsApp or their email app. The enquiry is
 * only sent when the visitor presses send there, and the status text says so.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  { name: "name", label: "Your name", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone or WhatsApp", type: "tel", autoComplete: "tel" },
  { name: "from", label: "Where are you travelling from?", autoComplete: "country-name" },
  { name: "timing", label: "Which month are you thinking of?", placeholder: "For example, early next year" },
];

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please check your email address, or leave it blank.";
  }
  return errors;
}

function composeMessage(v) {
  const lines = ["Hello Mitch, I'd like to ask about the Holistic Retreat Bali.", ""];
  lines.push(`Name: ${v.name.trim()}`);
  if (v.email.trim()) lines.push(`Email: ${v.email.trim()}`);
  if (v.phone.trim()) lines.push(`Phone / WhatsApp: ${v.phone.trim()}`);
  if (v.from.trim()) lines.push(`Travelling from: ${v.from.trim()}`);
  if (v.timing.trim()) lines.push(`Thinking of: ${v.timing.trim()}`);
  if (v.message.trim()) lines.push("", v.message.trim());
  return lines.join("\n");
}

const EMPTY = { name: "", email: "", phone: "", from: "", timing: "", message: "" };

export default function EnquiryForm() {
  const uid = useId();
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const id = (name) => `${uid}-${name}`;

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const channel = event.nativeEvent.submitter?.value === "email" ? "email" : "whatsapp";
    const found = validate(values);
    setErrors(found);

    const firstInvalid = Object.keys(found).find((k) => found[k]);
    if (firstInvalid) {
      setStatus(null);
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const text = composeMessage(values);
    if (channel === "email") {
      const href = `mailto:${contact.email}?subject=${encodeURIComponent("Retreat enquiry")}&body=${encodeURIComponent(text)}`;
      setStatus({ channel, href });
      window.location.href = href;
    } else {
      const href = whatsappUrl(text);
      setStatus({ channel, href });
      window.open(href, "_blank", "noopener,noreferrer");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-how`}>
      <p id={`${uid}-how`} className={styles.how}>
        Fill in what you like, then choose WhatsApp or email. Your message opens ready to send. Nothing is sent
        until you press send there.
      </p>

      <div className={styles.grid}>
        {FIELDS.map((f) => (
          <div key={f.name} className={`${styles.field} ${f.name === "name" ? styles.wide : ""}`}>
            <label htmlFor={id(f.name)}>
              {f.label}
              {f.required ? (
                <span className={styles.req}> (required)</span>
              ) : (
                <span className={styles.opt}> (optional)</span>
              )}
            </label>
            <input
              id={id(f.name)}
              name={f.name}
              type={f.type || "text"}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={onChange}
              required={f.required}
              aria-invalid={errors[f.name] ? "true" : undefined}
              aria-describedby={errors[f.name] ? id(`${f.name}-error`) : undefined}
            />
            {errors[f.name] && (
              <p id={id(`${f.name}-error`)} className={styles.error}>
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}

        <div className={`${styles.field} ${styles.wide}`}>
          <label htmlFor={id("message")}>
            Anything you would like to ask, or anything Mitch should know?
            <span className={styles.opt}> (optional)</span>
          </label>
          <textarea id={id("message")} name="message" rows={5} value={values.message} onChange={onChange} />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" value="whatsapp" className="btn btn-primary">
          <ChatIcon />
          Continue in WhatsApp
        </button>
        <button type="submit" value="email" className="btn btn-outline">
          <MailIcon />
          Send by email instead
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className={styles.statusWrap}>
        {status && (
          <div className={styles.status}>
            {status.channel === "whatsapp" ? (
              <p>
                WhatsApp should have opened in a new tab with your message filled in. It is only sent once you press
                send there. If nothing opened, <a href={status.href} target="_blank" rel="noopener noreferrer">open WhatsApp with your message</a>.
              </p>
            ) : (
              <p>
                Your email app should have opened with your message filled in. It is only sent once you press send
                there. If nothing opened, email <a href={`mailto:${contact.email}`}>{contact.email}</a> directly.
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
