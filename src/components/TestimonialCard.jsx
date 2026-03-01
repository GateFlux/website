import { Star } from 'lucide-react'
import Image from 'next/image'

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  rating = 5,
  image,
}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-primary-100">
      {/* Rating */}
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < rating ? 'text-amber-400 fill-amber-400' : 'text-primary-200'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-primary-700 text-sm leading-relaxed mb-5">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        {image ? (
          <Image
            src={image}
            alt={author}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <span className="text-primary-700 font-semibold">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-primary-900 text-sm">{author}</p>
          <p className="text-xs text-primary-600">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  )
}
