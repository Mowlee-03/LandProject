import { useState,useEffect ,useRef} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle ,Phone,SmilePlus} from 'lucide-react'
import axios from 'axios'
import { CREATEUSER } from '../../Store/Api'
import { Loader } from '../ui/Loader'


export default function SignupForm({ onToggleView }) {
  const [formData, setFormData] = useState({
    username: "",
    phone_number:"",
    email: "",
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [apiMessage, setApiMessage] = useState({ type: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const passwordRef = useRef(null)
  const passwordRequirements = [
    { label: 'At least 8 characters', regex: /.{8,}/ },
    { label: 'At least one uppercase letter', regex: /[A-Z]/ },
    { label: 'At least one lowercase letter', regex: /[a-z]/ },
    { label: 'At least one number', regex: /[0-9]/ },
    { label: 'At least one special character', regex: /[!@#$%^&*(),.?":{}|<>]/ }
  ]

  const checkPasswordRequirement = (requirement) => {
    return requirement.regex.test(formData.password)
  }


  useEffect(() => {
    let redirectTimer
    if (apiMessage.type === 'success') {
      // Wait 2 seconds before showing loader
      const loaderTimer = setTimeout(() => {
        setIsLoading(true)
        // Wait 1.5 more seconds before redirecting
        redirectTimer = setTimeout(() => {
          onToggleView()
        }, 1500)
      }, 2000)

      return () => {
        clearTimeout(loaderTimer)
        clearTimeout(redirectTimer)
      }
    }
  }, [apiMessage.type, onToggleView])



  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset previous errors
    setError('')
    setApiMessage({ type: '', message: '' })

    // Validate password match
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const userdata=await axios.post(CREATEUSER,formData)
      // console.log(userdata);
      if (!userdata.ok) {
        setApiMessage({type:"error",message:userdata.data.message})
      }
      setApiMessage({type:"success",message:userdata.data.message})

    } catch (error) {
      console.log(error.response.data);
      setApiMessage({type:"error",message:error.response.data.message})
    }

  }


  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Redirecting to login...
          </motion.p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Create an account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to get started
        </p>
      </div>

      {/* API Message */}
      <AnimatePresence>
        {apiMessage.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-md p-3 ${
              apiMessage.type === 'error' 
                ? 'bg-destructive/10 text-destructive' 
                : 'bg-green-500/10 text-green-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {apiMessage.type === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <SmilePlus className="h-4 w-4" />
              )}
              <p className="text-sm">{apiMessage.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <div className="relative">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your name"
              required
            />
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Phonenumber-input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <div className="relative">
            <input
              type="number"
              value={formData.phone_number}
              onChange={(e) => {
                const value = e.target.value;
                // Check if the value length is less than or equal to 10
                if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                  setFormData({ ...formData, phone_number: value });
                }
              }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your 10 digit phone number"
              required
            />
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

         {/* Password Input with Requirements Popover */}
         <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                setError('')
              }}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Create a password"
              required
            />
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>

            {/* Password Requirements Popover */}
            <AnimatePresence>
              {showPasswordRequirements && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full z-10 mt-2 rounded-md border border-border bg-card p-4 shadow-lg"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-card-foreground">
                      Password must contain:
                    </h4>
                    <ul className="space-y-1">
                      {passwordRequirements.map((requirement, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-2 text-sm ${
                            checkPasswordRequirement(requirement)
                              ? 'text-green-500'
                              : 'text-muted-foreground'
                          }`}
                        >
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${
                              checkPasswordRequirement(requirement)
                                ? 'bg-green-500'
                                : 'bg-muted-foreground'
                            }`}
                          />
                          {requirement.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setError('')
              }}
              className={`w-full rounded-md border bg-background px-3 py-2 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? 'border-destructive' : 'border-input'
              }`}
              placeholder="Confirm your password"
              required
            />
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create account
        </motion.button>
      </form>

      {/* Toggle View */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <button
          onClick={onToggleView}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

