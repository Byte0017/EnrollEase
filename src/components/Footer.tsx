const Footer = () => {
  return (
    <footer className="bg-blue-600 fixed bottom-0 left-0 right-0 py-4 shadow-md border-t-2 border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white">&copy; {new Date().getFullYear()} EnrollEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
