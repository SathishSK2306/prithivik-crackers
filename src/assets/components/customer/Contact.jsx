import { useState } from "react";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We will contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#259745] hover:bg-[#1e7e3a] text-white px-6 py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-[#11212D] text-[#CCDDCF] p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-[#259745] text-xl mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Crackers Street, Sivakasi, Tamil Nadu - 626123, India</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaPhone className="text-[#259745] text-xl mr-4" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaWhatsapp className="text-[#259745] text-xl mr-4" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaEnvelope className="text-[#259745] text-xl mr-4" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>info@prithivikcrackers.com</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
