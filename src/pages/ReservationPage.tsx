
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, Phone, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ReservationPage = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !partySize || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reservation Confirmed!",
        description: `Your table has been reserved for ${format(date, 'MMMM dd, yyyy')} at ${time}. We look forward to serving you!`,
      });
      setIsSubmitting(false);
      
      // Reset form
      setDate(undefined);
      setTime('');
      setPartySize('');
      setName('');
      setEmail('');
      setPhone('');
      setSpecialRequest('');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 bg-savoria-black">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Reserve Your Table at <span className="gold-gradient-text">SAVORIA</span>
            </h1>
            <p className="font-cormorant text-xl text-gray-300 max-w-3xl mx-auto">
              Secure your dining experience with us. Whether it's an intimate dinner or a special celebration, 
              we'll prepare the perfect setting for your occasion.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-savoria-dark/80 border border-gold/20 rounded-lg p-6 md:p-8 shadow-xl backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-white font-cormorant text-lg">
                      Select Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full flex justify-between items-center bg-savoria-muted/30 border-gold/10 text-left font-cormorant",
                            !date && "text-gray-400"
                          )}
                        >
                          {date ? format(date, 'MMMM dd, yyyy') : <span>Choose a date</span>}
                          <CalendarIcon className="ml-auto h-5 w-5 opacity-70" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-savoria-dark border-gold/20 pointer-events-auto">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-white font-cormorant text-lg">
                      Select Time
                    </Label>
                    <Select onValueChange={setTime} value={time}>
                      <SelectTrigger className="w-full bg-savoria-muted/30 border-gold/10 font-cormorant">
                        <SelectValue placeholder="Select time" />
                        <Clock className="h-5 w-5 opacity-70" />
                      </SelectTrigger>
                      <SelectContent className="bg-savoria-dark border-gold/20">
                        <SelectGroup>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="17:30">5:30 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="18:30">6:30 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="19:30">7:30 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="20:30">8:30 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Party Size */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-white font-cormorant text-lg">
                      Number of Guests
                    </Label>
                    <Select onValueChange={setPartySize} value={partySize}>
                      <SelectTrigger className="w-full bg-savoria-muted/30 border-gold/10 font-cormorant">
                        <SelectValue placeholder="Select party size" />
                        <Users className="h-5 w-5 opacity-70" />
                      </SelectTrigger>
                      <SelectContent className="bg-savoria-dark border-gold/20">
                        <SelectGroup>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'person' : 'people'}
                            </SelectItem>
                          ))}
                          <SelectItem value="11+">11+ people (Large Party)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-cormorant text-lg">
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-savoria-muted/30 border-gold/10 pl-10 font-cormorant"
                        placeholder="Your name"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/70" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-cormorant text-lg">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-savoria-muted/30 border-gold/10 pl-10 font-cormorant"
                        placeholder="Your email"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/70" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-cormorant text-lg">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-savoria-muted/30 border-gold/10 pl-10 font-cormorant"
                        placeholder="Your phone number"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold/70" />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="special" className="text-white font-cormorant text-lg">
                      Special Requests (Optional)
                    </Label>
                    <textarea
                      id="special"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full h-24 bg-savoria-muted/30 border border-gold/10 rounded-md p-3 font-cormorant text-white"
                      placeholder="Any special requests or dietary requirements..."
                    />
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button 
                    type="submit" 
                    className="px-8 py-6 bg-gold hover:bg-gold-dark text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Confirming Reservation..." : "Confirm Reservation"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-savoria-dark/30 border border-gold/10 rounded-lg p-6 text-center"
            >
              <h3 className="font-playfair text-2xl font-bold mb-3 text-gold">Opening Hours</h3>
              <div className="font-cormorant text-lg">
                <p className="mb-2">Monday - Thursday: 5:00 PM - 10:00 PM</p>
                <p className="mb-2">Friday - Saturday: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 5:00 PM - 9:00 PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-savoria-dark/30 border border-gold/10 rounded-lg p-6 text-center"
            >
              <h3 className="font-playfair text-2xl font-bold mb-3 text-gold">Dress Code</h3>
              <p className="font-cormorant text-lg">
                Smart casual attire is recommended. We kindly request no athletic wear or beachwear.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-savoria-dark/30 border border-gold/10 rounded-lg p-6 text-center"
            >
              <h3 className="font-playfair text-2xl font-bold mb-3 text-gold">Large Parties</h3>
              <p className="font-cormorant text-lg">
                For groups of 11 or more, please contact us directly at (555) 123-4567 for special arrangements.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;
