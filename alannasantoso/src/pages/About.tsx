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
      staggerChildren: 0.15,
      delayChildren: 0.7,
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
    <main className="container mx-auto">
      <div className="min-h-screen mx-auto w-screen md:min-w-[800px] md:w-[50%]">
        <Header />
        <motion.div
          className="w-full aspect-[2/1] pl-10 pr-10 pt-10 md:pl-20 md:pr-20 md:pt-20 pb-0 grid grid-cols-3 gap-5 min-h-0"
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
          <p className="col-span-3 text-light text-[10px] pt-0 italic text-right">
            caption: shots from alanna&apos;s recents
          </p>
        </motion.div>

        <div className="mb-30 w-full pt-0 pl-10 pr-10 md:pl-20 md:pr-20">
          <p className="text-3xl font-[dm_sans]">about alanna:</p>
          <p className="mt-5 text-sm text-justify">
            alanna is a typically talkative mildly energetic 19 (almost 20) year old with aspirations of one day being
            able to visit all of the top ten largest museums.<br /> <br />
            usually fuelled by caffeine she <em>swears</em> is a placebo, you're most likely to find her running around
            campus (late for that business lecture <em>again!?</em>) or taking a much-needed nap on bus number 70. the
            amount of flavoured leaf and bean liquids she downs suggest she may be allergic to water, but the number of
            emergency pumps she's had to get on account of forgotten water bottles suggest otherwise.
            <br />
            <br />
            in her spare time, alanna can be found dabbling in design, photography, and a good dose of granny hobbies
            (baking, crochet, reading agatha christie). her spotify dependency has seen the creation of nearly 250
            playlists, and her extremely opinionated, yet rarely updated, letterboxd account tells you all you need to
            know.
          </p>
        </div>
      </div>
    </main>
  );
}
