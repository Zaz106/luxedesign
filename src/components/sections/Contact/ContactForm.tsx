"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ContactForm.module.css";
import { 
  ZAFlag, USFlag, GBFlag, AUFlag, CAFlag, DEFlag 
} from "../../ui/Icons";

const countries = [
  { code: "ZA", dial: "+27", flag: <ZAFlag /> },
  { code: "US", dial: "+1", flag: <USFlag /> },
  { code: "GB", dial: "+44", flag: <GBFlag /> },
  { code: "AU", dial: "+61", flag: <AUFlag /> },
  { code: "CA", dial: "+1", flag: <CAFlag /> },
];

const ContactFormContent = () => {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    serviceType: ""
  });

  const serviceOptions = [
    { id: "website", label: "Website" },
    { id: "app", label: "App" },
    { id: "hosting", label: "Hosting" },
  ];

  useEffect(() => {
    if (emailParam) {
      setFormValues(prev => ({ ...prev, email: emailParam }));
    }
  }, [emailParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (e.target.name === "phone") {
        let digits = value.replace(/\D/g, "");
        if (selectedCountry.code === "ZA") {
           // Remove leading 0 if present (common in local format e.g. 082...)
           if (digits.length > 9 && digits.startsWith('0')) {
             digits = digits.substring(1);
           }
           // ZA: XX XXX XXXX (9 digits)
           value = digits.substring(0, 9).replace(/^(\d{2})(\d{0,3})(\d{0,4}).*/, (_, p1, p2, p3) => {
             let res = p1;
             if (p2) res += " " + p2;
             if (p3) res += " " + p3;
             return res;
           });
        } else if (selectedCountry.code === "US" || selectedCountry.code === "CA") {
           // Remove leading 1 if present (country code)
           if (digits.length > 10 && digits.startsWith('1')) {
             digits = digits.substring(1);
           }
           // US/CA: XXX XXX XXXX (10 digits)
           value = digits.substring(0, 10).replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/, (_, p1, p2, p3) => {
             let res = p1;
             if (p2) res += " " + p2;
             if (p3) res += " " + p3;
             return res;
           });
        } else {
             // Generic: groups of 3
             value = digits.replace(/(\d{3})(?=\d)/g, "$1 ");
        }
    }

    setFormValues({ ...formValues, [e.target.name]: value });
  };

  const handleServiceSelect = (id: string) => {
    setFormValues({ ...formValues, serviceType: id });
  };

  useEffect(() => {
    const getCountryCode = async () => {
      try {
        const cached = localStorage.getItem("user_country_code");
        if (cached) {
          const country = countries.find((c) => c.code === cached);
          if (country) {
            setSelectedCountry(country);
            return;
          }
        }

        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Failed to fetch country");
        
        const data = await res.json();
        const countryCode = data.country_code;
        const country = countries.find((c) => c.code === countryCode);
        
        if (country) {
          setSelectedCountry(country);
          localStorage.setItem("user_country_code", countryCode);
        }
      } catch (err) {
        // Silently fail to default
      }
    };

    getCountryCode();
  }, []);

  const getPhonePlaceholder = (code: string) => {
    switch(code) {
      case "ZA": return "00 000 0000";
      case "US": return "000 000 0000";
      case "CA": return "000 000 0000";
      default: return "000 000 000";
    }
  };

  return (
    <section className={styles.contactFormSection} id="contact-form">
      <div className={styles.formContainer}>
        <div className={styles.visualSide}>
          <video 
            className={styles.video} 
            autoPlay 
            loop 
            muted 
            playsInline
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
          >
            <source
              src="/images/contact-us-video.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className={styles.formSide}>
          <h2 className={styles.formTitle}>Let’s Get In Touch</h2>
          <p className={styles.formSubtitle}>
            Or just reach out to{" "}
            <a href="mailto:luxe@designs.co.za" className={styles.emailLink}>
              luxe@designs.co.za
            </a>
          </p>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.row}>
              <div className={styles.field}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    required
                  />
                  <label className={styles.label}>First Name</label>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    required
                  />
                  <label className={styles.label}>Last Name</label>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder=" "
                  required
                />
                <label className={styles.label}>Email Address</label>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.phoneInputContainer}>
                <div
                  className={styles.countrySelector}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className={styles.flagIcon}>{selectedCountry.flag}</div>
                  <span className={styles.countryCode}>
                    {selectedCountry.dial}
                  </span>
                  {isDropdownOpen && (
                    <div className={styles.countryDropdown}>
                      {countries.map((c) => (
                        <div
                          key={c.code}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCountry(c);
                            setIsDropdownOpen(false);
                            // Reset phone on country change to prevent format confusion
                            setFormValues(prev => ({ ...prev, phone: "" }));
                          }}
                          className={styles.countryOption}
                        >
                          <div className={styles.optionFlag}>{c.flag}</div>
                          <span>{c.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.inputWrapper} style={{ flex: 1, border: 'none' }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    className={styles.phoneInput}
                    placeholder={getPhonePlaceholder(selectedCountry.code)}
                  />
                  <label className={styles.label}>Phone Number</label>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.serviceSelection}>
                 <p className={styles.serviceLabel}>Type of Inquiry</p>
                 <div className={styles.serviceButtons}>
                    {serviceOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.serviceBtn} ${formValues.serviceType === option.id ? styles.selected : ""}`}
                        onClick={() => handleServiceSelect(option.id)}
                      >
                         {option.label}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.inputWrapper}>
                <textarea
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder=" "
                ></textarea>
                <label className={styles.label}>Message</label>
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormContent />
    </Suspense>
  );
};

export default ContactForm;
