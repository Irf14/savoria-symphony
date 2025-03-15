
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting SAVORIA. We'll get back to you shortly.",
        variant: "default",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-savoria-black">
      <Navbar />
      
      <section className="pt-24 pb-12 relative">
        <div 
          className="absolute inset-0 z-0 bg-black opacity-60"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-center font-playfair text-4xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          
          <motion.p 
            className="text-center text-gray-300 max-w-3xl mx-auto font-cormorant text-xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd love to hear from you. Reach out for reservations, inquiries, or to share your SAVORIA experience.
          </motion.p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="font-playfair text-3xl font-bold mb-6 text-white">Get in Touch</h2>
                <p className="text-gray-300 font-cormorant text-lg mb-8">
                  Whether you're looking to make a reservation, inquire about private events, or share your feedback, we're here to assist you.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold/10 p-3 rounded-md">
                    <Phone className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-playfair text-lg">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold/10 p-3 rounded-md">
                    <Mail className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-playfair text-lg">Email</h3>
                    <p className="text-gray-300">contact@savoria.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold/10 p-3 rounded-md">
                    <MapPin className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-playfair text-lg">Address</h3>
                    <p className="text-gray-300">123 Luxury Avenue, New York, NY 10001</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-playfair text-lg mb-4">Hours of Operation</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                  <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                  <p>Sunday: 4:00 PM - 9:00 PM</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-savoria-muted p-8 rounded-md">
                <h2 className="font-playfair text-2xl font-bold mb-6 text-white">Send a Message</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 font-cormorant text-lg">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-savoria-black/50 border border-gold/30 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 font-cormorant text-lg">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-savoria-black/50 border border-gold/30 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-300 mb-2 font-cormorant text-lg">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-savoria-black/50 border border-gold/30 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-cormorant text-lg">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full bg-savoria-black/50 border border-gold/30 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-dark text-savoria-black font-cormorant font-semibold text-lg tracking-wider py-3 rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
          
          <div className="mt-16">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.098409401383!2d-74.0059766!3d40.7127776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1630505352381!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-md"
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
