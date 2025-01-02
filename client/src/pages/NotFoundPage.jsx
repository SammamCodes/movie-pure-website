const NotFoundPage = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white text-center">
        {/* Animated Graphics */}
        <div className="relative mb-8">
          <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-5 left-5 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow"></div>
        </div>
  
        {/* Error Text */}
        <h1 className="text-6xl font-extrabold text-pink-500 mb-4 drop-shadow-md">
          404
        </h1>
        <p className="text-xl mb-6 text-gray-300 max-w-lg">
          Oops! It looks like you’re lost in space. The page you’re looking for
          doesn’t exist.
        </p>
  
        {/* Navigation Button */}
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
        >
          🚀 Take Me Home
        </a>
  
        {/* Small Footer */}
        <p className="text-sm mt-10 text-gray-500">
          Still stuck? Try searching or contact support.
        </p>
      </div>
    );
  };
  
  export default NotFoundPage;
  