import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './HeroPage.css'; // Move the styles to this file
import { Link } from 'react-router-dom';
import StarBorder from '../components/StarBorder'

interface HeroPageProps {
  onProceed: () => void;
}

const HeroPage = ({ onProceed }: HeroPageProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderProgressRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let progress = 0;

    const animateLoader = () => {
      progress += Math.random() * 3;
      if (progress > 100) progress = 100;
      if (loaderProgressRef.current) {
        loaderProgressRef.current.style.width = `${progress}%`;
      }
      if (progress < 100) setTimeout(animateLoader, 30);
      else setTimeout(hideLoader, 700);
    };

    const hideLoader = () => {
      if (loaderRef.current) {
        loaderRef.current.classList.add('hide');
      }
    };

    animateLoader();
  }, []);

  useEffect(() => {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, torus: THREE.Object3D<THREE.Object3DEventMap>, particleSystem: THREE.Object3D<THREE.Object3DEventMap>;

    const initThree = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 6;

      if (!canvasRef.current) return;
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: 0xff7a18, wireframe: true, transparent: true, opacity: 0.8 });
      torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      const pMaterial = new THREE.PointsMaterial({ color: 0xffb347, size: 0.05 });
      const pGeometry = new THREE.BufferGeometry();
      const pVertices = [];

    //   for (let i = 0; i < 200; i++) {
    //     pVertices.push((Math.random() - 0.5) * 10);
    //     pVertices.push((Math.random() - 0.5) * 10);
    //     pVertices.push((Math.random() - 0.5) * 10);
    //   }

//     const radius = 3;
// const particleCount = 300;
// for (let i = 0; i < particleCount; i++) {
//   const theta = Math.random() * 2 * Math.PI;
//   const phi = Math.acos(2 * Math.random() - 1);

//   const x = radius * Math.sin(phi) * Math.cos(theta);
//   const y = radius * Math.sin(phi) * Math.sin(theta);
//   const z = radius * Math.cos(phi);

//   pVertices.push(x, y, z);
// }
const radius = 10; // Larger radius to cover more screen space
const particleCount = 2000; // More particles for denser fill

for (let i = 0; i < particleCount; i++) {
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  pVertices.push(x, y, z);
}


      pGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pVertices, 3));
      particleSystem = new THREE.Points(pGeometry, pMaterial);
      scene.add(particleSystem);

      const animate = () => {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.005;
        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
      };
      animate();
    };

    initThree();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div id="loader" ref={loaderRef}>
        <div className="loader-label">Loading</div>
        <div className="loader-bar">
          <div className="loader-progress" ref={loaderProgressRef}></div>
        </div>
      </div>

      <canvas id="heroCanvas" ref={canvasRef}></canvas>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Pandit Aman</h1>
          {/* <p className="hero-subtitle">From Pixels to Protocol — I build it all</p>
          <p className="hero-description">
            A space where creativity and code breathe together.<br />
            Building more than just solutions — creating purposeful experiences.
          </p> */}
          <div className="cta-buttons">
       
  
  <StarBorder
    as="button"
    className="custom-class"
    color="cyan"
    speed="5s"
  >
 
            <Link to="/home"><button className=""  onClick={onProceed}>ENTER THE EXPERIENCE</button></Link>
            
            </StarBorder>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
