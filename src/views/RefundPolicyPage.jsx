import Link from 'next/link'
import LegalPageLayout, {
  LegalSection,
  LegalSubSection,
  LegalList,
  LegalHighlight,
  LegalTable,
} from '../components/LegalPageLayout'
import config from '../lib/config'

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      badge="Billing"
      title="Plan Cancellation & Refund Policy"
      subtitle="Your rights regarding subscription cancellation, refunds, and billing practices for the GateFlux Platform."
      version="1.0"
      effectiveDate="28 Feb, 2026"
      contactEmail={config.email.billing}
      contactLabel="Billing or refund queries:"
    >
      <p className="text-neutral-600 leading-relaxed mb-10 text-[15px]">
        This Policy is designed to comply with the Consumer Protection Act, 2019, the
        Consumer Protection (E-Commerce) Rules, 2020, and the Indian Contract Act, 1872.
      </p>

      {/* Key highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { label: '7-Day', sub: 'Cooling-off period for new subscriptions' },
          { label: '7–15 Days', sub: 'Refund processing timeline' },
          { label: 'Pro-Rata', sub: 'Refund for unused subscription days' },
        ].map(({ label, sub }) => (
          <div key={label} className="bg-primary-50 border border-primary-100 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-900">{label}</p>
            <p className="text-sm text-neutral-600 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <LegalSection number="1" title="Subscription Model">
        <p>GateFlux operates on a prepaid subscription model. Subscription fees:</p>
        <LegalList items={[
          'Are charged in advance',
          'Are exclusive of applicable taxes',
          'Are based on the selected plan and flat/unit count',
          'May include discounts for longer billing terms',
        ]} />
      </LegalSection>

      <LegalSection number="2" title="Cancellation by Society">
        <p>
          A duly authorised Society administrator may cancel the subscription at any time via:
        </p>
        <LegalList items={[
          'The administrator dashboard (Settings → Subscription)',
          'Written request to billing@gateflux.co',
        ]} />
        <p>Cancellation becomes effective on the date confirmed by GateFlux in writing.</p>
      </LegalSection>

      <LegalSection number="3" title="Refund Policy">
        <LegalSubSection title="3.0 Cooling-Off Period">
          <p>
            New subscriptions may be cancelled within <strong>7 days</strong> of activation
            for a <strong>full refund</strong>, excluding non-recoverable payment gateway
            processing fees.
          </p>
          <LegalHighlight>
            Cooling-off eligibility applies only to first-time subscriptions and does not
            apply to renewals.
          </LegalHighlight>
          <p>Refunds under this section shall be processed within <strong>7–15 business days</strong>.</p>
        </LegalSubSection>

        <LegalSubSection title="3.1 Pro-Rata Refund After Cooling-Off Period">
          <p>
            If cancellation occurs after the 7-day cooling-off period, the Society shall be
            eligible for a pro-rata refund of the unused prepaid subscription period.
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-4 my-3">
            <p className="text-sm font-semibold text-primary-900 mb-1">Refund Calculation Formula</p>
            <p className="font-mono text-sm text-primary-800 bg-primary-50 rounded px-3 py-2 border border-primary-100 inline-block">
              (Unused Days ÷ Total Subscription Days) × Subscription Fee Paid
            </p>
          </div>
        </LegalSubSection>

        <LegalSubSection title="3.2 Administrative Deductions">
          <p>GateFlux may deduct from the refund amount:</p>
          <LegalList items={[
            'Non-recoverable payment gateway fees',
            'Applicable taxes already remitted to authorities',
            'Reasonable administrative charges (not exceeding 10% of unused value)',
          ]} />
        </LegalSubSection>

        <LegalSubSection title="3.3 No Refund Scenarios">
          <p>Refunds shall not apply where:</p>
          <LegalList items={[
            'Termination occurs due to material breach by the Society',
            'Fraudulent or unlawful use is detected',
            'Outstanding dues remain unpaid',
            'Suspension arises from non-payment',
          ]} />
        </LegalSubSection>
      </LegalSection>

      <LegalSection number="4" title="Committee Change or Governance Transition">
        <p>
          Where cancellation occurs due to committee elections, a change in authorised
          signatories, or a governance transition, the Society remains entitled to a
          pro-rata refund of the unused subscription period, subject to Section 3.
        </p>
        <p>
          A change in management does not invalidate the original subscription agreement
          but may trigger cancellation rights under this Policy.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Refund Timeline">
        <p>
          Approved refunds shall be processed within <strong>7–15 business days</strong> from
          confirmation of cancellation. Refunds shall be issued through the original payment
          method where feasible.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Post-Cancellation Access">
        <p>Upon cancellation:</p>
        <LegalList items={[
          'Access may continue until the requested termination date; or',
          'Be terminated immediately upon written instruction from the Society',
        ]} />
        <p>
          Data retention and deletion shall follow the{' '}
          <Link href="/data-deletion" className="text-accent-600 hover:underline">
            User Data Deletion Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="7" title="Non-Payment">
        <p>If payment fails:</p>
        <LegalList items={[
          'A grace period of up to 15 days may apply',
          'Access may be suspended after the grace period expires',
          'No refund shall apply for suspension due to non-payment',
        ]} />
      </LegalSection>

      <LegalSection number="8" title="Exceptional Circumstances">
        <p>GateFlux may provide discretionary refunds in cases of:</p>
        <LegalList items={[
          'Billing errors or duplicate payments',
          'Extended service outage exceeding SLA commitments',
        ]} />
      </LegalSection>

      <LegalSection number="9" title="Policy Updates">
        <p>
          GateFlux reserves the right to update this Policy. Updated versions will be
          published on the Platform. Continued use after changes constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Version History">
        <LegalTable
          headers={['Version', 'Date', 'Changes']}
          rows={[
            ['1.0', '28 Feb, 2026', 'Initial release with cooling-off, pro-rata refunds, and committee protections'],
          ]}
        />
      </LegalSection>
    </LegalPageLayout>
  )
}
