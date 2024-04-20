
const Success: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Success!</h1>
        <p className="text-lg text-gray-800">
          Your order has been placed successfully.
        </p>
      </div>

      <button className="mt-8 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 font-semibold">
        Continue Shopping
      </button>

      <div className="mt-8">
        <p className="text-sm text-gray-600">
          Need assistance? Contact our support team.
        </p>
      </div>

      {/* Animations or effects */}
      <div className="mt-8">
        {/* Animated illustration */}
        <svg
          className="animate-bounce w-16 h-16 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Success;
