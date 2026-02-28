import LegalPageLayout, {
  LegalSection,
  LegalList,
  LegalHighlight,
  LegalStep,
} from '../components/LegalPageLayout'

export default function DataDeletionPage() {
  return (
    <LegalPageLayout
      badge="Privacy"
      title="User Data Deletion Policy"
      subtitle="Your right to request deletion of personal data processed by GateFlux, and how we handle each request."
      version="1.0"
      effectiveDate="28 Feb, 2026"
      contactEmail="privacy@gateflux.co"
      contactLabel="Submit a deletion request to"
    >
      <p className="text-neutral-600 leading-relaxed mb-10 text-[15px]">
        This Policy is aligned with the Digital Personal Data Protection Act, 2023 (India),
        applicable Draft Rules (2025), and the GDPR (where applicable). It governs requests
        for deletion of personal data processed by GateFlux Pvt. Ltd. through the GateFlux Platform.
      </p>

      {/* Timeline highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { label: '72 Hours', sub: 'Acknowledgement of deletion request' },
          { label: '30 Days', sub: 'Processing from identity verification' },
          { label: '3 Years', sub: 'Inactive account auto-deletion threshold' },
        ].map(({ label, sub }) => (
          <div key={label} className="bg-primary-50 border border-primary-100 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-900">{label}</p>
            <p className="text-sm text-neutral-600 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <LegalSection number="1" title="Scope">
        <p>This Policy applies to all Platform users, including:</p>
        <LegalList items={[
          'Residents, Owners, and Tenants',
          'Committee members and Society administrators',
        ]} />
        <p>
          Societies act as Data Controllers. GateFlux Pvt. Ltd. acts as Data Processor
          (or Controller where applicable).
        </p>
      </LegalSection>

      <LegalSection number="2" title="Right to Deletion">
        <p>Individuals may request deletion of their Personal Data where:</p>
        <LegalList items={[
          'Consent has been withdrawn',
          'Data is no longer necessary for the original purpose',
          'Processing was unlawful',
          'The legal retention period has expired',
        ]} />
        <LegalHighlight>
          Deletion requests must be submitted to privacy@gateflux.co or through the
          designated in-app interface (if available).
        </LegalHighlight>
      </LegalSection>

      <LegalSection number="3" title="Deletion Timelines">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-primary-900 mb-2">3.1 Acknowledgement</h4>
            <p>
              Deletion requests shall be acknowledged within <strong>72 hours</strong> of
              receipt. Acknowledgement will confirm:
            </p>
            <LegalList items={[
              'Receipt of your request',
              'Identity verification requirement and method',
              'Estimated processing timeline',
            ]} />
          </div>
          <div>
            <h4 className="font-semibold text-primary-900 mb-2">3.2 Processing Timeline</h4>
            <p>
              Deletion requests shall be processed within <strong>30 days</strong> from
              successful identity verification. Where legally permissible, deletion may
              occur earlier. If additional time is required due to complexity, you will
              be informed with justification.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection number="4" title="Inactive Account Deletion">
        <p>In accordance with DPDP Draft Rules (2025):</p>
        <LegalList items={[
          'Inactive user profiles may be automatically deleted after 3 years of inactivity',
          'Unless renewed consent or a legal retention requirement applies',
        ]} />
        <p>
          <strong>"Inactive"</strong> means no login activity and no active society
          membership during the 3-year period.
        </p>
        <p>
          Society-level accounts are excluded from automatic deletion while their
          subscription remains active.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Step-by-Step Deletion Process">
        <div className="mt-4">
          <LegalStep number="1" title="Request Submission">
            <p>Submit your deletion request via email to privacy@gateflux.co or through the designated in-app interface. Include your registered email and a brief description of the data you wish to have deleted.</p>
          </LegalStep>
          <LegalStep number="2" title="Identity Verification">
            <p>We verify your identity through one of the following:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Registered email confirmation</li>
              <li>OTP validation to your registered mobile number</li>
              <li>Administrator confirmation (for resident deletion requests)</li>
            </ul>
          </LegalStep>
          <LegalStep number="3" title="Legal & Retention Check">
            <p>We evaluate whether any data must be retained due to:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Financial record obligations (e.g., audit compliance)</li>
              <li>Pending legal disputes or regulatory proceedings</li>
              <li>Statutory retention requirements</li>
            </ul>
          </LegalStep>
          <LegalStep number="4" title="Deletion or Anonymisation">
            <p>Where permitted, we will:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Remove personal identifiers from active systems; or</li>
              <li>Anonymise data so it can no longer identify you; or</li>
              <li>Execute full deletion from all active systems</li>
            </ul>
          </LegalStep>
          <LegalStep number="5" title="Confirmation Notice">
            <p>You will receive written confirmation (by email) once deletion or anonymisation is complete, specifying what was deleted and any data retained with justification.</p>
          </LegalStep>
        </div>
      </LegalSection>

      <LegalSection number="6" title="Society-Level Termination Deletion">
        <p>Upon subscription termination by a Society:</p>
        <LegalList items={[
          'Data export is available for 90 days after termination',
          'Active data is deleted within 30 days after the export window closes',
          'Backup data is securely expired or overwritten within 180 days',
        ]} />
        <p>Written confirmation of deletion may be requested at any time.</p>
      </LegalSection>

      <LegalSection number="7" title="Data That Cannot Be Immediately Deleted">
        <p>Certain data may be retained where required for:</p>
        <LegalList items={[
          'Tax compliance and statutory accounting (up to 8 years)',
          'Statutory audit requirements',
          'Ongoing legal proceedings or regulatory investigations',
          'Fraud prevention investigations',
        ]} />
        <p>
          Such retained data shall be restricted from operational use and stored securely
          until the retention obligation expires.
        </p>
      </LegalSection>

      <LegalSection number="8" title="Appeal Process">
        <p>
          If a deletion request is denied (fully or partially), you may submit an appeal
          within <strong>15 days</strong> of receiving the denial notice.
        </p>
        <p>Appeals shall be reviewed and responded to within 30 days.</p>
        <p>
          Escalate to our Grievance Officer at{' '}
          <a href="mailto:grievance@gateflux.co" className="text-accent-600 hover:underline">
            grievance@gateflux.co
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="9" title="Backup & System Logs">
        <p>
          Deletion from active systems does not immediately remove data from secure backups.
        </p>
        <LegalList items={[
          'Backup retention maximum: 180 days',
          'Data is not actively processed during the backup retention period',
          'Secure overwrite is executed at expiry',
        ]} />
      </LegalSection>

      <LegalSection number="10" title="Fraud & Abuse Safeguards">
        <p>Deletion requests may be denied or delayed if:</p>
        <LegalList items={[
          'Fraud is suspected or under investigation',
          'A legal hold or regulatory freeze applies',
          'Identity cannot be satisfactorily verified',
        ]} />
      </LegalSection>

      <LegalSection number="11" title="Cross-Border Considerations">
        <p>Where GDPR applies, erasure requests are handled under Article 17. Processing timelines are aligned with GDPR requirements.</p>
      </LegalSection>

      <LegalSection number="12" title="Contact Information">
        <p>
          <strong>Data Protection Contact</strong><br />
          GateFlux Pvt. Ltd., Godavari Homes, Quthbullapur, Hyderabad 500067, Telangana, India<br />
          Email:{' '}
          <a href="mailto:privacy@gateflux.co" className="text-accent-600 hover:underline">
            privacy@gateflux.co
          </a>
          <br />
          Acknowledgement: Within 72 hours<br />
          Processing: Within 30 days
        </p>
        <p className="mt-3">
          <strong>Grievance Officer:</strong>{' '}
          <a href="mailto:grievance@gateflux.co" className="text-accent-600 hover:underline">
            grievance@gateflux.co
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
