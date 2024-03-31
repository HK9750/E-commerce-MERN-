const Loading = () => {
  return (
    <div className="sticky h-screen top-0 left-0 w-full flex justify-center items-center bg-transparent z-50">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-12 h-12 border-4 border-gray-900 dark:border-white rounded-full animate-spin"></div>
        <div className="text-gray-900 dark:text-white text-lg font-semibold">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
