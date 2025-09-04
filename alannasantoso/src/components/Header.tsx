import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="">
      <nav className="text-grey-100 text-sm font-normal container mx-auto flex justify-center items-center p-7">
        <div className="space-x-10">
          <Link to="/" className="hover:italic opacity-50 hover:opacity-100">&gt; Home</Link>
          <Link to="/about" className="hover:italic opacity-50 hover:opacity-100">&gt; About</Link>
          <Link to="/photos" className="hover:italic opacity-50 hover:opacity-100">&gt; Photos</Link>
          <Link to="/projects" className="hover:italic opacity-50 hover:opacity-100">&gt; Projects</Link>
          <Link to="/links" className="hover:italic opacity-50 hover:opacity-100">&gt; Links</Link>
        </div>
      </nav>
    </header>
  );
}