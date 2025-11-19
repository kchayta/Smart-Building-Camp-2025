import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-harvard-black text-white py-12 border-t border-harvard-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-white">Smart Building Model Camp</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              มุ่งเน้นการสร้างนวัตกรด้านอาคารอัจฉริยะ รุ่นใหม่ <br />
              เพื่อการพัฒนาเมืองอย่างยั่งยืน
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-harvard-gold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>อาคารเรียนรวม 4 คณะวิศวกรรมศาสตร์</li>
              <li>โทร: 02-xxx-xxxx</li>
              <li>Email: contact@smartbuildingcamp.edu</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-harvard-gold mb-4">ลิงก์ด่วน</h3>
             <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">สำหรับผู้ปกครอง</li>
              <li className="hover:text-white cursor-pointer">นโยบายความเป็นส่วนตัว</li>
              <li className="hover:text-white cursor-pointer">รายงานปัญหาการใช้งาน</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; 2025 Smart Building Model Camp. All rights reserved. Designed with academic excellence in mind.
        </div>
      </div>
    </footer>
  );
};