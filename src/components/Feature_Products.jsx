import { Bath, BedDouble, Maximize } from 'lucide-react'

const properties = [
  {
    id: 1,
    title: 'Modern Villa',
    location: 'Beverly Hills, CA',
    price: '$2,500,000',
    image: '/placeholder.svg?height=400&width=600',
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: 'For Sale'
  },
  {
    id: 2,
    title: 'Luxury Apartment',
    location: 'Manhattan, NY',
    price: '$1,800,000',
    image: '/placeholder.svg?height=400&width=600',
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: 'For Sale'
  },
  {
    id: 3,
    title: 'Seaside Cottage',
    location: 'Malibu, CA',
    price: '$3,200,000',
    image: '/placeholder.svg?height=400&width=600',
    beds: 5,
    baths: 4,
    sqft: 3800,
    type: 'For Rent'
  }
]

export default function FeaturedProperties() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Featured Properties</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                {property.type}
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{property.title}</h3>
                <p className="mb-4 text-muted-foreground">{property.location}</p>
                <div className="mb-4 flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    <span>{property.beds} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.baths} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{property.price}</span>
                  <button className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
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

