import Header from '../components/Header'
import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'links | alannasantoso'
  }, [])

  return (
    <main className="container mx-auto">
      <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%]">
        <Header/>
        
        <div className="mb-30 w-full pt-12 pl-10 pr-10 md:pl-20 md:pr-20">
            <p className="text-3xl font-[dm_sans]">links:</p>
          <p className="mt-5 text-justify">other places online i happen to exist </p>
            <div className="grid grid-cols-1 ">
              <div className="flex flex-col">
                <p className="text-xl mt-10 italic font-[dm_sans]">&gt; profiles</p>
                <p className="text-xs mt-3">consider this my digital curriculum vitae</p>
                <a
                  href="https://www.linkedin.com/in/alannasantoso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:italic hover:underline ml-7 mt-4 text-md text-justify"
                >
                  linkedin
                </a>
                <a
                  href="https://github.com/alannasantoso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:italic hover:underline ml-7  text-md text-justify"
                >
                github </a>
              </div>
              <div className="flex flex-col">
                <p className="text-xl mt-10 italic font-[dm_sans]">&gt; social media</p>
                <p className="text-xs mt-3">a more candid portrayal of my life</p>
                  <a
                    href="https://www.instagram.com/alanna_ds/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:italic hover:underline ml-7 mt-4 text-md text-justify"
                  >
                    instagram
                  </a>
                  <a
                    href="https://letterboxd.com/alannadee/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:italic hover:underline ml-7 text-md text-justify"
                  >
                    letterboxd
                  </a>
                  <a
                    href="https://www.last.fm/user/mangojellies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:italic hover:underline ml-7  text-md text-justify"
                  >
                    last.fm
                  </a>
                  <a
                    href="https://open.spotify.com/user/wswsfr6qdtt86wvx8ncud6mwj?si=c33aba7ddcd94a80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:italic hover:underline ml-7 text-md text-justify"
                  >
                    spotify
                  </a>
              </div>

            </div>

        </div>
      </div>
    </main>
  );
}