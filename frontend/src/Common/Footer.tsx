import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { 
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-6 h-6" />,
      url: '#'
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="w-6 h-6" />,
      url: '#'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-6 h-6" />,
      url: '#'
    }
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-950 to-gray-700 text-gray-200 border-t border-gray-700 rounded-t-lg">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Contact Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <FiMail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a href="mailto:admissions@enrollease.in" className="hover:text-purple-400 transition-colors">
                  admissions@enrollease.in
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <FiPhone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a href="tel:+919000012345" className="hover:text-purple-400 transition-colors">
                  +91 90000 12345
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <FiMapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-300 mb-2 text-center md:text-left">Stay Updated</h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email for newsletter subscription"
                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
              >
                Subscribe Now
              </button>
            </form>
            
          </div>

          {/* Social Links */}
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Follow Us on:</h3>
            <div className="flex justify-center md:justify-start gap-0">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  aria-label={`Follow us on ${link.name}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-700"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-2 pb-2 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EnrollEase. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Empowering students through seamless admissions
          </p>
        </div>
      </div>
    </footer>
  );
}