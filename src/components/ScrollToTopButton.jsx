// src/components/ScrollToTopButton.jsx
import React from 'react'; // Necesario en el entorno Vite

function ScrollToTopButton({ isVisible }) { 
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  // En React, la clase 'active' se maneja por la prop isVisible y el CSS.
  // El CSS original ya tiene .scroll-top.active { opacity: 1; visibility: visible; }
  // y .scroll-top { opacity: 0; visibility: hidden; ... }
  // Así que solo necesitamos aplicar la clase 'active' condicionalmente o confiar en que el CSS lo haga.
  // Para mantener la lógica original, si isVisible es true, el componente se renderiza y el CSS lo hace visible.
  // Si isVisible es false, el componente devuelve null y no se renderiza.
  // La clase 'active' en el div es para asegurar que los estilos de visibilidad se apliquen.
  return (
    <div 
      className={`scroll-top ${isVisible ? 'active' : ''}`} // Aseguramos la clase active
      id="scrollTop" // El ID puede no ser necesario
      onClick={scrollToTop}
      style={{ display: isVisible ? 'flex' : 'none' }} // Control explícito de display
    >
      <i className="fas fa-arrow-up"></i>
    </div>
  );
}

export default ScrollToTopButton;
