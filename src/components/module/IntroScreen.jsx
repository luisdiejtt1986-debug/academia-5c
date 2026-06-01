import { motion } from "framer-motion";
import Cody from "../../assets/cody.png";
import { useState, useRef } from "react";

function IntroScreen({ data, onNext, accent = "#1a6bff" }) {
  // Referencia para controlar video local
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔍 Detectar si es YouTube
  const isYouTube = data.video?.includes("youtube.com") || data.video?.includes("youtu.be");

  // 🔁 Convertir URL de YouTube a formato embed
  const getEmbedUrl = (url) => {
    if (url?.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&autoplay=0`;
    }
    if (url?.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&autoplay=0`;
    }
    return url;
  };

  const togglePlay = () => {
    // Solo funciona para videos locales (YouTube maneja sus propios controles)
    if (videoRef.current && !isYouTube) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-between p-6 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />

      {/* Top badge */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="w-full flex justify-center pt-2">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-white/10"
          style={{ background: `${accent}20` }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            Módulo de aprendizaje
          </span>
        </div>
      </motion.div>

      {/* CENTER: title + media (Video YouTube / Video Local / Imagen) */}
      <div className="flex flex-col items-center text-center w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-4">
          <h1 className="text-4xl font-black leading-none mb-1" style={{ fontFamily: 'Poppins' }}>{data.title}</h1>
          <p className="text-xl font-bold mt-2" style={{ color: accent }}>{data.subtitle}</p>
          <p className="text-blue-300 text-sm mt-3 max-w-xs mx-auto font-medium leading-relaxed">{data.text}</p>
        </motion.div>

        <motion.div className="relative w-full max-w-sm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}>
          
          {/* Glow behind */}
          <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
            style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />

          {/* 🎬 LÓGICA: YouTube / Video Local / Imagen de respaldo */}
          {data.video ? (
            isYouTube ? (
              /* YouTube: iframe con controles nativos */
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video">
                <iframe
                  src={getEmbedUrl(data.video)}
                  title={data.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={false}
                  frameBorder="0"
                  loading="lazy"
                />
              </div>
            ) : (
              /* Video local MP4: con overlay de play personalizado */
              <div 
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src={data.video}
                  playsInline
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Botón de Play Overlay (solo para videos locales) */}
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/90 rounded-full p-4 shadow-xl"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1 text-black">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )
          ) : (
            /* Fallback: Si no hay video, muestra la imagen o a Cody */
            <img src={data.image || Cody} alt="Personaje"
              className="w-52 relative z-10 float drop-shadow-2xl" />
          )}
        </motion.div>

        {/* Animated bullets */}
        <div className="w-full max-w-sm mt-4 space-y-2">
          {data.animated?.map((text, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.25 }}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 border border-white/5"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              <p className="text-sm text-blue-100 font-medium">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
        onClick={onNext}
        className="w-full max-w-sm py-4 rounded-2xl text-lg font-black text-white shadow-xl"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        ✅ {data.button}
      </motion.button>
    </div>
  );
}

export default IntroScreen;