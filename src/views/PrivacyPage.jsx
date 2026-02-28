import Link from 'next/link'
import LegalPageLayout, {
  LegalSection,
  LegalSubSection,
  LegalList,
  LegalHighlight,
  LegalTable,
} from '../components/LegalPageLayout'

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      badge="Privacy"
      title="Privacy Policy"
      subtitle="How GateFlux collects, uses, and protects your personal data in accordance with Indian and international privacy law."
      version="1.3"
      effectiveDate="28 Feb, 2026"
      lastReviewed="28 Feb, 2026"
      contactEmail="privacy@gateflux.co"
      contactLabel="Data protection enquiries:"
    >
      <p className="text-neutral-600 leading-relaxed mb-10 text-[15px]">
        GateFlux Pvt. Ltd. ("GateFlux", "we", "us") operates a governance-focused apartment
        management platform. We process personal data in accordance with the{' '}
        <strong>Digital Personal Data Protection Act, 2023 (India)</strong>, the Information
        Technology Act, 2000, and the GDPR (EU) 2016/679 where applicable.
      </p>

      <LegalSection number="1" title="Scope">
        <p>This Policy applies to all individuals who interact with the GateFlux Platform, including:</p>
        <LegalList items={[
          'Residents, Owners, and Tenants',
          'Committee members and Society Administrators',
          'Visitors whose data is logged at entry',
          'Website users and prospective customers',
        ]} />
      </LegalSection>

      <LegalSection number="2" title="Data Protection Roles">
        <LegalSubSection title="Under Indian Law (DPDP Act 2023)">
          <p>GateFlux acts as a <strong>Data Fiduciary</strong> for platform and website data.</p>
        </LegalSubSection>
        <LegalSubSection title="Under GDPR (where applicable)">
          <p>GateFlux may act as:</p>
          <LegalList items={[
            'Data Controller — for account and website data',
            'Data Processor — when processing resident data on behalf of a Society',
          ]} />
          <p>A Data Processing Addendum (DPA) is available upon request at privacy@gateflux.co.</p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection number="3" title="Categories of Personal Data">
        <LegalSubSection title="3.1 Identity & Contact Data">
          <LegalList items={[
            'Full name, email address, mobile number',
            'Apartment/unit number and role designation',
            'Profile image (optional)',
          ]} />
        </LegalSubSection>
        <LegalSubSection title="3.2 Financial & Governance Data">
          <LegalList items={[
            'Maintenance dues, ledger entries, and invoices',
            'Payment references and defaulter status',
            'Committee notices and governance records',
          ]} />
        </LegalSubSection>
        <LegalSubSection title="3.3 Visitor Data">
          <LegalList items={[
            'Visitor name and phone number',
            'Entry and exit timestamps',
            'Flat/unit visited',
          ]} />
        </LegalSubSection>
        <LegalSubSection title="3.4 Technical & Usage Data">
          <LegalList items={[
            'IP address, browser type, device information',
            'Login logs and session metadata',
          ]} />
        </LegalSubSection>
      </LegalSection>

      <LegalSection number="4" title="Legal Basis for Processing">
        <LegalSubSection title="4.1 India — DPDP Act 2023">
          <p>Processing is based on:</p>
          <LegalList items={[
            'Explicit consent obtained at account registration and visitor logging',
            'Legitimate governance use for housing society operations',
            'Legal compliance obligations under applicable Indian law',
          ]} />
          <p>Users may withdraw consent subject to lawful retention requirements.</p>
        </LegalSubSection>
        <LegalSubSection title="4.2 GDPR — EU Residents">
          <p>Where GDPR applies, we rely on:</p>
          <LegalList items={[
            'Article 6(1)(b) — Contractual necessity',
            'Article 6(1)(f) — Legitimate interests (security, fraud prevention)',
            'Article 6(1)(c) — Legal obligation',
            'Article 6(1)(a) — Consent (analytics cookies, optional tracking)',
          ]} />
        </LegalSubSection>
      </LegalSection>

      <LegalSection number="5" title="Consent Mechanisms">
        <p>Consent is obtained through:</p>
        <LegalList items={[
          'Registration checkbox acceptance at account creation',
          'Auto-renewal billing authorization at checkout',
          'Cookie consent banner for non-essential cookies',
          'Visitor data acknowledgment at the gate/entry point',
        ]} />
        <p>
          Consent records are logged with timestamp and policy version. Users may withdraw
          consent at any time by contacting{' '}
          <a href="mailto:privacy@gateflux.co" className="text-accent-600 hover:underline">
            privacy@gateflux.co
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="6" title="Purpose of Processing">
        <p>We process personal data for the following purposes:</p>
        <LegalList items={[
          'Society financial governance and ledger management',
          'Committee decision dashboards and reporting',
          'Defaulter tracking and notice generation',
          'Visitor management and physical access control',
          'Platform security and fraud detection',
          'Compliance with the Maharashtra Co-operative Societies Act and Model Bye-Laws',
          'Legal and regulatory compliance obligations',
        ]} />
        <LegalHighlight>
          We do not sell personal data to third parties.
        </LegalHighlight>
      </LegalSection>

      <LegalSection number="7" title="Data Retention">
        <LegalTable
          headers={['Data Category', 'Retention Period', 'Justification']}
          rows={[
            ['Financial Records', 'Up to 8 years', 'Taxation, audit, statutory accounting'],
            ['Visitor Logs', '12–24 months', 'Security review, dispute resolution'],
            ['Security & Login Logs', 'Up to 24 months', 'Fraud investigation'],
            ['Account Data', 'Subscription + 90 days', 'Service continuity'],
            ['Backup Data', 'Up to 180 days', 'Disaster recovery'],
          ]}
        />
        <p className="text-sm text-neutral-500 mt-3">
          Inactive accounts may be permanently deleted after 3 years in accordance with DPDP
          Draft Rules (2025), unless renewed consent or legal necessity applies. Data may be
          retained longer where required by law or pending regulatory proceedings.
        </p>
      </LegalSection>

      <LegalSection number="8" title="International Data Transfers">
        <p>Where personal data is transferred outside India or the European Union:</p>
        <LegalList items={[
          'Transfers comply with applicable data protection laws',
          'EU transfers rely on Standard Contractual Clauses (SCCs) or equivalent safeguards',
          'Primary data hosting occurs within India (AWS Mumbai region)',
          'Third-party vendors in the US or EU are covered by SCCs or lawful transfer mechanisms',
        ]} />
      </LegalSection>

      <LegalSection number="9" title="Security Measures">
        <p>GateFlux implements SOC 2-aligned security controls, including:</p>
        <LegalList items={[
          'Encryption in transit (TLS 1.2+)',
          'Encryption at rest (AES-256 where applicable)',
          'Role-based access controls (RBAC)',
          'Multi-factor authentication (where enabled)',
          'Audit logging and continuous monitoring',
          'Documented incident response procedures',
          'Vendor risk management and periodic security reviews',
        ]} />
        <p>No online system is completely secure. We will notify affected parties promptly in the event of a confirmed breach.</p>
      </LegalSection>

      <LegalSection number="10" title="Cookies & Tracking Technologies">
        <LegalSubSection title="10.1 Essential Cookies">
          <p>Required for authentication, session management, and security enforcement. Cannot be disabled.</p>
        </LegalSubSection>
        <LegalSubSection title="10.2 Analytics Cookies (If Enabled)">
          <p>Used for product improvement and usage analytics. Require explicit consent for EU residents and under DPDP.</p>
        </LegalSubSection>
        <p>
          See our{' '}
          <Link href="/cookies" className="text-accent-600 hover:underline">
            Cookie Policy
          </Link>{' '}
          for full details. Users may manage preferences via browser settings or the cookie banner.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Data Sharing">
        <p>We may share personal data with the following categories of recipients:</p>
        <LegalList items={[
          'Payment gateway providers (e.g., Razorpay or equivalent)',
          'Cloud hosting providers (e.g., AWS Mumbai region)',
          'SMS and email notification service providers',
          'Legal authorities where required by law',
        ]} />
        <p>
          All vendors are bound by contractual confidentiality obligations and data processing
          agreements. A subprocessor list is available upon request.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Data Subject Rights">
        <LegalSubSection title="Under Indian Law (DPDP Act)">
          <LegalList items={[
            'Right to access your personal data',
            'Right to correction of inaccurate data',
            'Right to withdraw consent',
            'Right to erasure (subject to lawful retention)',
            'Right to nominate a person to exercise rights on your behalf',
          ]} />
        </LegalSubSection>
        <LegalSubSection title="Under GDPR">
          <LegalList items={[
            'Access (Art. 15), Rectification (Art. 16), Erasure (Art. 17)',
            'Restriction of processing (Art. 18)',
            'Data portability (Art. 20)',
            'Right to object (Art. 21)',
            'Right to lodge a complaint with your supervisory authority',
          ]} />
        </LegalSubSection>
        <p>
          Submit requests to{' '}
          <a href="mailto:privacy@gateflux.co" className="text-accent-600 hover:underline">
            privacy@gateflux.co
          </a>
          . We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection number="13" title="Data Breach Notification">
        <LegalSubSection title="Under DPDP Act">
          <p>The Ministry of Electronics &amp; Information Technology (MeitY) shall be notified within 72 hours where required. Affected individuals shall be notified where high risk to rights and freedoms exists.</p>
        </LegalSubSection>
        <LegalSubSection title="Under GDPR">
          <p>The relevant Supervisory Authority shall be notified within 72 hours of awareness where required. Affected data subjects shall be informed where high risk exists.</p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection number="14" title="Children's Data">
        <p>
          The Platform is not directed to individuals under 18 years of age. We do not
          knowingly collect children's personal data without appropriate lawful authorization.
        </p>
      </LegalSection>

      <LegalSection number="15" title="Updates to This Policy">
        <p>Material changes will be communicated through:</p>
        <LegalList items={[
          'Email notification to Society administrators',
          'Prominent notice within the Platform interface',
        ]} />
        <p>Continued use of the Platform after the effective date constitutes acceptance of the updated Policy.</p>
      </LegalSection>

      <LegalSection number="16" title="Version History">
        <LegalTable
          headers={['Version', 'Date', 'Description']}
          rows={[
            ['1.0', '28 Feb, 2026', 'Initial release'],
            ['1.1', '28 Feb, 2026', 'Added GDPR & SOC 2 alignment'],
            ['1.2', '28 Feb, 2026', 'Strengthened consent and retention disclosures'],
            ['1.3', '28 Feb, 2026', 'Added DPDP retention nuance, breach timelines, Maharashtra compliance, transfer safeguards'],
          ]}
        />
      </LegalSection>

      <LegalSection number="17" title="Contact Information">
        <p>Data Protection Contact</p>
        <p>
          GateFlux Pvt. Ltd., Godavari Homes, Quthbullapur, Hyderabad 500067, Telangana, India<br />
          Email:{' '}
          <a href="mailto:privacy@gateflux.co" className="text-accent-600 hover:underline">
            privacy@gateflux.co
          </a>
          <br />
          Response Timeline: Within 30 days
        </p>
        <p>
          Grievance Officer:{' '}
          <a href="mailto:grievance@gateflux.co" className="text-accent-600 hover:underline">
            grievance@gateflux.co
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
