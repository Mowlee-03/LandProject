import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Send, Instagram, MessageCircle } from 'lucide-react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitStatus('submitting')
      
      // Using fetch to send form data to an email service (example with EmailJS)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          template_id: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          user_id: 'YOUR_USER_ID', // Replace with your EmailJS user ID
          template_params: {
            from_name: formState.name,
            from_email: formState.email,
            subject: formState.subject,
            message: formState.message,
            to_email: 'your@email.com' // Replace with your email address
          }
        })
      })

      if (!response.ok) throw new Error('Failed to send email')

      setSubmitStatus('success')
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setSubmitStatus(null), 3000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
      setTimeout(() => setSubmitStatus(null), 3000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: [
        { text: '+1 (123) 456-7890', href: 'tel:+11234567890' },
        { text: '+1 (123) 456-7891', href: 'tel:+11234567891' }
      ],
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        { text: 'info@realestate.com', href: 'mailto:info@realestate.com' },
        { text: 'support@realestate.com', href: 'mailto:support@realestate.com' }
      ],
    },
  ]

  const socialPlatforms = [
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/yourusername'
    },
    {
      icon: WhatsAppIcon,
      name: 'WhatsApp',
      href: 'https://wa.me/+917530081966' // Replace with your WhatsApp number
    }
  ] 

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Get in touch with our team of real estate experts. We're here to help you with any questions or concerns.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 rounded-lg border border-border bg-card p-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-card-foreground">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <a 
                          key={i} 
                          href={detail.href}
                          className="block text-muted-foreground hover:text-primary transition-colors"
                        >
                          {detail.text}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-card-foreground">Follow Us</h3>
              <div className="flex gap-4">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <motion.a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-full bg-primary/10 p-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border border-border bg-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="mb-2 block text-sm font-medium text-card-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="mb-2 block text-sm font-medium text-card-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help?"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="mb-2 block text-sm font-medium text-card-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message..."
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={submitStatus === 'submitting'}
                whileHover={{ scale: submitStatus === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: submitStatus === 'submitting' ? 1 : 0.98 }}
                className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 font-medium
                  ${submitStatus === 'submitting' 
                    ? 'bg-primary/70 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90'} 
                  text-primary-foreground`}
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4" />
              </motion.button>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-600"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-red-600"
                >
                  Error sending message. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  )
}