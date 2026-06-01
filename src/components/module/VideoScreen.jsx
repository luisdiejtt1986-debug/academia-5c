import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PlayIcon from "../../assets/play.png";

function VideoScreen({ data, onNext, accent = "#1a6bff" }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔍 Detectar si es YouTube
  const isYouTube = data.url?.includes("youtube.com") || data.url?.includes("youtu.be");
  
  // 🔁 Convertir URL de YouTube a formato embed con parámetros de aislamiento
  const getEmbedUrl = (url) => {
    let videoId = "";
    if (url?.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url?.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url?.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }
    
    // ✅ Parámetros clave para mantener al usuario en tu app:
    // rel=0 → No muestra videos de otros canales al finalizar
    // modestbranding=1 → Reduce logo y branding de YouTube
    // iv_load_policy=3 → Oculta anotaciones superpuestas
    // cc_load_policy=0 → No activa subtítulos por defecto
    // controls=1 → Mantiene play/pause/volumen (esencial para móvil)
    // disablekb=1 → Desactiva atajos de teclado (evita salir con teclas)
    // fs=0 → Desactiva pantalla completa nativa (opcional, quita si la necesitas)
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&controls=1&disablekb=1&fs=0`;
  };

  const togglePlay = () => {
    if (videoRef.current && !isYouTube) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="p-5 pb-32">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h2 className="text-2xl font-black" style={{ fontFamily: 'Poppins' }}>{data.title}</h2>
      </motion.div>

      {/* Video player */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.1 }}
        className="rounded-3xl overflow-hidden mb-5 relative group aspect-video"
        style={{ background: "rgba(0,0,0,0.6)", border: `2px solid ${accent}30` }}
        // Solo permitir click para play/pause si NO es YouTube
        onClick={!isYouTube ? togglePlay : undefined}
      >
        {/* 🎬 YouTube: Usar iframe con parámetros de aislamiento */}
        {isYouTube ? (
          <iframe
            src={getEmbedUrl(data.url)}
            title={data.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}  // 👈 Desactiva fullscreen nativo para mantener en app
            frameBorder="0"
            loading="lazy"  // 👈 Carga diferida para mejor rendimiento
          />
        ) : (
          /* 📁 MP4 local: Usar video nativo con overlay personalizado */
          <>
            <video 
              ref={videoRef} 
              src={data.url} 
              className="w-full h-full object-cover"
              controls={false} 
              playsInline 
              onEnded={() => setIsPlaying(false)} 
            />
            {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))" }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl mb-3"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
                >
                  <img src={PlayIcon} alt="Play" className="w-8 h-8 ml-1" />
                </motion.div>
                <span className="text-white/80 text-sm font-bold">Toca para reproducir</span>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Learning points */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-4 mb-5 border border-white/5"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
            style={{ background: `${accent}20` }}>📚</div>
          <h3 className="font-black text-sm uppercase tracking-wider text-blue-200">¿Qué aprenderás?</h3>
        </div>
        <div className="space-y-2">
          {data.points?.map((point, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}20` }}>
                <span className="text-xs font-black" style={{ color: accent }}>✓</span>
              </div>
              <p className="text-sm text-blue-100 font-medium">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button 
        whileTap={{ scale: 0.97 }} 
        onClick={onNext}
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5 }}
        className="w-full py-4 rounded-2xl font-black text-lg text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
      >
        Siguiente →
      </motion.button>
    </div>
  );
}

export default VideoScreen;