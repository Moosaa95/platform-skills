import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Newsletter Section */}
      <div className="bg-primary-700 py-4 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-white font-medium text-lg">Join our newsletter</h3>
            <p className="text-white/70 text-sm">We'll send you a nice letter once per week. No spam.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-primary-600 py-12 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo and Tagline */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <Image src="/assets/images/logo-white.png" alt="Con10th" width={150} height={40} />
              </Link>
              <p className="text-white/80 text-sm">
                Design amazing digital experiences that create more happy in the world.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-white/70 hover:text-white text-sm">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/70 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-white/70 hover:text-white text-sm">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/media-kit" className="text-white/70 hover:text-white text-sm">
                    Media Kit
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-white/70 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="text-white/70 hover:text-white text-sm">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-white/70 hover:text-white text-sm">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-white/70 hover:text-white text-sm">
                    Help centre
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white/70 hover:text-white text-sm">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="https://twitter.com" className="text-white/70 hover:text-white text-sm">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" className="text-white/70 hover:text-white text-sm">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com" className="text-white/70 hover:text-white text-sm">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-white/70 hover:text-white text-sm">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/70 hover:text-white text-sm">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-white/70 hover:text-white text-sm">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/licenses" className="text-white/70 hover:text-white text-sm">
                    Licenses
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-white/70 hover:text-white text-sm">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-800 border-t border-primary-700/50 py-6 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">© 2024 CON10TH. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <Link href="https://twitter.com" className="text-white/70 hover:text-white">
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://linkedin.com" className="text-white/70 hover:text-white">
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://facebook.com" className="text-white/70 hover:text-white">
              <Facebook size={18} />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center p-0">
          <MessageCircle size={20} className="text-white" />
          <span className="sr-only">Chat with us</span>
        </Button>
      </div>
    </footer>
  )
}

