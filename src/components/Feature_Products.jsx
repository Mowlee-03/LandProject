import { Bath, BedDouble, Maximize } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ALLPOST } from '../Store/Api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(ALLPOST)

        // Sorting by createdAt (latest first) and taking only top 3 properties
        const sortedProperties = response.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)

        setProperties(sortedProperties)
      } catch (err) {
        setError('Failed to load properties. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Latest Properties</h2>

        {loading && <p className="text-center text-muted-foreground">Loading properties...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && properties.length === 0 && (
          <p className="text-center text-muted-foreground">No properties available.</p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            !error &&
            properties.map((property) => (
              <div
                key={property.id}
                className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={property.image?.[0] || '/default-property.jpg'} // Fallback image
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground capitalize">
                  {property.type}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{property.title}</h3>
                  <p className="mb-4 text-muted-foreground capitalize">{property.location}</p>
                  <div className="mb-4 flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4" />
                      <span>{property.bedroom} beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathroom} baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">₹{property.price}</span>
                    <button
                      className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
