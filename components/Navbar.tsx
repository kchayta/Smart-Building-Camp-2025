import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'หน้าหลัก', value: ViewState.HOME },
    { label: 'กำหนดการ', value: ViewState.SCHEDULE },
    { label: 'คลังเอกสาร', value: ViewState.DOCUMENTS },
    { label: 'ภาพกิจกรรม', value: ViewState.GALLERY },
    { label: 'ผู้ช่วยอัจฉริยะ', value: ViewState.AI_ASSISTANT },
  ];

  return (
    <nav className="bg-harvard-crimson text-white sticky top-0 z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <GraduationCap className="h-10 w-10 text-harvard-gold" />
            <div className="flex flex-col">
              <span className="text-sm font-light tracking-widest uppercase text-harvard-offwhite opacity-90">
                Faculty of Engineering
              </span>
              <span className="text-xl font-serif font-bold leading-tight">
                Smart Building Camp 2025
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setView(item.value)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    currentView === item.value
                      ? 'border-white text-white'
                      : 'border-transparent text-red-100 hover:text-white hover:border-red-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-harvard-crimson inline-flex items-center justify-center p-2 rounded-md text-red-100 hover:text-white hover:bg-red-800 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-900 border-t border-red-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setView(item.value);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentView === item.value
                    ? 'bg-red-800 text-white'
                    : 'text-red-100 hover:bg-red-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};