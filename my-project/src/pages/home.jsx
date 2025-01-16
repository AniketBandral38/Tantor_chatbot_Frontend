
function Home() {
    return (
      <div className="relative min-h-screen bg-black overflow-x-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 mt-16 md:mt-20">
          {/* Left side content */}
          <div className="flex flex-col space-y-4 md:space-y-6 w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">
              Tantor
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light leading-relaxed">
              Break Free From Data Gravity
            </p>
            <p className="text-lg md:text-xl text-gray-400 px-4 md:px-0">
              Lightning-Fast Real-Time Insights for Your Next Best Opportunity.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8 items-center sm:justify-center md:justify-start">
              <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
              <button className="w-full sm:w-auto px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>

          {/* Right side vector image */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 px-4 md:px-0">
            <img 
              src="https://tantor.ai/wp-content/uploads/2024/10/Hero-banner-1021x1024.png" 
              alt="Data Analytics Illustration" 
              className="w-full h-auto max-w-[70%] mx-auto md:max-w-[90%]"
              loading="lazy"
            />
          </div>
        </div>
        
      </div>
    )
  }
  
  export default Home