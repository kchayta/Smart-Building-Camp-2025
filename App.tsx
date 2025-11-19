import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DocumentRepository } from './components/DocumentRepository';
import { PhotoGallery } from './components/PhotoGallery';
import { SmartAssistant } from './components/SmartAssistant';
import { Footer } from './components/Footer';
import { ViewState } from './types';
import { Calendar, MapPin, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DOCUMENTS:
        return <DocumentRepository />;
      case ViewState.GALLERY:
        return <PhotoGallery />;
      case ViewState.AI_ASSISTANT:
        return <SmartAssistant />;
      case ViewState.SCHEDULE:
        return (
          <div className="max-w-5xl mx-auto px-4 py-16 min-h-screen">
            <h2 className="text-4xl font-serif font-bold text-harvard-black mb-8 text-center">กำหนดการโครงการ</h2>
            <div className="bg-white shadow-lg border-l-4 border-harvard-crimson p-8">
               <div className="space-y-8">
                  {[
                    { day: '24 Nov', title: 'Opening Ceremony & Keynote', desc: 'พิธีเปิดและบรรยายพิเศษเรื่อง Smart City Trends' },
                    { day: '25 Nov', title: 'Workshop 1: IoT Basics', desc: 'พื้นฐานเซนเซอร์และไมโครคอนโทรลเลอร์' },
                    { day: '26 Nov', title: 'Workshop 2: 3D Modeling', desc: 'การออกแบบโมเดลอาคารด้วยโปรแกรม SketchUp' },
                    { day: '27 Nov', title: 'Site Visit', desc: 'เยี่ยมชมอาคารต้นแบบประหยัดพลังงาน' },
                    { day: '28 Nov', title: 'Group Project Development', desc: 'พัฒนาโครงงานกลุ่ม' },
                    { day: '29 Nov', title: 'Final Presentation', desc: 'นำเสนอผลงานและพิธีปิด' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-24 text-harvard-crimson font-bold text-lg">{item.day}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case ViewState.HOME:
      default:
        return (
          <>
            <Hero setView={setCurrentView} />
            
            {/* Info Section */}
            <div className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <Calendar className="h-10 w-10 text-harvard-crimson mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-xl mb-2">24-29 พฤษจิกายน 2568</h3>
                    <p className="text-gray-600">6 วันแห่งการเรียนรู้เข้มข้น</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <MapPin className="h-10 w-10 text-harvard-crimson mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-xl mb-2">คณะวิศวกรรมศาสตร์</h3>
                    <p className="text-gray-600">สถานที่จัดกิจกรรมหลัก</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <Clock className="h-10 w-10 text-harvard-crimson mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-xl mb-2">09:00 - 16:00</h3>
                    <p className="text-gray-600">เวลาเข้าร่วมกิจกรรม</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="py-16 bg-harvard-offwhite">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-serif font-bold text-harvard-black mb-6">About The Camp</h2>
                <p className="text-lg text-gray-700 leading-8">
                  Smart Building Model Camp 2025 เป็นโครงการที่มุ่งเน้นให้นักเรียนและนักศึกษาได้เรียนรู้เกี่ยวกับการบูรณาการเทคโนโลยี
                  Internet of Things (IoT) เข้ากับการออกแบบสถาปัตยกรรม เพื่อสร้างสรรค์อาคารที่สามารถบริหารจัดการพลังงาน
                  และความปลอดภัยได้อย่างมีประสิทธิภาพ รองรับอนาคตของ Smart City
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-harvard-black bg-harvard-offwhite">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;