// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import { styled, keyframes, alpha } from '@mui/system';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

// Keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const iconHoverEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

// Styled Root Footer Box
const FooterRoot = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 100%)`, // Dark, sophisticated gradient
  color: theme.palette.common.white,
  padding: theme.spacing(3, 2), // Further reduced vertical padding (was 4, originally 8)
  marginTop: 'auto',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 -5px 15px rgba(0,0,0,0.2)', // Softer shadow
  '&::before': { // Subtle pattern or texture overlay (optional)
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundImage: 'url("/path/to/subtle-pattern.png")', // Example
    // opacity: 0.05,
    pointerEvents: 'none',
  }
}));

// Styled Link Item
const FooterLinkItem = styled(Link)(({ theme, delay }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: alpha(theme.palette.common.white, 0.85),
  textDecoration: 'none',
  marginBottom: theme.spacing(1), // Reduced margin bottom
  fontSize: '0.9rem', // Slightly smaller font size
  transition: 'color 0.3s ease, transform 0.3s ease',
  opacity: 0,
  animation: `${fadeInUp} 0.6s ease-out forwards`,
  animationDelay: delay,
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1), // Reduced icon margin
    fontSize: '1.1rem', // Slightly smaller icon
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover': {
    color: theme.palette.secondary.light, // Brighter hover color
    transform: 'translateX(4px)',
    '& .MuiSvgIcon-root': {
      animation: `${iconHoverEffect} 0.5s ease`,
    },
  },
}));

// Section Title
const SectionTitle = styled(Typography)(({ theme, delay }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2), // Reduced margin bottom (was 3)
  color: theme.palette.secondary.light, // Use secondary color for titles
  textTransform: 'uppercase',
  letterSpacing: '1px',
  opacity: 0,
  animation: `${fadeInUp} 0.6s ease-out forwards`,
  animationDelay: delay,
}));


function Footer({ handleNavClick }) {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Navegación',
      delay: '0.1s',
      links: [
        {
          label: 'Inicio',
          icon: <HomeOutlinedIcon />,
          href: '#top',
          onClick: (e) => {
            if (handleNavClick) handleNavClick(e, '#top');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          delay: '0.2s'
        },
        {
          label: 'Galería',
          icon: <PhotoLibraryIcon />,
          href: '#gallery-section',
          onClick: (e) => {
            if (handleNavClick) handleNavClick(e, '#gallery-section');
            else {
              const gallerySection = document.querySelector('#gallery-section');
              if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          },
          delay: '0.3s'
        },
        {
          label: 'Contacto',
          icon: <EmailOutlinedIcon />,
          href: 'mailto:admin@txopo.x10.mx',
          delay: '0.4s'
        },
      ]
    },
    {
      title: 'Enlaces',
      delay: '0.5s',
      links: [
        {
          label: 'Mi Web Personal',
          icon: <LanguageOutlinedIcon />,
          href: 'https://txopo.lovestoblog.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          delay: '0.6s'
        },
      ]
    },
    {
      title: 'Ferrara Gallery',
      delay: '0.6s',
      content: (
        <Typography variant="body2" sx={(theme) => ({ color: alpha(theme.palette.common.white, 0.7), animation: `${fadeInUp} 0.6s ease-out forwards`, animationDelay: '0.7s' })}>
          Descubre la belleza atemporal y la rica historia de Ferrara a través de nuestra cuidada selección de imágenes y videos. Una experiencia visual única.
        </Typography>
      )
    }
  ];

  return (
    <FooterRoot component="footer">
      <Container maxWidth={false}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} justifyContent="space-between"> {/* Usando todo el ancho disponible */}
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={section.title === 'Ferrara Gallery' ? 4 : 3.5} key={section.title}>
              <SectionTitle variant="h6" component="div" delay={section.delay} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }}}> {/* Responsive font size for title */}
                {section.title}
              </SectionTitle>
              {section.links && section.links.map(link => (
                <Box key={link.label}>
                  <FooterLinkItem
                    href={link.href}
                    onClick={link.onClick}
                    target={link.target}
                    rel={link.rel}
                    delay={link.delay}
                  >
                    {link.icon}
                    {link.label}
                  </FooterLinkItem>
                </Box>
              ))}
              {section.content}
            </Grid>
          ))}
        </Grid>
        <Divider sx={(theme) => ({ my: 2, bgcolor: alpha(theme.palette.common.white, 0.15) })} /> {/* Further reduced margin for Divider (was 3) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            animation: `${fadeInUp} 0.6s ease-out forwards`,
            animationDelay: '0.8s'
          }}
        >
          <Typography variant="body2" sx={(theme) => ({ color: alpha(theme.palette.common.white, 0.7) })}>
            &copy; {currentYear} Ferrara Gallery. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </FooterRoot>
  );
}

export default Footer;
