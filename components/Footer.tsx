
import React from 'react';

const Footer: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    alert(`Navigating to FloraModern on ${platform}... (Not a real link)`);
  };

  return (
    <footer id="footer-contact" className="bg-brand-secondary text-brand-text-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-2xl font-playfair font-bold text-brand-primary mb-4">FloraModern</p>
        <div className="flex justify-center space-x-6 mb-6">
          <button onClick={() => handleSocialClick('Facebook')} className="hover:text-brand-primary transition-colors">Facebook</button>
          <button onClick={() => handleSocialClick('Instagram')} className="hover:text-brand-primary transition-colors">Instagram</button>
          <button onClick={() => handleSocialClick('Pinterest')} className="hover:text-brand-primary transition-colors">Pinterest</button>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Contact Us:</p>
          <p>Email: <a href="mailto:contact@floramodern.example.com" className="hover:text-brand-primary">contact@floramodern.example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-brand-primary">+1 (234) 567-890</a> (Demo number)</p>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FloraModern. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Crafted with love for beautiful blooms.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
