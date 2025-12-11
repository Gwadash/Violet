import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-violet-600">Account Details</a></li>
              <li><a href="#" className="hover:text-violet-600">Orders</a></li>
              <li><a href="#" className="hover:text-violet-600">Returns and Exchanges</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">The Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-violet-600">About Us</a></li>
              <li><a href="#" className="hover:text-violet-600">Careers</a></li>
              <li><a href="#" className="hover:text-violet-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-violet-600">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-violet-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-violet-600">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Connect</h3>
            <p className="text-sm text-gray-500 mb-4">Sign up for our newsletter to get the latest news and offers.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-gray-100 px-4 py-2 w-full text-sm outline-none focus:ring-1 focus:ring-violet-600" />
              <button className="bg-black text-white px-4 py-2 text-sm font-bold uppercase">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2024 Violet Essentials. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>VISA</span>
             <span>MASTERCARD</span>
             <span>PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};