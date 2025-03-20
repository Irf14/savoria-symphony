
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Utensils, Users, Award } from 'lucide-react';

const ExcellenceSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gold gradient overlay */}
      <div 
        className="absolute inset-0 bg-savoria-black opacity-90"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Excellence in Culinary and Hospitality
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl mb-12">
            At <span className="gold-gradient-text">SAVORIA</span>, we blend artistry with hospitality to create memorable experiences that transcend ordinary dining.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
            <div className="flex flex-col items-center">
              <Utensils size={36} className="text-gold mb-4" />
              <h3 className="font-playfair text-xl font-semibold text-white mb-2">Culinary Excellence</h3>
              <p className="text-gray-300 font-cormorant">Meticulously crafted dishes by our master chefs</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Users size={36} className="text-gold mb-4" />
              <h3 className="font-playfair text-xl font-semibold text-white mb-2">Impeccable Service</h3>
              <p className="text-gray-300 font-cormorant">Attentive staff dedicated to your satisfaction</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Award size={36} className="text-gold mb-4" />
              <h3 className="font-playfair text-xl font-semibold text-white mb-2">Award-Winning</h3>
              <p className="text-gray-300 font-cormorant">Recognized for our outstanding cuisine</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="font-playfair text-2xl md:text-3xl text-white mb-4">
              Prepare for Your <span className="gold-gradient-text">Extraordinary</span> Experience
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto font-cormorant text-lg mb-8">
              Secure your table at <span className="gold-gradient-text">SAVORIA</span> and embark on a culinary journey that transcends the ordinary. 
              Our reservation process is designed to ensure your experience is seamless from start to finish.
            </p>
            
            <Link 
              to="/reservation" 
              className="px-8 py-3 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors inline-block"
            >
              Make Reservation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcellenceSection;
