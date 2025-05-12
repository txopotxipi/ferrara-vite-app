import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class SolarSystemScene extends Phaser.Scene {
    constructor() {
        super('SolarSystemScene');
        this.planets = [];
        this.sun = null;
        this.zoom = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.prevX = 0;
        this.prevY = 0;
    }

    preload() {
        // Cargar sprites para el sol y los planetas
        this.load.image('sun', 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/particles/red.png');
        this.load.image('planet', 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/particles/blue.png');
    }

    create() {
        // Configurar el fondo
        this.cameras.main.setBackgroundColor('#000033');
        
        // Obtener el centro de la pantalla
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Crear el sol
        this.sun = this.add.circle(centerX, centerY, 30, 0xffff00);
        
        // Crear planetas
        const planetData = [
            { name: 'Mercury', distance: 50, size: 10, speed: 0.02, color: 0xAAAAAA },
            { name: 'Venus', distance: 80, size: 15, speed: 0.015, color: 0xFFA07A },
            { name: 'Earth', distance: 120, size: 16, speed: 0.01, color: 0x1E90FF },
            { name: 'Mars', distance: 160, size: 12, speed: 0.008, color: 0xFF4500 },
            { name: 'Jupiter', distance: 220, size: 35, speed: 0.005, color: 0xDAA520 },
            { name: 'Saturn', distance: 280, size: 30, speed: 0.003, color: 0xF4A460 },
            { name: 'Uranus', distance: 340, size: 25, speed: 0.002, color: 0x87CEEB },
            { name: 'Neptune', distance: 400, size: 24, speed: 0.001, color: 0x4169E1 }
        ];

        this.planets = planetData.map(data => {
            // Crear el planeta
            const planet = {
                ...data,
                angle: Math.random() * Math.PI * 2,
                sprite: this.add.circle(0, 0, data.size, data.color)
            };
            
            // Añadir etiqueta de texto para el nombre del planeta
            planet.label = this.add.text(0, 0, data.name, {
                fontFamily: 'Arial',
                fontSize: '14px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5, 0.5).setVisible(false);
            
            // Mostrar el nombre al pasar el ratón por encima
            planet.sprite.setInteractive();
            planet.sprite.on('pointerover', () => {
                planet.label.setVisible(true);
            });
            planet.sprite.on('pointerout', () => {
                planet.label.setVisible(false);
            });
            
            return planet;
        });
        
        // Configurar controles
        this.input.on('pointerdown', (pointer) => {
            this.isDragging = true;
            this.prevX = pointer.x;
            this.prevY = pointer.y;
        });
        
        this.input.on('pointerup', () => {
            this.isDragging = false;
        });
        
        this.input.on('pointermove', (pointer) => {
            if (this.isDragging) {
                this.offsetX += (pointer.x - this.prevX) / this.zoom;
                this.offsetY += (pointer.y - this.prevY) / this.zoom;
                this.prevX = pointer.x;
                this.prevY = pointer.y;
            }
        });
        
        // Zoom con rueda del ratón
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            const zoomFactor = 1.1;
            if (deltaY > 0) {
                this.zoom /= zoomFactor;
            } else {
                this.zoom *= zoomFactor;
            }
            // Limitar el zoom
            this.zoom = Phaser.Math.Clamp(this.zoom, 0.5, 5);
        });
    }

    update(time, delta) {
        // Actualizar posición de los planetas
        this.planets.forEach(planet => {
            planet.angle += planet.speed * (delta / 16);
            
            // Calcular posición basada en la órbita elíptica
            const x = Math.cos(planet.angle) * planet.distance * this.zoom + this.cameras.main.width / 2 + this.offsetX * this.zoom;
            const y = Math.sin(planet.angle) * planet.distance * 0.6 * this.zoom + this.cameras.main.height / 2 + this.offsetY * this.zoom;
            
            // Actualizar posición del planeta y su etiqueta
            planet.sprite.setPosition(x, y);
            planet.label.setPosition(x, y - planet.size - 10);
        });
        
        // Actualizar posición del sol
        this.sun.setPosition(
            this.cameras.main.width / 2 + this.offsetX * this.zoom,
            this.cameras.main.height / 2 + this.offsetY * this.zoom
        );
        this.sun.setScale(this.zoom);
        
        // Actualizar escala de los planetas y visibilidad de las etiquetas
        this.planets.forEach(planet => {
            planet.sprite.setScale(this.zoom);
            // Hacer las etiquetas más pequeñas cuando se hace zoom out
            const labelScale = Math.min(1, this.zoom);
            planet.label.setScale(labelScale);
        });
    }
}

const SolarSystem = () => {
    const gameContainer = useRef(null);
    const gameInstance = useRef(null);

    useEffect(() => {
        // Esperar a que el contenedor esté disponible
        if (!gameContainer.current) return;

        // Dimensiones fijas para el canvas de Phaser
        const width = gameContainer.current.clientWidth;
        const height = gameContainer.current.clientHeight;

        // Configuración del juego Phaser
        const config = {
            type: Phaser.AUTO,
            width: width,
            height: height,
            parent: gameContainer.current,
            scene: SolarSystemScene,
            backgroundColor: '#000033',
            scale: {
                mode: Phaser.Scale.NONE, // Desactivar escalado automático
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            render: {
                antialias: true,
                pixelArt: false
            }
        };

        // Inicializar el juego
        try {
            gameInstance.current = new Phaser.Game(config);
            
            // Manejar redimensionamiento
            const handleResize = () => {
                if (gameInstance.current) {
                    gameInstance.current.scale.updateBounds();
                }
            };
            
            window.addEventListener('resize', handleResize);
            
            // Limpieza al desmontar el componente
            return () => {
                window.removeEventListener('resize', handleResize);
                if (gameInstance.current) {
                    gameInstance.current.destroy(true);
                    gameInstance.current = null;
                }
            };
        } catch (error) {
            console.error('Error al inicializar Phaser:', error);
        }
    }, []);

    return (
        <div style={{ 
            width: '100%', 
            height: '600px', // Altura fija
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative'
        }}>
            <div 
                ref={gameContainer}
                style={{
                    width: '100%',
                    height: '100%',
                    margin: '0 auto',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    backgroundColor: '#000033',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '10px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                textAlign: 'center',
                fontSize: '14px',
                zIndex: 10
            }}>
                <p>Arrastra para mover la vista | Rueda del ratón para hacer zoom | Pasa el ratón sobre un planeta para ver su nombre</p>
            </div>
        </div>
    );
};

export default SolarSystem;
