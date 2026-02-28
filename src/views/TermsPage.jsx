import Link from 'next/link'
import LegalPageLayout, {
  LegalSection,
  LegalList,
} from '../components/LegalPageLayout'

export default function TermsPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Terms of Use"
      subtitle="These Terms govern your access to and use of the GateFlux Platform. By using the Platform, you agree to be legally bound by these Terms."
      version="1.0"
      effectiveDate="28 Feb, 2026"
      contactEmail="legal@gateflux.co"
      contactLabel="Legal questions? Reach our team at"
    >
      <LegalSection number="1" title="Nature of Service">
        <p>GateFlux provides governance-focused software tools for:</p>
        <LegalList items={[
          'Maintenance management',
          'Financial reporting and committee dashboards',
          'Defaulter tracking and notice generation',
          'Visitor management and access control',
        ]} />
        <p>
          GateFlux does not act as a financial institution, provide legal or tax advice,
          or assume responsibility for internal society decisions.
        </p>
      </LegalSection>

      <LegalSection number="2" title="Subscription & Billing">
        <p>Subscriptions are governed by:</p>
        <LegalList items={[
          'Society Subscription & Governance Agreement',
          'Plan Cancellation & Refund Policy (Version 1.0, 28 Feb, 2026)',
        ]} />
        <p>
          All refunds, cooling-off rights, and pro-rata adjustments shall be governed
          exclusively by the{' '}
          <Link href="/refund-policy" className="text-accent-600 hover:underline">
            Refund Policy
          </Link>
          . In case of conflict, the Refund Policy shall prevail regarding refund mechanics.
        </p>
      </LegalSection>

      <LegalSection number="3" title="User Accounts">
        <p>Users must:</p>
        <LegalList items={[
          'Provide accurate and complete information',
          'Maintain strict confidentiality of login credentials',
          'Notify the Company immediately of any unauthorized access',
        ]} />
        <p>
          The Society administrator is responsible for managing user access within
          the Platform, including provisioning and revoking accounts.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Intellectual Property">
        <p>
          All rights, title, and interest in and to the Platform — including software,
          source code, algorithms, dashboards, branding, and documentation — are and
          remain the exclusive property of GateFlux Pvt. Ltd.
        </p>
        <p>
          No ownership rights are transferred to users or societies. Users receive a
          limited, non-exclusive, non-transferable license during the active subscription
          term only.
        </p>
      </LegalSection>

      <LegalSection number="5" title="User Content & License">
        <p>
          Society retains full ownership of data uploaded to the Platform. Society grants
          GateFlux a limited license to host, process, store, display, and transmit such
          data solely for the purpose of providing the contracted services.
        </p>
        <p>GateFlux does not claim ownership over Society data.</p>
      </LegalSection>

      <LegalSection number="6" title="Acceptable Use Policy">
        <p>Users shall not:</p>
        <LegalList items={[
          'Upload unlawful, defamatory, or fraudulent content',
          'Attempt unauthorized access to any part of the Platform',
          'Interfere with platform security, integrity, or availability',
          'Reverse engineer, decompile, or copy software',
          'Use the Platform for non-governance commercial resale',
        ]} />
        <p>
          Violation of this policy may result in immediate suspension or termination
          of access at GateFlux's discretion.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Suspension & Termination Rights">
        <p>GateFlux may suspend or terminate access if:</p>
        <LegalList items={[
          'Payment is overdue beyond the grace period',
          'A material breach of these Terms occurs',
          'Fraudulent or unlawful activity is detected',
          'Continuing the service poses a security risk',
        ]} />
        <p>
          Termination shall not relieve payment obligations accrued prior to the
          termination date. Refunds, where applicable, shall follow the{' '}
          <Link href="/refund-policy" className="text-accent-600 hover:underline">
            Refund Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="8" title="Third-Party Integrations">
        <p>
          The Platform may integrate with third-party services including payment gateways,
          cloud hosting providers, and communication services.
        </p>
        <p>
          GateFlux is not responsible for third-party outages, policy changes, or data
          practices. Use of third-party services is subject to their respective terms
          and conditions.
        </p>
      </LegalSection>

      <LegalSection number="9" title="Data Protection">
        <p>
          Data processing is governed by the{' '}
          <Link href="/privacy" className="text-accent-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          and a Data Processing Addendum (DPA) available upon request. Society acts as
          Data Controller. GateFlux acts as Data Processor for society-held personal data.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, GateFlux's total liability
          shall not exceed subscription fees paid in the preceding 12 months.
        </p>
        <p>GateFlux shall not be liable for:</p>
        <LegalList items={[
          'Internal society governance disputes',
          'Incorrect data entry or misuse by users',
          'Regulatory non-compliance by the Society',
          'Indirect, incidental, or consequential damages',
        ]} />
      </LegalSection>

      <LegalSection number="11" title="Indemnification">
        <p>
          Society agrees to indemnify and hold harmless GateFlux against all claims,
          damages, losses, and expenses arising from:
        </p>
        <LegalList items={[
          'Governance disputes within the Society',
          'Defaulter classification or notice disputes',
          'Violations of applicable housing or cooperative law',
          'Misuse of the Platform by society members or administrators',
        ]} />
      </LegalSection>

      <LegalSection number="12" title="Force Majeure">
        <p>
          GateFlux shall not be liable for any failure or delay in performance due to
          circumstances beyond its reasonable control, including natural disasters,
          government actions, telecommunications failures, internet outages, and
          infrastructure failures outside GateFlux's direct control.
        </p>
      </LegalSection>

      <LegalSection number="13" title="Governing Law & Jurisdiction">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of
          India. Jurisdiction for disputes shall lie with the Courts of Mumbai,
          Maharashtra or the Courts of New Delhi, India. GateFlux may elect either
          jurisdiction at its discretion.
        </p>
      </LegalSection>

      <LegalSection number="14" title="Modifications">
        <p>
          GateFlux reserves the right to update these Terms at any time. Material changes
          will be communicated through platform notifications or email to Society
          administrators. Continued use of the Platform after changes constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection number="15" title="Entire Agreement">
        <p>These Terms, together with:</p>
        <LegalList items={[
          'Society Subscription & Governance Agreement',
          'Service Level Agreement (SLA)',
          'Plan Cancellation & Refund Policy',
          'Privacy Policy',
          'Data Processing Addendum (DPA)',
        ]} />
        <p>constitute the entire agreement between the parties.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
