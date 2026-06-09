import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

// ── EmailJS credentials loaded from environment variables ────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/RohitMahajan8007',         icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rohit-mahajan-681968236/',         icon: 'LI' },
  { label: 'Email',    href: 'mailto:rohitmahajan800737@gmail.com',           icon: '✉' },
];

const Contact = () => {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const titleRef    = useRef(null);
  const leftRef     = useRef(null);
  const formRef     = useRef(null);
  const successRef  = useRef(null);

  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: parseFloat(((centerY - y) / 10).toFixed(2)),
      y: parseFloat(((x - centerX) / 10).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: tagRef.current, start: 'top 85%' },
      });
      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.from(leftRef.current, {
        opacity: 0, x: -50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
      });
      gsap.from(formRef.current, {
        opacity: 0, x: 50, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!fields.name.trim())    e.name    = 'Name is required';
    if (!fields.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Invalid email address';
    if (!fields.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Shake animation
      gsap.from(formRef.current, {
        x: -10,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: 'none',
      });
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: fields.name, from_email: fields.email, message: fields.message },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFields({ name: '', email: '', message: '' });

      // Success animation
      gsap.from(successRef.current, {
        scale: 0.5, opacity: 0, duration: 0.6, ease: 'back.out(2)',
      });
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const onFocus = (e) => {
    gsap.to(e.target, { borderColor: 'rgba(124,58,237,0.6)', duration: 0.3 });
  };
  const onBlur = (e) => {
    gsap.to(e.target, { borderColor: 'rgba(255,255,255,0.08)', duration: 0.3 });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section="contact"
      className={`${styles.contact} section`}
      aria-label="Contact section"
    >
      {/* BG Elements */}
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <div className="container">
        <div className={styles.header}>
          <div ref={tagRef} className="section__tag">Get In Touch</div>
          <h2 ref={titleRef} className="section__title">
            Let's <span>Work Together</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left */}
          <div ref={leftRef} className={styles.left}>
            <p className="body-large">
              I'm currently open to new opportunities. Whether you have a project
              in mind or just want to connect, my inbox is always open!
            </p>

            {/* Contact Details */}
            <div className={styles.details}>
              {[
                { icon: '📧', label: 'Email',    value: 'rohitmahajan800737@gmail.com', href: 'mailto:rohitmahajan800737@gmail.com' },
                { icon: '📞', label: 'Phone',    value: '+91 8007370204',               href: 'tel:+918007370204' },
                { icon: '📍', label: 'Location', value: 'Surat, Gujarat, India',        href: null },
              ].map((d) => (
                <div key={d.label} className={styles.detailRow}>
                  <span className={styles.detailIcon} role="img" aria-label={d.label}>{d.icon}</span>
                  <div>
                    <p className={styles.detailLabel}>{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className={styles.detailValue} data-cursor="OPEN">
                        {d.value}
                      </a>
                    ) : (
                      <p className={styles.detailValue}>{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={s.label}
                  data-cursor={s.label.toUpperCase()}
                >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className={styles.formContainer}>
            <div 
              className={styles.formWrap}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className={styles.consoleGlow} />
              {status === 'success' ? (
              <div ref={successRef} className={styles.success} role="alert">
                <div className={styles.successIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  className={styles.successBtn}
                  onClick={() => setStatus('idle')}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                {/* Name */}
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Rohit Mahajan"
                    value={fields.name}
                    onChange={(e) => setFields({ ...fields, name: e.target.value })}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className={styles.error} role="alert">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="hello@example.com"
                    value={fields.email}
                    onChange={(e) => setFields({ ...fields, email: e.target.value })}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className={styles.error} role="alert">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>Your Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="I'd love to work with you on..."
                    value={fields.message}
                    onChange={(e) => setFields({ ...fields, message: e.target.value })}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    rows={6}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <p id="message-error" className={styles.error} role="alert">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === 'loading'}
                  id="contact-submit"
                >
                  {status === 'loading' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className={styles.errorGlobal} role="alert">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}
              </form>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
