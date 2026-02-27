'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

export function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-primary-100 last:border-b-0">
      <button
        type="button"
        className="flex items-center justify-between w-full py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-primary-900">{question}</span>
        <ChevronDown
          className={clsx(
            'h-5 w-5 text-primary-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-primary-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="divide-y divide-primary-100 border-t border-primary-100">
      {items.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  )
}
