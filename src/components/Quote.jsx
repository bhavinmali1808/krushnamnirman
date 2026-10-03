import { useEffect, useState } from "react";
import { CONTACT, PROPERTY_TYPES, QUOTE_IMAGE, QUOTE_SERVICES } from "../data";
import { ImgReveal, Reveal } from "./ui";

const EMPTY = { name: "", phone: "", email: "", city: "", property: "2 BHK", services: [], message: "" };

export default function Quote({ preset }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState({ text: "", type: "" });

  // Pre-fill from "Request Price" / space tiles clicked elsewhere on the page
  useEffect(() => {
    if (!preset) return;
    setForm((f) => ({
      ...f,
      property: preset.property ?? f.property,
      services: preset.service && !f.services.includes(preset.service) ? [...f.services, preset.service] : f.services,
    }));
  }, [preset]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggleService = (value) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(value) ? f.services.filter((s) => s !== value) : [...f.services, value],
    }));

  const validate = () => {
    const phone = form.phone.replace(/\D/g, "").slice(-10);
    const errs = {
      name: !form.name.trim(),
      phone: !/^[6-9]\d{9}$/.test(phone),
      city: !form.city.trim(),
      email: form.email.trim() !== "" && !/^\S+@\S+\.\S+$/.test(form.email.trim()),
    };
    setErrors(errs);
    return Object.values(errs).some(Boolean) ? null : phone;
  };

  const buildMessage = (phone) => {
    const lines = [
      "Hello Krushnamnirman, I'd like a free quote for my interiors.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: +91 ${phone}`,
    ];
    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
    lines.push(`City: ${form.city.trim()}`, `Property: ${form.property}`);
    if (form.services.length) lines.push(`Looking for: ${form.services.join(", ")}`);
    if (form.message.trim()) lines.push(`Details: ${form.message.trim()}`);
    return lines.join("\n");
  };

  const send = (via) => {
    const phone = validate();
    if (!phone) {
      setNote({ text: "Please enter your name, a valid 10-digit mobile number and city.", type: "error" });
      return;
    }
    const text = buildMessage(phone);
    if (via === "email") {
      const subject = `Free quote request — ${form.name.trim()}, ${form.city.trim()}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setNote({ text: "Your email app has opened with the details — just press send.", type: "success" });
    } else {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      setNote({ text: "WhatsApp has opened with your details — just press send.", type: "success" });
    }
    setForm(EMPTY);
    setErrors({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send("whatsapp");
  };

  const field = (key, label, props = {}) => (
    <div className={`field${errors[key] ? " invalid" : ""}`}>
      <input id={key} name={key} placeholder=" " value={form[key]} onChange={set(key)} aria-invalid={!!errors[key]} {...props} />
      <label htmlFor={key}>{label}</label>
    </div>
  );

  return (
    <section className="quote" id="quote">
      <ImgReveal className="quote-media" src={QUOTE_IMAGE.img} alt={QUOTE_IMAGE.alt} parallax>
        <div className="quote-media-text">
          <p className="label light">Free consultation</p>
          <p className="quote-big">Your dream space<br />starts with a conversation.</p>
        </div>
      </ImgReveal>

      <div className="quote-form-wrap">
        <Reveal as="p" className="label">Get free quote</Reveal>
        <Reveal as="h2" className="title" delay={0.05}>Tell us about<br />your space</Reveal>
        <Reveal as="p" className="quote-sub" delay={0.1}>
          Share a few details and our designer will call you back within 24 hours. No cost, no obligation.
        </Reveal>

        <form className="quote-form" onSubmit={onSubmit} noValidate>
          <Reveal className="field-row">
            {field("name", "Full name *", { type: "text", autoComplete: "name", required: true })}
            {field("phone", "Mobile number *", { type: "tel", inputMode: "numeric", autoComplete: "tel", required: true })}
          </Reveal>
          <Reveal className="field-row" delay={0.05}>
            {field("email", "Email", { type: "email", autoComplete: "email" })}
            {field("city", "City *", { type: "text", autoComplete: "address-level2", required: true })}
          </Reveal>
          <Reveal className="field" delay={0.1}>
            <select id="property" name="property" value={form.property} onChange={set("property")}>
              {PROPERTY_TYPES.map((p) => <option key={p}>{p}</option>)}
            </select>
            <label htmlFor="property" className="static">Property type</label>
          </Reveal>

          <Reveal as="fieldset" className="chips" delay={0.15}>
            <legend>What do you need?</legend>
            {QUOTE_SERVICES.map(([value, label]) => (
              <label key={value}>
                <input type="checkbox" checked={form.services.includes(value)} onChange={() => toggleService(value)} />
                <span>{label}</span>
              </label>
            ))}
          </Reveal>

          <Reveal className="field" delay={0.2}>
            <textarea id="message" name="message" rows={3} placeholder=" " value={form.message} onChange={set("message")} />
            <label htmlFor="message">Tell us more (optional)</label>
          </Reveal>

          <Reveal className="form-actions" delay={0.25}>
            <button type="submit" className="btn btn-dark">Send on WhatsApp</button>
            <button type="button" className="btn btn-line" onClick={() => send("email")}>Send by Email</button>
          </Reveal>
          <p className={`form-note ${note.type}`} role="status" aria-live="polite">{note.text}</p>
        </form>
      </div>
    </section>
  );
}
