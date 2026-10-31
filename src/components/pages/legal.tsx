"use client";

import { useState } from "react";
import {
  Cookie,
  Eye,
  FileText,
  Scale,
  ScrollText,
} from "lucide-react";
import { useRoute } from "@/lib/router";
import { FIRM } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "privacy", label: "Privacy Policy (POPIA)", icon: Eye },
  { id: "paia", label: "PAIA Manual", icon: FileText },
  { id: "cookies", label: "Cookie Policy", icon: Cookie },
  { id: "terms", label: "Website Terms", icon: ScrollText },
  { id: "lpc", label: "LPC Disclosures", icon: Scale },
] as const;

type TabId = (typeof TABS)[number]["id"];

function H({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-[19px] font-semibold text-navy-900 first:mt-0">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3.5 text-[14px] leading-[1.85] text-navy-900/80">{children}</p>
  );
}

function L({ items }: { items: string[] }) {
  return (
    <ul className="mt-3.5 space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-navy-900/80">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function PrivacyPolicy() {
  return (
    <div>
      <H>1. Who we are</H>
      <P>
        {FIRM.name} (“the firm”, “we”, “us”) is a firm of attorneys incorporated in
        South Africa, with offices at {FIRM.address.line1}, {FIRM.address.line2},{" "}
        {FIRM.address.city} {FIRM.address.postal}. We are the responsible party for
        personal information processed through this website and our practice, as
        defined in the Protection of Personal Information Act 4 of 2013 (“POPIA”).
        You can reach us at {FIRM.email} or {FIRM.phone} for any privacy question.
      </P>
      <H>2. What we collect and why</H>
      <L
        items={[
          "Enquiry and booking details (name, email, telephone, organisation, and the non-confidential summary you provide) — to respond to you, route your enquiry to the correct practice lead, and conduct conflict screening before any mandate.",
          "Consent records — to demonstrate, as required, when and how consent was obtained.",
          "Website analytics (only where you consent) — to understand which content is useful, in aggregate and anonymised where feasible.",
          "Job application and succession enquiry details — solely for recruitment or merger discussions, and only as long as necessary.",
        ]}
      />
      <P>
        We ask you, at every intake point, not to transmit confidential case
        documents before conflict screening and a signed mandate. Information
        received prematurely may need to be disclosed to a prospective client we
        already act for, to protect both parties.
      </P>
      <H>3. Lawful basis</H>
      <P>
        We process personal information on the bases of consent (forms, analytics,
        newsletters), legitimate purpose (responding to enquiries, operating the
        practice, legal and regulatory obligations under the Legal Practice Council
        framework), and where applicable the conclusion and performance of a mandate.
      </P>
      <H>4. Sharing and storage</H>
      <P>
        Personal information is stored on secured systems with access limited to
        the practitioners and staff who need it. We do not sell personal
        information. We share it only with service providers bound by confidentiality
        (for example hosting and email infrastructure), with regulators or courts
        where legally required, and with counsel engaged on your matter.
      </P>
      <H>5. Your rights</H>
      <P>
        Under POPIA you may request access to, correction of, or deletion of your
        personal information; object to processing; withdraw consent; and lodge a
        complaint with the Information Regulator. Requests can be sent to{" "}
        {FIRM.email}. We respond within the statutory periods.
      </P>
      <H>6. Security and retention</H>
      <P>
        We apply technical and organisational measures appropriate to the risk —
        including access controls, encryption in transit, and least-privilege
        access. Retention periods follow our file retention policy and professional
        obligations; website enquiry data is retained for as long as necessary to
        action the enquiry and comply with statutory record-keeping.
      </P>
      <H>7. Changes</H>
      <P>
        This notice may be updated from time to time. The current version is always
        published on this page with its effective date.
      </P>
      <P>
        <em>
          Effective date: 26 October 2026. Final wording to be confirmed by the
          firm's compliance officer before go-live.
        </em>
      </P>
    </div>
  );
}

function PaiaManual() {
  return (
    <div>
      <H>1. Purpose of this manual</H>
      <P>
        This Information Manual is published under section 51 of the Promotion of
        Access to Information Act 2 of 2000 (“PAIA”). It describes the records held
        by {FIRM.name}, how to request access to them, and the fees and timelines
        that apply.
      </P>
      <H>2. The information officer</H>
      <P>
        The firm's information officer is its director. Requests may be submitted
        to {FIRM.email} marked “PAIA request”, or delivered to the physical office
        at {FIRM.address.line1}, {FIRM.address.line2}, {FIRM.address.city}.
      </P>
      <H>3. Categories of records held</H>
      <L
        items={[
          "Statutory and corporate records: registration documents, LPC practising records, B-BBEE verification certificates, tax and compliance records.",
          "Client mandate records: engagement letters, conflict screening records, correspondence, matter files (protected by legal privilege and confidentiality).",
          "Financial records: trust account records, invoices and fee records, audited trust statements.",
          "Operational records: policies (privacy, information security, retention), this manual, website content.",
          "Personnel records: employment contracts, performance and training records (confidential).",
        ]}
      />
      <H>4. How to request access</H>
      <P>
        Complete the prescribed PAIA Form A (available from the Department of
        Justice or on request from us), detailing the record sought and the right
        you wish to exercise or protect. We will acknowledge your request and
        respond within 30 days, advising of any extension, fee payable, or grounds
        for refusal under chapter 4 of PAIA.
      </P>
      <H>5. Fees</H>
      <P>
        The prescribed request fee and reproduction fees apply as published in the
        PAIA regulations from time to time. Where access is to a record containing
        your own personal information, no request fee is payable for the first
        prescribed hour of search.
      </P>
      <H>6. Availability</H>
      <P>
        This manual is available for inspection at our office, on this website, and
        on request by email at no charge.
      </P>
      <P>
        <em>
          This summary is provided for website publication; the full manual remains
          the authoritative version and will be confirmed by the firm before go-live.
        </em>
      </P>
    </div>
  );
}

function CookiePolicy() {
  return (
    <div>
      <H>1. What cookies are</H>
      <P>
        Cookies are small text files placed on your device when you visit a
        website. They help a site function, remember preferences, and — where you
        consent — help measure how the site is used.
      </P>
      <H>2. What we use</H>
      <L
        items={[
          "Strictly necessary — security, form handling and cookie-preference storage. These cannot be switched off.",
          "Analytics (consent-gated) — aggregate usage statistics to improve content and performance. Off until you accept.",
          "Marketing (consent-gated) — remarketing and campaign measurement, off by default and only enabled with your consent.",
        ]}
      />
      <H>3. Managing your preferences</H>
      <P>
        Use the “Manage” option on the cookie banner to change your choices at any
        time. You may also clear cookies through your browser settings; note that
        blocking strictly necessary cookies may affect site functionality such as
        form submission.
      </P>
      <H>4. POPIA</H>
      <P>
        Our use of non-essential cookies is consent-based under POPIA, and consent
        records (the fact and time of your choice, not your browsing behaviour) are
        retained to demonstrate compliance.
      </P>
    </div>
  );
}

function WebsiteTerms() {
  return (
    <div>
      <H>1. Use of this website</H>
      <P>
        This website is operated by {FIRM.name}. By using it you accept these
        terms. If you do not accept them, please discontinue use. The site is
        intended for residents of and matters connected to South Africa.
      </P>
      <H>2. No legal advice</H>
      <P>
        Content on this website — including insights and representative matter
        profiles — is general information and does not constitute legal advice or
        create an attorney-client relationship. No mandate exists until conflict
        screening is completed and a written engagement letter is signed.
      </P>
      <H>3. Confidentiality</H>
      <P>
        Do not send confidential documents through this website. Information
        submitted before conflict screening may need to be shared with a prospective
        client we already act for. The firm accepts no liability for premature
        disclosure of material sent in breach of this term.
      </P>
      <H>4. Intellectual property</H>
      <P>
        This website — including its design, text, imagery, graphics, source
        code and the Kgariya crest — is protected by copyright under the
        Copyright Act 98 of 1978 of the Republic of South Africa and is owned
        by or licensed to the firm. Copying, reproducing, adapting or
        distributing any part of this website without the firm's prior written
        consent is prohibited and may give rise to civil claims and criminal
        liability under South African law. The design and build of this site
        are credited to Carter Digitals.
      </P>
      <H>5. Liability</H>
      <P>
        The site is provided “as is”. To the extent permitted by law, the firm is
        not liable for any loss arising from use of, or reliance on, the website or
        its content, or from unavailability or errors.
      </P>
      <H>6. Governing law</H>
      <P>
        These terms are governed by the laws of the Republic of South Africa. Any
        dispute is subject to the jurisdiction of the South African courts.
      </P>
    </div>
  );
}

function LpcDisclosures() {
  return (
    <div>
      <H>1. Firm particulars</H>
      <P>
        {FIRM.name} (referred to as “Kgariya Inc.”) is a firm of attorneys,
        notaries and conveyancers duly registered and in good standing with the
        Legal Practice Council (“LPC”) of South Africa, with its principal office
        at {FIRM.address.line1}, {FIRM.address.line2}, {FIRM.address.city}{" "}
        {FIRM.address.postal}. Practice and fidelity fund certificate numbers are
        displayed at the office and available on request.
      </P>
      <H>2. Directors / partners</H>
      <P>
        The firm's sole director and practitioner is its Founding Director, an
        admitted attorney of the High Court of South Africa holding a current
        practising certificate. (Full names and practice number to be published
        here exactly as registered with the LPC, per the firm's confirmation
        before go-live.)
      </P>
      <H>3. Regulatory compliance</H>
      <L
        items={[
          "The firm operates in compliance with the LPC Code of Conduct, including rules on trust account management, auditing and practice operations.",
          "Marketing content on this website is prepared to comply with the Code's advertising rules: no misleading claims, no guaranteed outcomes, and anonymised matter profiles that carry no client names or confidential details.",
          "Representative matter statements describe the nature of work performed, not outcomes promised. Prior results do not guarantee similar outcomes.",
          "Confirmed B-BBEE status with formal verification certificates available on request.",
        ]}
      />
      <H>4. Fees and complaints</H>
      <P>
        Fee models (hourly, fixed-fee, retainer) are agreed in writing before work
        commences. If you are unhappy with our service or an account, please raise
        it with the director in the first instance; you may also approach the LPC
        in terms of its complaints procedures.
      </P>
      <H>5. Contact</H>
      <P>
        {FIRM.phone} · {FIRM.email} · {FIRM.web}
      </P>
      <P>
        <em>
          Final LPC disclosure wording, registration numbers and director names
          will be confirmed by the firm before go-live, as required by the Code of
          Conduct.
        </em>
      </P>
    </div>
  );
}

export function LegalPage() {
  const route = useRoute();
  const initial = (route.split("?")[1] || "privacy") as TabId;
  const [tab, setTab] = useState<TabId>(
    TABS.some((t) => t.id === initial) ? initial : "privacy"
  );

  // Derived-during-render: follow the route query when it changes
  const [lastInitial, setLastInitial] = useState(initial);
  if (lastInitial !== initial) {
    setLastInitial(initial);
    if (TABS.some((t) => t.id === initial)) setTab(initial);
  }

  return (
    <div>
      <PageHero
        eyebrow="Legal & compliance"
        title="Disclosures, in the open."
        lead="Privacy under POPIA, access under PAIA, cookie governance, website terms, and the firm disclosures required of attorneys' websites under the LPC Code of Conduct."
        image="/images/library.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Legal" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Tabs */}
          <Reveal>
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Legal sections"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12.5px] font-bold transition-all duration-300",
                    tab === t.id
                      ? "border-navy-950 bg-navy-950 text-gold-300 shadow-luxe"
                      : "border-navy-100 bg-white text-navy-800 hover:border-gold-400/60 hover:bg-ivory"
                  )}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.05}>
            <div className="mt-10 rounded-[2rem] border border-navy-100 bg-ivory p-8 sm:p-12">
              <div className="mx-auto max-w-3xl">
                {tab === "privacy" && <PrivacyPolicy />}
                {tab === "paia" && <PaiaManual />}
                {tab === "cookies" && <CookiePolicy />}
                {tab === "terms" && <WebsiteTerms />}
                {tab === "lpc" && <LpcDisclosures />}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
