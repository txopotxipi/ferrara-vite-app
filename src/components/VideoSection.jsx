// src/components/VideoSection.jsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material'; // Añadido Grid para layout responsivo

function VideoSection() {
  const videos = [
    { id: "CVjcTgfEdZM", title: "Descubriendo Ferrara: Un Viaje Visual" },
    { id: "C5PLCAbURN8", title: "Ferrara desde el Aire: Perspectivas Únicas" },
    // Podrías añadir más videos aquí
    // { id: "VIDEO_ID_3", title: "Paseo Nocturno por Ferrara" }, 
    // { id: "VIDEO_ID_4", title: "Sabores de Ferrara: Gastronomía Local" },
  ];

  return (
    <Box component="section" id="video-section" sx={{ my: 4, width: '100%', maxWidth: '100%' }}> 
      <Typography variant="h4" component="h2" gutterBottom align="center" className="section-title"
        sx={{
          fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '2.5rem' },
          color: 'primary.main',
          letterSpacing: '0.04em',
          textShadow: '0 2px 8px rgba(30,30,60,0.10)',
          borderBottom: '3px solid #1976d2',
          display: 'inline-block',
          px: 2,
          mb: 2,
          background: 'linear-gradient(90deg, #e3f2fd 0%, #fff 100%)',
          borderRadius: '0 0 12px 12px',
          animation: 'fadeInDown 1s',
          '@keyframes fadeInDown': {
            from: { opacity: 0, transform: 'translateY(-30px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        Videos de Ferrara
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ width: '100%' }}>
        {videos.map(video => (
          <Grid item xs={12} md={6} key={video.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Contenedor exterior con tamaño fijo para ambos videos */}
            <Box 
              sx={{ 
                width: '100%',
                height: 'auto',
                maxWidth: '560px',
                display: 'flex',
                justifyContent: 'center',
                mb: 2
              }}
            >
              {/* Contenedor del video con relación de aspecto fija */}
              <Box 
                className="video-wrapper"
                sx={{ 
                  position: 'relative', 
                  width: '100%',
                  height: '315px', // Altura fija para todos los videos
                  overflow: 'hidden',
                  borderRadius: '8px', 
                  boxShadow: 3, 
                  backgroundColor: '#000',
                  '& iframe': {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    border: 0,
                    objectFit: 'contain' // Mantiene la relación de aspecto del video
                  }
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              </Box>
            </Box>
            <Typography variant="subtitle1" align="center" sx={{
              mt: 1,
              color: 'text.secondary',
              maxWidth: '560px',
              fontSize: { xs: '1rem', md: '1.1rem' },
              background: 'rgba(255,255,255,0.70)',
              backdropFilter: 'blur(2px)',
              borderRadius: '6px',
              px: 2,
              py: 0.5,
              boxShadow: '0 2px 8px rgba(30,30,60,0.07)',
              fontWeight: 500,
              transition: 'background 0.3s',
              position: 'relative',
              top: '-10px',
              zIndex: 2
            }}>
              {video.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VideoSection;
