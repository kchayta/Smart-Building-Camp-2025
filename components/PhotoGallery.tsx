import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { X } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  // Mock data using picsum
  const photos: PhotoItem[] = Array.from({ length: 9 }).map((_, i) => ({
    id: i.toString(),
    url: `https://picsum.photos/id/${i + 10 + 50}/800/600`,
    caption: `กิจกรรม Workshop ช่วงที่ ${i + 1}`,
    category: i % 3 === 0 ? 'Workshop' : i % 3 === 1 ? 'Presentation' : 'Activity'
  }));

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <div className="bg-harvard-offwhite min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-harvard-black mb-4">ภาพกิจกรรม</h2>
          <div className="w-20 h-1 bg-harvard-crimson mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            รวมภาพความประทับใจ บรรยากาศการเรียนรู้ และผลงานของน้องๆ ในค่าย Smart Building Model Camp 2025
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-harvard-crimson opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 border-t-4 border-transparent group-hover:border-harvard-crimson transition-colors">
                <p className="text-xs font-bold text-harvard-crimson uppercase tracking-wider mb-2">{photo.category}</p>
                <h3 className="text-lg font-serif font-bold text-gray-900">{photo.caption}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" onClick={() => setSelectedPhoto(null)}>
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption} 
                className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border-2 border-white/10"
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-serif">{selectedPhoto.caption}</h3>
                <p className="text-white/60 text-sm mt-1">{selectedPhoto.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};