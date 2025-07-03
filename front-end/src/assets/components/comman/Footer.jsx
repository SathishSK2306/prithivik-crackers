import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#06141B] text-[#CCDDCF] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Prithivik Crackers</h3>
            <p>Premium quality crackers since 1985</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-[#259745]">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-[#259745]">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#259745]">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#259745]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhone className="mr-2" /> +91 9876543210
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="mr-2" /> +91 9876543210
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> info@prithivikcrackers.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Address</h4>
            <address className="flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" />
              <span>
                123 Crackers Street, Sivakasi, Tamil Nadu - 626123, India
              </span>
            </address>
          </div>
        </div>

        <div className="border-t border-[#11212D] mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Prithivik Crackers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
