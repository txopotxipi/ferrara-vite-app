// src/components/Header.jsx
import React from 'react'; // Necesario en el entorno Vite
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideocamIcon from '@mui/icons-material/Videocam';

function Header() {
  const particlesContainerRef = React.useRef(null);
  const headerRef = React.useRef(null); // Ref para el elemento header
  const titleRef = React.useRef(null); // Ref para el título

  // Efecto Parallax
  React.useEffect(() => {
    const handleScroll = () => {
      const headerElement = headerRef.current; 
      if (headerElement) {
        const scrollPosition = window.scrollY;
        const yPos = scrollPosition * 0.4;
        headerElement.style.backgroundPositionY = `${yPos}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Creación de Partículas
  React.useEffect(() => {
    const container = particlesContainerRef.current;
    if (!container) return;

    const particleCount = 50;
    // Limpiar partículas existentes si el efecto se re-ejecuta (ej. HMR)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle"; 

      const size = Math.random() * 5 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = `${posY}%`;
      particle.style.left = `${posX}%`;
      particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      
      container.appendChild(particle);
    }
  }, []);
  
  // Animación del título al cargar
  React.useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
        titleElement.style.opacity = "0";
        setTimeout(() => {
            titleElement.style.transition = "opacity 2s ease, transform 2s ease";
            titleElement.style.opacity = "1";
        }, 500);
    }
  }, []);

  // Desplazamiento suave y botón activo para la navegación del header
  const [activeNav, setActiveNav] = React.useState('');

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveNav(targetId);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header id="top" ref={headerRef}>
      <Box
        ref={particlesContainerRef} // Assign ref to the particles container Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/fotos/1.jpg')`, // Ruta absoluta desde la carpeta public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Efecto de partículas (This Box might be redundant if particles are added directly to the parent Box) */}
        {/* <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            background: 'rgba(0, 0, 0, 0.1)' // This was likely for the particle container itself
          }}
          id="particles" 
        /> */}
        
        {/* Contenido principal */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            maxWidth: '1200px',
            mx: 'auto',
            px: 2
          }}
        >
          <Typography ref={titleRef} variant="h1" component="h1" sx={{
            fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            animation: 'glow 3s infinite'
          }}>
            FERRARA
          </Typography>
          
          <Typography variant="h4" component="h2" sx={{
            fontSize: { xs: '1.5rem', sm: '2rem' },
            opacity: 0.9,
            mb: 4,
            lineHeight: 1.5
          }}>
            Explora la belleza y la historia de la ciudad italiana
          </Typography>

          {/* Botones con efectos modernos */}
          <Box sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PhotoLibraryIcon />}
              sx={{
                px: 6,
                py: 2.5,
                borderRadius: 2,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.02)'
                },
                transition: 'all 0.3s ease',
                boxShadow: 3,
                '&:active': {
                  boxShadow: 5
                }
              }}
            >
              <Typography variant="button" component="span">
                Explorar Galería
              </Typography>
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<VideocamIcon />}
              sx={{
                px: 6,
                py: 2.5,
                borderRadius: 2,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.02)'
                },
                transition: 'all 0.3s ease',
                boxShadow: 3,
                '&:active': {
                  boxShadow: 5
                }
              }}
            >
              <Typography variant="button" component="span">
                Ver Videos
              </Typography>
            </Button>
          </Box>

          {/* Información adicional */}
          <Box sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Chip
              label="24 Imágenes"
              color="primary"
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }}
            />
            <Chip
              label="Videos Turísticos"
              color="secondary"
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </Box>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
