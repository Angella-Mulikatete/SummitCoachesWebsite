

import { Bus, Users, MapPin } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Bus,
      title: 'Modern Fleet',
      description: 'Travel in our state-of-the-art coaches equipped with WiFi, power outlets, and reclining seats.'
    },
    {
      icon: Users,
      title: 'Expert Drivers',
      description: 'Our drivers are professionally trained, experienced, and dedicated to your safety.'
    },
    {
      icon: MapPin,
      title: 'Scenic Routes',
      description: 'We pick the most beautiful routes so the journey is just as memorable as the destination.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Summit?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-sky-50 transition-colors"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}









