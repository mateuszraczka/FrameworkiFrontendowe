export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-sm">
            &copy; {currentYear} Mateusz Rączka. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }