import Header from '../components/Header'
import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'projects | alannasantoso'
  }, [])

  return (
    <main className="container mx-auto">
      <div className="min-h-screen mx-auto w-screen md:min-w-[700px] md:w-[50%]">
        <Header/>
        
        <div className="mb-30 w-full mt-20 pt-0 pl-10 pr-10 md:pl-20 md:pr-20">
            <p className="text-3xl font-[dm_sans]">whoops!</p>
            <p className="mt-5 text-sm text-justify">alanna is still working on this...
            </p>

        </div>
      </div>
    </main>
  );
}