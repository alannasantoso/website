export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8">
      <div className="container mx-auto p-4 text-center text-sm">
        © {new Date().getFullYear()} My Website
      </div>
    </footer>
  );
}
