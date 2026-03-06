import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// Importing high-quality banner images
import banner1 from "../../assets/banner/medical_camp1.jpg"
import banner2 from "../../assets/banner/medical_camp2.jpg"
import banner3 from "../../assets/banner/medical_camp3.jpg"
import banner4 from "../../assets/banner/medical_camp4.jpg"
import banner5 from "../../assets/banner/medical_camp5.jpg"

const Banner = () => {
    // Banner content data
    const bannerData = [
        {
            id: 1,
            image: banner1,
            title: "Modern Living Room",
            subtitle: "Elegant & Comfortable Design",
            description: "Transform your space with our premium furniture collection",
            color: "from-orange-500 to-pink-500"
        },
        {
            id: 2,
            image: banner2,
            title: "Luxury Bedroom",
            subtitle: "Sweet Dreams Start Here",
            description: "Experience ultimate comfort with our bedroom sets",
            color: "from-blue-500 to-purple-500"
        },
        {
            id: 3,
            image: banner3,
            title: "Modern Kitchen",
            subtitle: "Heart of Your Home",
            description: "Stylish and functional kitchen solutions",
            color: "from-green-500 to-teal-500"
        },
        {
            id: 4,
            image: banner4,
            title: "Home Office",
            subtitle: "Work in Style",
            description: "Ergonomic furniture for productive workdays",
            color: "from-purple-500 to-indigo-500"
        },
        {
            id: 5,
            image: banner5,
            title: "Dining Collection",
            subtitle: "Memorable Moments",
            description: "Create lasting memories with our dining sets",
            color: "from-red-500 to-yellow-500"
        }
    ];

    return (
        <div className="relative w-full">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={1000}
                swipeable={true}
                emulateTouch={true}
                showArrows={true}
                className="banner-carousel"
            >
                {bannerData.map((item) => (
                    <div key={item.id} className="relative md:h-[600px] h-[300px] group">
                        {/* Image */}
                        <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src={item.image} 
                            alt={item.title}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                        
                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-4 md:px-8">
                                <div className="max-w-2xl">
                                    {/* Animated content */}
                                    <div className="animate__animated animate__fadeInUp">
                                        {/* Subtitle with gradient */}
                                        <span className={`inline-block px-4 py-1 mb-4 text-sm font-semibold text-white bg-gradient-to-r ${item.color} rounded-full`}>
                                            {item.subtitle}
                                        </span>
                                        
                                        {/* Main Title */}
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                            {item.title}
                                        </h2>
                                        
                                        {/* Description */}
                                        <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8 max-w-lg">
                                            {item.description}
                                        </p>
                                        
                                        {/* Buttons */}
                                        <div className="flex flex-wrap gap-4">
                                            <button className={`px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${item.color} text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm md:text-base`}>
                                                Shop Now
                                            </button>
                                            <button className="px-6 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 text-sm md:text-base border border-white/30">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Badge */}
                        <div className="absolute top-8 right-8 hidden md:block">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                                <span className="text-white font-semibold">New Collection</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Custom styles for carousel dots and arrows using Tailwind */}
            <style jsx global>{`
                .banner-carousel .carousel .control-dots {
                    bottom: 30px;
                    z-index: 20;
                }
                
                .banner-carousel .carousel .control-dots .dot {
                    @apply w-3 h-3 bg-white/50 shadow-none mx-2 transition-all duration-300;
                }
                
                .banner-carousel .carousel .control-dots .dot.selected {
                    @apply w-8 bg-gradient-to-r from-orange-500 to-pink-500 opacity-100;
                }
                
                .banner-carousel .carousel .control-arrow {
                    @apply bg-black/30 !important;
                    @apply w-10 h-10 rounded-full top-1/2 -translate-y-1/2 mx-4 opacity-0 group-hover:opacity-100 transition-all duration-300;
                }
                
                .banner-carousel .carousel:hover .control-arrow {
                    @apply opacity-100;
                }
                
                .banner-carousel .carousel .control-arrow:hover {
                    @apply bg-gradient-to-r from-orange-500 to-pink-500 !important;
                }
                
                .banner-carousel .carousel .control-prev {
                    left: 20px;
                }
                
                .banner-carousel .carousel .control-next {
                    right: 20px;
                }

                /* Animation classes */
                .animate__animated {
                    animation-duration: 1s;
                    animation-fill-mode: both;
                }

                .animate__fadeInUp {
                    animation-name: fadeInUp;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 40px, 0);
                    }

                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Banner;