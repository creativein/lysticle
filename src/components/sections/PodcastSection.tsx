const PodcastSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Listen to Our Podcast
          </h2>
          <p className="text-lg text-gray-600">
            Learn more about Lysticle through our product information podcast
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden pb-[56.25%]">
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/WzNxwH86AHk?si=RalL5zx4p2DETlz2" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;