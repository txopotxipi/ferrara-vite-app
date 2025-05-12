// src/components/ImageSlider.jsx
import React from 'react'; // Necesario en el entorno Vite

function ImageSlider({ isOpen, currentIndex, totalImages, closeSlider, nextSlide, prevSlide }) {
  // El console.log original se mantiene para depuración si es necesario, pero podría eliminarse para producción.
  // console.log("ImageSlider renderizando. isOpen:", isOpen, "currentIndex:", currentIndex);
  const [isImageVisible, setIsImageVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsImageVisible(false); 
      const timer = setTimeout(() => {
        setIsImageVisible(true);
      }, 10); 
      return () => clearTimeout(timer);
    } else {
      setIsImageVisible(false); 
    }
  }, [isOpen, currentIndex]);


  if (!isOpen) {
    return null;
  }

  const sliderContainerClasses = `slider-container ${isOpen ? "active" : ""}`;
  const sliderImageClasses = `slider-image ${isImageVisible ? "active" : ""}`; 

  return (
    <div className={sliderContainerClasses} id="slider" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="slider-content">
        <img
          src={`./fotos/${currentIndex + 1}.jpg`} // Sin barra inicial, Vite lo manejará con 'base'
          alt={`Ferrara imagen ${currentIndex + 1}`}
          className={sliderImageClasses}
          id="sliderImage" // El ID puede no ser necesario si no se usa en CSS/JS global
        />
        <div className="slider-nav slider-prev" id="sliderPrev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="slider-nav slider-next" id="sliderNext" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="slider-close" id="sliderClose" onClick={closeSlider}> {/* Eliminado el console.log wrapper */}
          <i className="fas fa-times"></i>
        </div>
        <div className="slider-counter" id="sliderCounter">
          {`${currentIndex + 1}/${totalImages}`}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
