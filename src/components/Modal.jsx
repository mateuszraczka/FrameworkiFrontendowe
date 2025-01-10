export default function Modal({ children, onClick }) {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen backdrop-opacity-80 bg-opacity-80 bg-gray-500 backdrop-blur-md z-50 flex justify-center items-center"
    >
      <div className="sm:w-96 w-full flex justify-center items-center relative">
        <div className="absolute left-full bottom-full cursor-pointer" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-black hover:text-red-500 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}
