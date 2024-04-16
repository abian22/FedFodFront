import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function Streaming() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarVideo = async () => {
      try {
        const videoUrl = 'http://localhost:8000/live/video'

        const video = videoRef.current;

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('Error de HLS:', event, data);
            setError('Error de HLS: ' + JSON.stringify(data));
          });
        } else {
          setError('El navegador no es compatible con la transmisión de video.');
        }
      } catch (error) {
        console.error('Error al cargar el video:', error);
        setError('Error al cargar el video. Consulta la consola para más detalles.');
      }
    };

    cargarVideo();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <video ref={videoRef} controls autoPlay />
    </div>
  );
}

export default Streaming;
