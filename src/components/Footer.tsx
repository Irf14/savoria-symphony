
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-savoria-black border-t border-gold/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/c66deafa-ac0d-468b-ae58-5882755f77e8.png"
              alt="SAVORIA"
              className="h-16 object-contain"
            />
            <p className="text-sm text-gray-400 max-w-xs">
              Experience the height of culinary excellence with our diverse range of authentic cuisines prepared by world-class chefs.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-cormorant text-xl text-white">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-gold transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-gold transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-cormorant text-xl text-white">Contact</h3>
            <p className="text-gray-400">123 Luxury Avenue</p>
            <p className="text-gray-400">New York, NY 10001</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
            <p className="text-gray-400">contact@savoria.com</p>
          </div>
        </div>
        
        <div className="border-t border-gold/10 mt-12 pt-8 text-gray-500 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SAVORIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
