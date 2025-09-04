import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="">
      <nav className="text-grey-100 text-sm font-normal container mx-auto flex flex-wrap pl-10 pr-10 justify-center items-center p-7">
        <div className="space-x-10 flex flex-wrap justify-left items-center mx-auto">
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