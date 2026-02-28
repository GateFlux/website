import LegalPageLayout, {
  LegalSection,
  LegalSubSection,
  LegalList,
  LegalHighlight,
  LegalTable,
} from '../components/LegalPageLayout'

export default function CookiesPage() {
  return (
    <LegalPageLayout
      badge="Privacy"
      title="Cookie Policy"
      subtitle="How GateFlux uses cookies and similar tracking technologies on its Platform and website."
      version="1.2"
      effectiveDate="28 Feb, 2026"
      lastReviewed="28 Feb, 2026"
      contactEmail="privacy@gateflux.co"
      contactLabel="Cookie consent questions:"
    >
      <p className="text-neutral-600 leading-relaxed mb-10 text-[15px]">
        GateFlux Pvt. Ltd. ("GateFlux", "we", "us") uses cookies and similar tracking
        technologies on the GateFlux Platform and website. This Policy complies with the
        Digital Personal Data Protection Act, 2023 (India), the Information Technology
        Act, 2000, and the GDPR (EU) 2016/679 where applicable.
      </p>

      <LegalSection number="1" title="What Are Cookies?">
        <p>
          Cookies are small text files placed on your device when you access a website or
          web-based platform. Some cookies may collect or store information that qualifies
          as personal data, including:
        </p>
        <LegalList items={[
          'IP addresses and device identifiers',
          'Browser type and version',
          'Usage behaviour and session data',
        ]} />
        <p>Under Indian law, such data may constitute "digital personal data."</p>
      </LegalSection>

      <LegalSection number="2" title="Categories of Cookies Used">
        <LegalSubSection title="2.1 Strictly Necessary Cookies">
          <p><strong>Purpose:</strong> Authentication, session management, security enforcement, and load balancing.</p>
          <p>
            <strong>Legal Basis:</strong> DPDP — Legitimate use necessary for service provision.
            GDPR — Article 6(1)(b) Contractual necessity / Article 6(1)(f) Legitimate interests.
          </p>
          <LegalHighlight>
            These cookies do not require prior consent and cannot be disabled without impairing core platform functionality.
          </LegalHighlight>
        </LegalSubSection>

        <LegalSubSection title="2.2 Functional Cookies">
          <p><strong>Purpose:</strong> Remember user preferences and improve usability.</p>
          <p>
            <strong>Legal Basis:</strong> DPDP — Explicit consent. GDPR — Article 6(1)(a) Consent.
          </p>
          <p>Disabled by default until you opt in via the cookie banner.</p>
        </LegalSubSection>

        <LegalSubSection title="2.3 Analytics Cookies (If Enabled)">
          <p><strong>Purpose:</strong> Usage analytics, performance monitoring, and feature improvement.</p>
          <p>
            <strong>Legal Basis:</strong> DPDP — Explicit, unambiguous consent prior to placement.
            GDPR — Article 6(1)(a) Consent.
          </p>
          <p>Disabled by default until consent is explicitly given.</p>
        </LegalSubSection>

        <LegalSubSection title="2.4 Third-Party Cookies">
          <p>GateFlux may use third-party service providers that set cookies, including:</p>
          <LegalList items={[
            'Google Analytics (if enabled by user consent)',
            'Cloudflare (security and performance services)',
            'Payment processors (e.g., Razorpay or similar providers)',
          ]} />
          <p>
            Such third parties are bound by Data Processing Agreements (DPAs), contractual
            confidentiality obligations, and Standard Contractual Clauses where applicable
            for EU data transfers.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection number="3" title="Consent Requirements — India (DPDP)">
        <p>Under the Digital Personal Data Protection Act, 2023:</p>
        <LegalList items={[
          'Non-essential cookies are not deployed until explicit consent is obtained',
          'Consent must be free, specific, informed, and unambiguous',
          'Pre-ticked boxes are not used',
          'Silence or inactivity does not constitute consent',
        ]} />
        <p>You must actively select one of the following:</p>
        <LegalList items={[
          '"Accept All" — enables all cookie categories',
          '"Reject Non-Essential" — only essential cookies are placed',
          'Granular category preferences via the cookie settings panel',
        ]} />
        <p>Consent records are securely logged with timestamp and policy version.</p>
      </LegalSection>

      <LegalSection number="4" title="Cookie Banner Implementation">
        <p>GateFlux implements the following consent controls:</p>
        <LegalList items={[
          'First-visit consent banner with clear category descriptions',
          'Equal visual prominence for Accept and Reject options',
          'Granular consent controls per cookie category',
          'Blocking of non-essential scripts prior to consent',
        ]} />
        <p>Consent logs may include timestamp, preferences selected, policy version, and device/browser metadata where legally permissible.</p>
      </LegalSection>

      <LegalSection number="5" title="Withdrawal of Consent">
        <p>You may withdraw cookie consent at any time by:</p>
        <LegalList items={[
          'Accessing cookie settings via the website footer',
          'Adjusting your browser settings to block or delete cookies',
          'Contacting us at privacy@gateflux.co',
        ]} />
        <p>
          Withdrawal stops future placement of non-essential cookies. Withdrawal is as
          straightforward as granting consent.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Data Retention for Cookie Data">
        <p>Cookie-derived data is retained only as long as necessary for:</p>
        <LegalList items={[
          'Analytics processing and performance monitoring',
          'Security monitoring and fraud prevention',
          'Legal compliance obligations',
        ]} />
        <p>
          Inactive cookie identifiers may be deleted after 3 years in line with DPDP Draft
          Rules (2025), unless renewed consent applies.
        </p>
      </LegalSection>

      <LegalSection number="7" title="International Transfers">
        <p>Where third-party providers are located outside India:</p>
        <LegalList items={[
          'Transfers are governed by contractual safeguards and DPAs',
          'EU transfers rely on Standard Contractual Clauses (SCCs)',
          'Primary hosting occurs within India (e.g., AWS Mumbai region)',
        ]} />
      </LegalSection>

      <LegalSection number="8" title="Legal Basis Summary">
        <LegalTable
          headers={['Cookie Type', 'India (DPDP)', 'GDPR']}
          rows={[
            ['Essential', 'Legitimate use', 'Contractual necessity / Legitimate interest'],
            ['Functional', 'Explicit consent', 'Consent'],
            ['Analytics', 'Explicit consent', 'Consent'],
            ['Third-Party', 'Explicit consent', 'Consent'],
          ]}
        />
      </LegalSection>

      <LegalSection number="9" title="Updates to This Policy">
        <p>Material updates will be notified via:</p>
        <LegalList items={[
          'A website banner displayed at your next visit',
          'A notification within the Platform interface',
        ]} />
        <p>Continued use of the Platform after updates constitutes acceptance.</p>
      </LegalSection>

      <LegalSection number="10" title="Version History">
        <LegalTable
          headers={['Version', 'Date', 'Description']}
          rows={[
            ['1.0', '28 Feb, 2026', 'Initial release'],
            ['1.1', '28 Feb, 2026', 'Added DPDP compliance & consent logging'],
            ['1.2', '28 Feb, 2026', 'Added third-party examples, formalised consent controls, version history'],
          ]}
        />
      </LegalSection>

      <LegalSection number="11" title="Contact Information">
        <p>
          GateFlux Pvt. Ltd., Godavari Homes, Quthbullapur, Hyderabad 500067, Telangana, India<br />
          Email:{' '}
          <a href="mailto:privacy@gateflux.co" className="text-accent-600 hover:underline">
            privacy@gateflux.co
          </a>
          <br />
          Response timeline: Within 30 days
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
