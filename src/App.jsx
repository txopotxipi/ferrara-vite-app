import React from 'react'; // Necesario en Vite
import { AppBar, Toolbar, Typography, Container, Box, Button, Paper, Tabs, Tab } from '@mui/material';
// Importar componentes
import Header from './components/Header';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import ScrollToTopButton from './components/ScrollToTopButton';
import SolarSystem from './components/SolarSystem';
// Importar estilos globales (Vite lo manejará)
import './styles.css';

// Lógica que estaba en Header.jsx (parcialmente)
const createParticles = (container) => {
  if (!container) return;
  const particleCount = 50;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle"; // De styles.css
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${posY}%`;
    particle.style.left = `${posX}%`;
    particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`; // float definido en styles.css
    particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
    container.appendChild(particle);
  }
};

function App() {
  const appBarBackgroundUrl = `${import.meta.env.BASE_URL}fotos/1.jpg`; // Simplificado para usar BASE_URL directamente

  // Refs para efectos
  const particlesContainerRef = React.useRef(null);
  const appBarRef = React.useRef(null); // Para el parallax del AppBar
  const titleRef = React.useRef(null); // Para la animación del título
  const fullTitle = "FERRARA"; // Keep this for mapping
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [sliderState, setSliderState] = React.useState({
    isOpen: false,
    currentIndex: 0,
    totalImages: 42 
  });

  const openSlider = (index) => {
    // Asegurarse de que el índice es un número
    const numericIndex = Number(index);
    setSliderState(prevState => ({ ...prevState, isOpen: true, currentIndex: numericIndex }));
    document.body.style.overflow = "hidden"; 
  };

  const closeSlider = () => {
    // console.log("closeSlider llamada en App.jsx"); // Mantener para depuración si es necesario
    setSliderState(prevState => ({ ...prevState, isOpen: false })); 
    document.body.style.overflow = "auto"; 
  };

  const nextSlide = () => {
    setSliderState(prevState => ({
      ...prevState,
      currentIndex: (prevState.currentIndex + 1 + prevState.totalImages) % prevState.totalImages
    }));
  };

  const prevSlide = () => {
    setSliderState(prevState => ({
      ...prevState,
      currentIndex: (prevState.currentIndex - 1 + prevState.totalImages) % prevState.totalImages
    }));
  };
  
  const [showScrollTopButton, setShowScrollTopButton] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
        // Seleccionar elementos que podrían no tener la clase 'visible' aún
        // y que no son parte de componentes que manejan su propia visibilidad (como el slider)
        document.querySelectorAll(".section-title, .video-wrapper").forEach(el => {
            if (!el.classList.contains('visible')) { // Solo aplicar si no es ya visible
                el.style.opacity = "0"; 
                el.style.transform = "translateY(20px)";
                // La transición ya debería estar en styles.css, pero la reaseguramos
                el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                observer.observe(el);
            }
        });
    }, 100); 

    return () => {
      clearTimeout(timer);
      document.querySelectorAll(".section-title, .video-wrapper").forEach(el => {
        if (observer && typeof observer.unobserve === 'function') { 
            observer.unobserve(el);
        }
      });
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    };
  }, []); 


  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (sliderState.isOpen) {
        if (e.key === "ArrowLeft") {
          prevSlide();
        } else if (e.key === "ArrowRight") {
          nextSlide();
        } else if (e.key === "Escape") {
          closeSlider();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sliderState.isOpen, prevSlide, nextSlide, closeSlider]);

  // --- Efectos del Header Original adaptados a App.jsx ---
  // Efecto Parallax para AppBar
  React.useEffect(() => {
    const handleScrollParallax = () => {
      const appBarElement = appBarRef.current;
      if (appBarElement) {
        const scrollPosition = window.scrollY;
        // Ajustar el factor de parallax según sea necesario
        const yPos = scrollPosition * 0.4;
        // Asumimos que el AppBar tiene una imagen de fondo aplicada vía sx o styles.css
        appBarElement.style.backgroundPositionY = `${yPos}px`;
      }
    };
    window.addEventListener("scroll", handleScrollParallax);
    return () => window.removeEventListener("scroll", handleScrollParallax);
  }, []);

  // Creación de Partículas
  React.useEffect(() => {
    createParticles(particlesContainerRef.current);
  }, []);

  // Trigger animation for title letters
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100); // Short delay to ensure initial styles are applied
    return () => clearTimeout(timer);
  }, []);

  // Navegación suave del header
  const [activeNav, setActiveNav] = React.useState('');
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveNav(targetId);
    const targetElement = document.querySelector(targetId); 
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // --- Fin Efectos del Header Original ---

  const [darkMode, setDarkMode] = React.useState(false);
  const headerRef = React.useRef(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <AppBar 
        ref={appBarRef}
        position="relative" // Cambiado de static para parallax y z-index si es necesario
        id="top" // Para el enlace de "Inicio"
        sx={{
          height: '100vh', // Altura completa como el header original
          // Estilos del header original de styles.css
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${appBarBackgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center', // Asegurar centrado
          backgroundAttachment: 'fixed', // Para el efecto parallax básico
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden', // Para las partículas
          boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)', // Sombra del header original
        }}
      >
        {/* Contenedor de partículas del header original */}
        <Box ref={particlesContainerRef} className="particles" sx={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none'}} />
        
        {/* Contenido del header original (título, subtítulo, botones) */}
        <Box 
          className="header-content" // Clase de styles.css
          sx={{ textAlign: 'center', zIndex: 2, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h1 
            ref={titleRef} 
            style={{
              fontFamily: "'Cinzel Decorative', cursive",
              fontSize: 'clamp(3rem, 10vw, 6rem)', // Using the constrained responsive size
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
              margin: 0,
              padding: '10px 0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 2,
              display: 'block',
            }}
          >
            {fullTitle.split('').map((letter, index) => (
              <span
                key={index}
                // className="letter-animate" // No longer using this class
                style={{
                  display: 'inline-block',
                  opacity: startAnimation ? 1 : 0,
                  transform: startAnimation ? 'translateY(0)' : 'translateY(20px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.5s',
                  transitionTimingFunction: 'ease-out',
                  transitionDelay: `${0.5 + index * 0.1}s`, // Adjusted delay slightly
                  // Gradient properties
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <Typography 
            component="p" 
            className="subtitle" // Clase de styles.css para animación y estilo
          >
            Un viaje por la bella ciudad italiana
          </Typography>
          
          {/* Botones de navegación del header original */}
          <Box className="header-nav" sx={{ display: 'flex', gap: '20px', mt: '30px' }}>
            <Button 
              href="#gallery-section" // Asegúrate que Gallery tenga id="gallery-section"
              className={`header-nav-btn ${activeNav === '#gallery-section' ? 'active' : ''}`} // Clases de styles.css
              onClick={(e) => handleNavClick(e, '#gallery-section')}
              // Estilos MUI para que se parezcan a los originales, o confiar en .header-nav-btn
              variant="outlined" // Un estilo base de MUI
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.4)', 
                backdropFilter: 'blur(5px)',
                '&:hover': {transform: 'translateY(-3px)', background: 'rgba(255,255,255,0.3)'}
              }}
            >
              {/* Usando iconos de Font Awesome como en el original, asegúrate que esté cargado */}
              <i className="fa-solid fa-images" style={{ marginRight: '8px' }}></i> Ver Galería
            </Button>
            <Button 
              href="#video-section" // Asegúrate que VideoSection tenga id="video-section"
              className={`header-nav-btn ${activeNav === '#video-section' ? 'active' : ''}`} // Clases de styles.css
              onClick={(e) => handleNavClick(e, '#video-section')}
              variant="outlined"
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.4)', 
                backdropFilter: 'blur(5px)',
                '&:hover': {transform: 'translateY(-3px)', background: 'rgba(255,255,255,0.3)'}
              }}
            >
              <i className="fa-solid fa-video" style={{ marginRight: '8px' }}></i> Ver Videos
            </Button>
          </Box>
        </Box>
      </AppBar>
      
      {/* Contenido Principal de la Página */}
      <Container component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Inicio" />
              <Tab label="Sistema Solar 3D" />
            </Tabs>
          </Paper>
          
          {tabValue === 0 ? (
            <>
              <Box component="section" id="gallery-section">
                <Gallery openSlider={openSlider} totalImages={sliderState.totalImages} />
              </Box>
              <Box component="section" id="video-section">
                <VideoSection />
              </Box>
              <ImageSlider />
            </>
          ) : (
            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
                Simulación del Sistema Solar
              </Typography>
              <SolarSystem />
              <Typography variant="body1" paragraph sx={{ mt: 2, color: 'text.secondary' }}>
                Explora nuestro sistema solar en 3D. Arrastra con el ratón para rotar la vista y usa la rueda para hacer zoom.
              </Typography>
            </Paper>
          )}
        </Container>
      </Container>
      
      <Footer handleNavClick={handleNavClick} /> {/* Pasar handleNavClick como prop */}
      
      <ImageSlider 
        isOpen={sliderState.isOpen}
        currentIndex={sliderState.currentIndex}
        totalImages={sliderState.totalImages}
        closeSlider={closeSlider}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
      <ScrollToTopButton isVisible={showScrollTopButton} /> 
    </Box>
  );
}

export default App; // Necesario para Vite
