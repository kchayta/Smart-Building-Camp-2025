import React from 'react';
import { ViewState } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative bg-harvard-black h-[600px] overflow-hidden group">
      {/* Background Image with Parallax-like effect (static for now but styled) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: 'url("https://picsum.photos/id/1031/1920/1080")' }} // Smart city/building abstract
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-harvard-crimson mix-blend-multiply opacity-40" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 border border-harvard-gold text-harvard-gold text-xs font-bold tracking-widest uppercase bg-black/50 backdrop-blur-sm">
            24 - 29 พฤษจิกายน 2568
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight shadow-sm">
            Building the Future <br/>
            <span className="text-harvard-gold italic font-light">Smartly.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 font-sans font-light max-w-2xl leading-relaxed">
            ยินดีต้อนรับสู่โครงการ Smart Building Model Camp 2025 พื้นที่แห่งการเรียนรู้ นวัตกรรม 
            และการออกแบบอาคารอัจฉริยะเพื่อความยั่งยืน
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setView(ViewState.DOCUMENTS)}
              className="px-8 py-4 bg-harvard-crimson text-white text-sm font-bold uppercase tracking-wider hover:bg-red-800 transition-all duration-300 shadow-lg flex items-center justify-center group/btn"
            >
              เข้าถึงคลังเอกสาร
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setView(ViewState.GALLERY)}
              className="px-8 py-4 bg-white text-harvard-black text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              ชมภาพกิจกรรม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};