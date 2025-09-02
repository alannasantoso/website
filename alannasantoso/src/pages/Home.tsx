import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="container w-[100vw] mx-auto p-0 flex flex-col justify-center align-middle">
      <div className="h-screen mx-auto w-[50%] min-w-[700px] ">
        <div className="w-full h-[500px] mt-[20%] p-20 grid grid-cols-1 md:grid-cols-2">
          <div>          
            <h1 className="text-6xl italic font-[hanken_grotesk]">alanna</h1>
            <h1 className="text-6xl mt-[-20px] font-[hanken_grotesk]">santoso</h1>
            <p className="mt-[20%]">
            i'm a second year computer science and finance student at the university of auckland. this page was created as a personal project and a creative exercise - feel free to have a look around!
            </p>
            <p className="text-sm mt-[20%] italic">created with three cups of hojicha and a passion for easter eggs</p>
          </div>
          <div className="font-[dm_sans] flex flex-col items-end text-right space-y-2 mt-[10%]">
            <Link to="/about" className="hover:italic block">&gt; About</Link>
            <Link to="/photos" className="hover:italic block">&gt; Photos</Link>
            <Link to="/projects" className="hover:italic block">&gt; Projects</Link>
            <Link to="/links" className="hover:italic block">&gt; Links</Link>
          </div>
        </div>
      </div>
    </main>
  );
}