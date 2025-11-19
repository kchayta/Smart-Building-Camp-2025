import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { FileText, Download, Upload, Folder, Search, File, FileSpreadsheet } from 'lucide-react';

export const DocumentRepository: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: '1', title: 'กำหนดการโครงการฉบับสมบูรณ์', category: 'Form', size: '1.2 MB', date: '2025-10-15', type: 'PDF' },
    { id: '2', title: 'Template นำเสนอผลงานกลุ่ม', category: 'Project', size: '4.5 MB', date: '2025-10-20', type: 'PPTX' },
    { id: '3', title: 'คู่มือการใช้งาน IoT Sensors', category: 'Lecture', size: '2.8 MB', date: '2025-11-01', type: 'PDF' },
    { id: '4', title: 'แบบฟอร์มขออนุญาตผู้ปกครอง', category: 'Form', size: '0.5 MB', date: '2025-09-30', type: 'DOCX' },
    { id: '5', title: 'Slide บรรยาย: Introduction to Smart City', category: 'Lecture', size: '12.1 MB', date: '2025-11-24', type: 'PDF' },
  ]);

  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc: DocumentItem = {
        id: Date.now().toString(),
        title: file.name,
        category: 'Other',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        date: new Date().toISOString().split('T')[0],
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || doc.category === filter;
    return matchesSearch && matchesFilter;
  });

  const getIcon = (type: string) => {
    if (type === 'PDF') return <FileText className="h-6 w-6 text-red-600" />;
    if (type === 'XLSX' || type === 'CSV') return <FileSpreadsheet className="h-6 w-6 text-green-600" />;
    return <File className="h-6 w-6 text-blue-600" />;
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-3xl font-serif font-bold text-harvard-black mb-2">คลังเอกสารโครงการ</h2>
          <p className="text-gray-600 font-sans">ดาวน์โหลดเอกสาร สไลด์ประกอบการบรรยาย และแบบฟอร์มต่างๆ</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
             {['All', 'Project', 'Lecture', 'Form'].map(cat => (
               <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat 
                    ? 'bg-harvard-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
               >
                 {cat === 'All' ? 'ทั้งหมด' : cat}
               </button>
             ))}
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาเอกสาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-harvard-crimson focus:border-transparent w-full"
              />
            </div>
            <label className="flex items-center justify-center px-4 py-2 bg-harvard-crimson text-white rounded-md cursor-pointer hover:bg-red-800 transition-colors shadow-sm">
              <Upload className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">อัพโหลด</span>
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {/* File List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อไฟล์</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">หมวดหมู่</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">วันที่</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">ขนาด</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
                          {getIcon(doc.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 group-hover:text-harvard-crimson transition-colors">
                            {doc.title}
                          </div>
                          <div className="text-xs text-gray-500 sm:hidden">{doc.size} • {doc.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-50 text-harvard-crimson border border-red-100">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-harvard-crimson transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Folder className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    ไม่พบเอกสารที่คุณค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};