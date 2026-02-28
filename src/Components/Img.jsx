import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Img.css';
gsap.registerPlugin(useGSAP, ScrollTrigger); // register the hook and ScrollTrigger to avoid React version discrepancies 

export default function Img() {
  const containerRef = useRef(null);
  const imageRef = useRef([]);

  const imagesoureses=[
    "/images/p1.jpg",
    "/images/s2.jpg",
    "/images/s1.jpg",
    "/images/s3.jpg",
    "/images/s4.jpg",
    "/images/s5.jpg",
  ]

  useGSAP(() => {
    const images = imageRef.current;

    const startPositions = [
      { x: "-120vw", y: "-50vh" },
      { x: "120vw", y: "-60vh" },
      { x: "-130vw", y: "60vh" },
      { x: "130vw", y: "50vh" },
      { x: "0vw", y: "-120vh" },
      { x: "10vw", y: "100vh" },
    ];

    const finalPositions = [
      { x: "-40%", y: "20%", rotation: 7 },
      { x: "40%", y: "-45%", rotation: -12 },
      { x: "-45%", y: "-35%", rotation: 10 },
      { x: "20%", y: "25%", rotation: -15 },
      { x: "45%", y: "-15%", rotation: -5 },
      { x: "0%", y: "0%", rotation: 0 },
    ];

    // Set initial positions
    images.forEach((image, i) => {
      gsap.set(image, {
        x: startPositions[i].x,
        y: startPositions[i].y,
        rotation: gsap.utils.random(-60, 60),
        scale: 0.5,
        visibility: "visible",
      });
    });

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate to final positions
    images.forEach((image, i) => {
      tl.to(
        image,
        {
          x: finalPositions[i].x,
          y: finalPositions[i].y,
          rotation: finalPositions[i].rotation,
          scale: 1,
          ease: "power2.out",
          duration: 1,
        },
        i * 0.2
      );
    });
  }, { scope: containerRef });


return (
  <section className="container" ref={containerRef}>
    <div className="center-point">
     {imagesoureses.map((src,index)=>(
     <div
     key={index}
     className="image-wrapper"
     ref={(el) => (imageRef.current[index] = el)} 
     >
      <img src={src} alt={`Image ${index + 1}`} />
      </div>
      ))}

    </div>
  </section>
);

}