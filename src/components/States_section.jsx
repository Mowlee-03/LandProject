import { useEffect, useState, useRef } from 'react'
import { Home, Users, Award } from 'lucide-react'

const stats = [
  {
    icon: Home,
    value: 1500,
    label: 'Properties Sold',
  },
  {
    icon: Users,
    value: 2000,
    label: 'Happy Clients',
  },
  {
    icon: Award,
    value: 50,
    label: 'Years Experience',
  },
]

export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="bg-muted py-16">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center"
              >
                <Icon className="mb-4 h-12 w-12" />
                <div className="text-4xl font-bold">
                  {hasAnimated ? stat.value : 0}+
                </div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

