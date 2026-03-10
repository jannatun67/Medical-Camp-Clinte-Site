import { useState } from "react";
import { FaCamera, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { MdOutlineZoomInMap } from "react-icons/md";

import gallery1 from "../../assets/galleryImages/galleryImage1.jpg"
import gallery2 from "../../assets/galleryImages/galleryImage2.webp"
import gallery3 from "../../assets/galleryImages/galleryImage3.png"
import gallery4 from "../../assets/galleryImages/galleryImage4.jpg"
import gallery5 from "../../assets/galleryImages/galleryImage5.jpg"
import gallery6 from "../../assets/galleryImages/galleryImage6.jpg"

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      url: gallery1,
      title: "Free Checkup Camp",
      location: "Dhaka Medical College",
      likes: 234,
      comments: 45,
      category: "Checkup"
    },
    {
      id: 2,
      url: gallery2,
      title: "Dental Care Session",
      location: "Community Center, Chittagong",
      likes: 189,
      comments: 32,
      category: "Dental"
    },
    {
      id: 3,
      url: gallery3,
      title: "Eye Care Initiative",
      location: "Vision Center, Sylhet",
      likes: 156,
      comments: 28,
      category: "Eye Care"
    },
    {
      id: 4,
      url: gallery4,
      title: "Child Vaccination",
      location: "Children's Hospital",
      likes: 312,
      comments: 67,
      category: "Pediatric"
    },
    {
      id: 5,
      url: gallery5,
      title: "Blood Donation Camp",
      location: "City Convention Hall",
      likes: 278,
      comments: 54,
      category: "Blood Donation"
    },
    {
      id: 6,
      url: gallery6,
      title: "Health Awareness",
      location: "School Auditorium",
      likes: 145,
      comments: 23,
      category: "Awareness"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0F766E]/10 via-[#0F766E]/5 to-[#F97316]/10 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#0F766E 1px, transparent 1px), linear-gradient(to right, #F97316 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Circle Decoration */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-[#0F766E]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#F97316]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0F766E]/10 text-[#0F766E] px-6 py-2 rounded-full mb-4">
            <FaCamera className="text-lg" />
            <span className="font-semibold">Memories & Moments</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Camp{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capturing precious moments from our medical camps across the country
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#0F766E]">
                  {image.category}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center transform translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                  <MdOutlineZoomInMap className="text-[#F97316] text-xl" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-gray-200 text-sm mb-3">{image.location}</p>
                  
                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-white hover:text-[#F97316] transition-colors">
                      <FaHeart className="text-sm" />
                      <span className="text-xs">{image.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-white hover:text-[#0F766E] transition-colors">
                      <FaComment className="text-sm" />
                      <span className="text-xs">{image.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-white hover:text-[#F97316] transition-colors">
                      <FaShare className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal - Image Zoom */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <button 
                className="absolute -top-12 right-0 text-white hover:text-[#F97316] transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-2xl font-bold mb-1">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="group px-8 py-4 bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <span className="flex items-center gap-2">
              View More Photos
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;