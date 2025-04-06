import { useState, useEffect, useRef, useContext } from 'react'
import { Moon, Sun, Heart, LogOut, User, ChevronDown, Home, Building, BookOpen, Wrench, PhoneCallIcon } from 'lucide-react'
import { useTheme } from './theme-provider'
import AuthModal from './auth/Authmodal'
import { UserContext } from '../Store/Provider/Userprovider'
import LogoutModal from './auth/LogoutModal'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openAuthmodal } from '../Store/slices/authSlice'
import PeopleIcon from '@mui/icons-material/People';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import RoofingIcon from '@mui/icons-material/Roofing';
export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dropdownRef = useRef(null)
  const userMenuRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const anywhereopenAuthmodal = useSelector((data) => { return data.auth.authmodal })
  
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    if (anywhereopenAuthmodal) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [anywhereopenAuthmodal]);

  useEffect(() => {
    if (!showAuthModal) {
      dispatch(openAuthmodal(false));
    }
  }, [showAuthModal, dispatch]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowUserMenu(false)
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = async () => {
    // Simulate some delay for the loading animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    logout()
    setShowLogoutModal(false)
  }

  function favorite() {
    setShowUserMenu(false)
    navigate("/favorites")
  }

  const isActive = (path) => {
    return location.pathname === path ? "text-primary" : "text-foreground"
  }

  return (
    <>
      {/* Top Navbar - Always visible */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Brand Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl md:text-2xl font-bold text-foreground">RealEstate</span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:gap-6">
              <Link to="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/properties" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Properties
              </Link>
              <Link to="/services" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Services
              </Link>
              <Link to="/contact" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-foreground hover:bg-muted"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* User Menu Button (Mobile & Desktop) */}
            {user ? (
              <div className="relative flex" ref={dropdownRef}>
                <button
                        onClick={favorite}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        <Heart  className="h-4 w-4 fill-red-500 stroke-red-500" />
                        <span className='max-md:hidden'>Favorites</span>
                      </button>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-foreground hover:bg-muted"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user.username || user.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-border bg-background shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-1">
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Signed in as <span className="font-medium text-foreground">{user.email}</span>
                      </div>
                      <div className="h-px bg-border" />
                      
                      <div className="h-px bg-border" />
                      <button
                        onClick={handleLogoutClick}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-muted"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile Only */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background md:hidden">
        <div className="grid h-16 grid-cols-4">
          <Link 
            to="/"
            className={`flex flex-col items-center justify-center ${isActive('/')}`}
          >
            <RoofingIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            to="/properties"
            className={`flex flex-col items-center justify-center ${isActive('/properties')}`}
          >
            <AddLocationAltIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Properties</span>
          </Link>
         
          <Link 
            to="/services"
            className={`flex flex-col items-center justify-center ${isActive('/services')}`}
          >
            <PeopleIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Services</span>
          </Link>
          <Link 
            to="/contact"
            className={`flex flex-col items-center justify-center ${isActive('/blog')}`}
          >
            <PhoneCallIcon className="h-5 w-5" />
            <span className="text-xs mt-1">contact</span>
          </Link>
        </div>
      </div>


      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}