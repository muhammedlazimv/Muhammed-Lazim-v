import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.031 2C6.516 2 2.03 6.486 2.03 12c0 2.164.693 4.168 1.869 5.803L2 22l4.336-1.849C7.892 21.144 9.904 22 12.031 22c5.516 0 10.002-4.486 10.002-10s-4.486-10-10.002-10zm5.834 14.172c-.244.686-1.42 1.314-1.968 1.378-.516.062-1.189.091-3.645-.924-3.136-1.296-5.143-4.483-5.299-4.692-.153-.209-1.267-1.688-1.267-3.218 0-1.53.799-2.285 1.082-2.597.284-.312.623-.39.83-.39.208 0 .416.002.598.012.193.01.452-.073.708.54.262.625.897 2.191.975 2.35.078.158.13.344.026.552-.104.208-.156.338-.312.52-.156.182-.328.406-.468.545-.157.156-.32.327-.138.64.182.312.81 1.336 1.737 2.162 1.192 1.062 2.196 1.391 2.508 1.547.312.156.494.13.676-.078.182-.208.78-1.04 1.014-1.378.234-.338.468-.286.78-.182.312.104 1.975.931 2.313 1.1.338.169.563.252.645.39.083.138.083.802-.161 1.488z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showLinkedInNote, setShowLinkedInNote] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopiedEmail(false);
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) next.subject = 'Please add a subject.';
    if (form.message.trim().length < 10) {
      next.message = 'Please enter a message of at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const snapshot = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    window.setTimeout(() => {
      setSubmitting(false);
      setSubmittedData(snapshot);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 450);
  };

  const buildMailtoHref = (data: FormState) => {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-display text-sm font-semibold text-blue-600 dark:text-blue-400">
          Contact
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          Get In Touch
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Reach out directly via email, phone, WhatsApp, or use the message form below.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Direct Contact Details & Social Channels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 lg:col-span-5"
        >
          {/* Email Card */}
          <div className="glass-card flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 p-5 shadow-md shadow-slate-900/[0.03] transition-colors hover:border-blue-400/60 dark:border-slate-800/80 dark:shadow-black/25 dark:hover:border-blue-400/50">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex min-w-0 flex-1 items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
                <p className="truncate font-display text-sm font-semibold text-slate-950 sm:text-base dark:text-white">
                  {PERSONAL_INFO.email}
                </p>
              </div>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              title="Copy email address"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-400 dark:hover:text-blue-300"
            >
              {copiedEmail ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Phone Card */}
          <a
            href={PERSONAL_INFO.phoneHref}
            className="glass-card group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 p-5 shadow-md shadow-slate-900/[0.03] transition-colors hover:border-purple-400/60 dark:border-slate-800/80 dark:shadow-black/25 dark:hover:border-purple-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</p>
                <p className="font-mono text-sm font-semibold tabular-nums text-slate-950 sm:text-base dark:text-white">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400" />
          </a>

          {/* WhatsApp Direct Link Card */}
          <a
            href={PERSONAL_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 p-5 shadow-md shadow-slate-900/[0.03] transition-colors hover:border-emerald-500/60 dark:border-slate-800/80 dark:shadow-black/25 dark:hover:border-emerald-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">WhatsApp</p>
                <p className="font-display text-sm font-semibold text-slate-950 sm:text-base dark:text-white">
                  Chat on WhatsApp
                </p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
          </a>

          {/* Location Card */}
          <div className="glass-card flex items-center gap-4 rounded-2xl border border-slate-200/80 p-5 shadow-md shadow-slate-900/[0.03] dark:border-slate-800/80 dark:shadow-black/25">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</p>
              <p className="font-display text-sm font-semibold text-slate-950 sm:text-base dark:text-white">
                {PERSONAL_INFO.location}
              </p>
            </div>
          </div>

          {/* Social Media Bar: LinkedIn, WhatsApp, Email */}
          <div className="glass-card rounded-2xl border border-slate-200/80 p-5 shadow-md shadow-slate-900/[0.03] dark:border-slate-800/80 dark:shadow-black/25">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Connect via Social Channels
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowLinkedInNote((prev) => !prev)}
                aria-expanded={showLinkedInNote}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-medium text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:text-blue-400 whitespace-nowrap"
              >
                <LinkedInIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>LinkedIn</span>
              </button>

              <a
                href={PERSONAL_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-medium text-slate-800 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400 whitespace-nowrap"
              >
                <WhatsAppIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-medium text-slate-800 transition-colors hover:border-purple-500 hover:text-purple-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-purple-400 dark:hover:text-purple-400 whitespace-nowrap"
              >
                <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>Email</span>
              </a>
            </div>

            <AnimatePresence>
              {showLinkedInNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3.5 border-t border-slate-200 pt-3.5 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    <p>
                      My direct LinkedIn profile link can be shared upon request. Send a quick note to connect:
                    </p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                        'LinkedIn Connection Request'
                      )}`}
                      className="mt-2 inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400"
                    >
                      <span>Request LinkedIn link via Email</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column: Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl border border-slate-200/80 p-6 shadow-xl shadow-slate-900/[0.04] sm:p-8 lg:col-span-7 dark:border-slate-800/80 dark:shadow-black/30"
        >
          <AnimatePresence mode="wait">
            {submittedData ? (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col items-start py-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-950 dark:text-white">
                  Message Ready to Send
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{submittedData.name}</span>. Your message regarding{' '}
                  <span className="font-semibold text-slate-900 dark:text-white">“{submittedData.subject}”</span> has been recorded. You can also launch your email app to deliver it directly to{' '}
                  <span className="font-medium text-blue-600 dark:text-blue-400">{PERSONAL_INFO.email}</span>.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={buildMailtoHref(submittedData)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Open in Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  Send a Message
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                  Fill out the form below and I will get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)}
                        className="w-full rounded-xl border border-slate-300/90 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-purple-400 dark:focus:ring-purple-500/20"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="w-full rounded-xl border border-slate-300/90 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-purple-400 dark:focus:ring-purple-500/20"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, subject: e.target.value }));
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                      }}
                      placeholder="What would you like to discuss?"
                      aria-invalid={Boolean(errors.subject)}
                      className="w-full rounded-xl border border-slate-300/90 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-purple-400 dark:focus:ring-purple-500/20"
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Write your message here..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full resize-y rounded-xl border border-slate-300/90 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-purple-400 dark:focus:ring-purple-500/20"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-shadow hover:shadow-xl hover:shadow-purple-600/30 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070B19]"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
