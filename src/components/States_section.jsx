import { useEffect, useState, useRef } from 'react'
import { Home, Users, Award, HeartHandshake, Globe } from 'lucide-react'
import axios from 'axios'
import { GET_PROPERTY_COUNT } from '../Store/Api'



export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)
  const [stats, setStats] = useState([
    {
      icon: HeartHandshake,
      value: 0,
      label: 'Properties Sold',
    },
    {
      icon: Home,
      value: 0,
      label: 'Available Properties',
    },
    {
      icon: Globe,
      value: 0,
      label: 'Total Properties',
    },
    {
      icon: Award,
      value: 5,
      label: 'Years Experience',
    },
  ])

  useEffect(() => {
    const fetchPropertyCounts = async () => {
      try {
        const response = await axios.get(GET_PROPERTY_COUNT)
        // Extract data
        const { soldCount, availableCount, totalCount } = response.data.data

        // Update stats array without modifying icons/labels
        setStats((prevStats) => [
          { ...prevStats[0], value: soldCount },        // Properties Sold
          { ...prevStats[1], value: availableCount },   // Available Properties
          { ...prevStats[2], value: totalCount },       // Total Properties (or use years of experience if different)
          prevStats[3],
        ])
      } catch (error) {
        console.error('Error fetching property counts:', error)
      }
    }

    fetchPropertyCounts()
  }, [])

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
        <div className="grid gap-8 md:grid-cols-4">
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

