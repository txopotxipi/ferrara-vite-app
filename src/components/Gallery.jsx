// src/components/Gallery.jsx
import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Typography, Box, IconButton } from '@mui/material';
// Eliminamos useMediaQuery y useTheme ya que volveremos a window.innerWidth
import ZoomInIcon from '@mui/icons-material/ZoomIn'; // Icono para la acción de zoom/abrir slider
import ShareIcon from '@mui/icons-material/Share'; // Icono para compartir

function Gallery({ openSlider, totalImages }) {
  const images = [];
  for (let i = 1; i <= totalImages; i++) {
    images.push({
      id: i,
      src: `./fotos/${i}.jpg`,
      alt: `Ferrara - Imagen ${i} de 42 - Vistas de la ciudad de Ferrara, Italia`,
      title: `Vista ${i} de Ferrara`,
      description: `Fotografía ${i} de la hermosa ciudad de Ferrara, Italia`,
      tags: ['Ferrara', 'Italia', 'Turismo', 'Arquitectura']
    });
  }

  const getCols = () => {
    const width = window.innerWidth;
    if (width < 600) return 1; // Móviles (xs)
    if (width < 900) return 2; // Tablets pequeñas (sm)
    if (width < 1200) return 3; // Tablets grandes / Desktops pequeños (md)
    return 4; // Desktops grandes (lg y xl)
  };

  const [cols, setCols] = React.useState(getCols());

  React.useEffect(() => {
    const handleResize = () => {
      setCols(getCols());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Se ejecuta solo al montar y desmontar

  // Lógica para el efecto de carga escalonada (simplificado)
  // Podríamos mejorarlo o usar una librería de animación
  const [loadedItems, setLoadedItems] = React.useState([]);

  React.useEffect(() => {
    const timers = images.map((image, index) => 
      setTimeout(() => {
        setLoadedItems(prev => [...prev, image.id]);
      }, 100 * index) // Carga escalonada
    );
    return () => timers.forEach(clearTimeout);
  }, [images.length]); // Ejecutar solo si cambia el número de imágenes

  return (
    <Box component="section" id="gallery-section" sx={{
      my: 8,
      py: 4,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3,
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        px: 2
      }}>
        <Typography variant="h3" component="h2" gutterBottom
          sx={{
            fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '2.2rem', md: '2.7rem' },
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
          Galería de Ferrara
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            {totalImages} imágenes
          </Typography>
          <IconButton 
            color="primary" 
            aria-label="compartir galería"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Enlace copiado al portapapeles!');
            }}
          >
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
      <ImageList 
        variant="masonry" 
        cols={cols} // Usamos el estado 'cols'
        gap={12}
        sx={{
          '& .MuiImageList-item': {
            borderRadius: 1,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }
          }
        }}
      >
        {images.map((image, index) => (
          <ImageListItem 
            key={image.id} 
            sx={{
              cursor: 'pointer',
              opacity: loadedItems.includes(image.id) ? 1 : 0,
              transform: loadedItems.includes(image.id) ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              '&:hover': {
                opacity: 0.85, // Ligera opacidad al hacer hover
              }
            }}
            onClick={() => openSlider(index)}
          >
            <img
              src={`${image.src}?w=248&fit=crop&auto=format&dpr=1`}
              srcSet={`${image.src}?w=248&fit=crop&auto=format&dpr=2 2x,
                ${image.src}?w=496&fit=crop&auto=format&dpr=3 3x`}
              alt={image.alt}
              loading="lazy"
              style={{ 
                display: 'block', 
                width: '100%', 
                height: 'auto',
                objectFit: 'cover'
              }}
            />
            <ImageListItemBar
              title={<span style={{ fontWeight: 600, fontSize: '1.08rem', color: '#222', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>{image.title}</span>}
              // Eliminamos el subtitle para no mostrar la descripción
              actionIcon={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    sx={{ color: 'rgba(30, 30, 60, 0.7)' }}
                    aria-label={`ver detalles de ${image.title}`}
                    onClick={(e) => { 
                      e.stopPropagation();
                      openSlider(index); 
                    }}
                  >
                    <ZoomInIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: 'rgba(30, 30, 60, 0.7)' }}
                    aria-label={`compartir ${image.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(image.src);
                      alert('Enlace de la imagen copiado al portapapeles!');
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default Gallery;
