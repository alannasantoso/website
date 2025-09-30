import Header from '../components/Header';
import photo1 from '../assets/about/1.jpg';
import photo2 from '../assets/about/2.jpg';
import photo3 from '../assets/about/3.jpg';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

export default function About() {
  useEffect(() => {
    document.title = 'about | alannasantoso';
  }, []);

  return (
    <main className="container mx-auto flex-grow">
      <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%] justify-center items-center">
        <Header />
        <motion.div
          className="w-full aspect-[2/1] pl-10 pr-10 md:pl-20 md:pr-20 pb-0 pt-10 md:pt-25 grid grid-cols-3 gap-5 min-h-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[photo2, photo1, photo3].map((src, index) => (
            <motion.div
              key={index}
              variants={photoVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-full h-full opacity-60 rounded-md overflow-hidden min-h-0"
            >
              <img
                src={src}
                alt={`About photo ${index + 1}`}
                className="block w-full h-full object-cover"
              />
            </motion.div>
          ))}

        </motion.div>
        

        <div className="mb-30 w-full pt-0 pl-10 pr-10 md:pl-20 md:pr-20">
                    <p className="col-span-3 text-light text-[10px] pt-5 italic text-right">
            caption: shots from alanna&apos;s recents
          </p>
          <p className="text-3xl font-[dm_sans]">about alanna:</p>
          <p className="mt-5 text-sm text-justify">
            alanna is a talkative, mildly energetic 19 (almost 20) year old with aspirations of one day being
            able to visit all of the top ten largest museums.<br /> <br />
            usually fuelled by caffeine she <em>swears</em> is a placebo, you're most likely to find her running around
            campus (late for that business lecture <em>again!?</em>) or taking a much-needed power nap on bus number 70. the
            amount of flavoured leaf and bean liquids she downs suggest she may be allergic to water, but fear not! there is always
            an emergency water bottle in the backseat of her car (i guess you could say there's aqua in her aqua).
            <br />
            <br />
            in her spare time, alanna can be found dabbling in design, photography, and a good dose of granny hobbies
            (baking, crochet, reading agatha christie). her obsession with soundtracking her life has 
            seen the creation of over 300 playlists,
            all meticulously stored in nested spotify folders for archival purposes - and you can be sure that between the 7000 artists she's listened to, 
            there is most <em>definitely</em> a song for every mood. correlated with her tendency to romanticise life as much as possible (a necessity
            when you're a woman in cs), she is an avid movie and tv show watcher, with <em>extremely</em> passionate opinions on certain unrealistic storylines
            (don't ask her about the notebook). 
            <br/>
          </p>
        </div>
      </div>
    </main>
  );
}
