'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simple website model component
const WebsiteModel = ({ position, rotation, scale, color, isSelected, onClick }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
    >
      {/* Base/Screen */}
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.2} 
          roughness={0.1}
          emissive={isSelected ? new THREE.Color(0x333333) : new THREE.Color(0x000000)}
        />
      </mesh>
      
      {/* Screen content */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.9, 1.4]} />
        <meshBasicMaterial color="white" />
      </mesh>
      
      {/* Header */}
      <mesh position={[0, 0.6, 0.07]}>
        <planeGeometry args={[1.9, 0.2]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Content blocks */}
      <mesh position={[0, 0.2, 0.07]}>
        <planeGeometry args={[1.5, 0.3]} />
        <meshBasicMaterial color="#f0f0f0" />
      </mesh>
      
      <mesh position={[0, -0.2, 0.07]}>
        <planeGeometry args={[1.5, 0.3]} />
        <meshBasicMaterial color="#f0f0f0" />
      </mesh>
      
      <mesh position={[0, -0.6, 0.07]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[0, 0, -0.06]}>
          <ringGeometry args={[1.1, 1.2, 32]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Camera controller
const CameraController = ({ target }) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...target);
    }
  }, [target]);
  
  return <OrbitControls ref={controlsRef} enableZoom={true} enablePan={false} minDistance={3} maxDistance={10} />;
};

// Main scene component
const Scene = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0]);
  
  const templates = [
    { id: 1, position: [-3, 0, 0], rotation: [0, Math.PI * 0.1, 0], scale: 1, color: '#3B82F6' },
    { id: 2, position: [-1, 0, 0], rotation: [0, 0, 0], scale: 1, color: '#8B5CF6' },
    { id: 3, position: [1, 0, 0], rotation: [0, -Math.PI * 0.1, 0], scale: 1, color: '#EC4899' },
    { id: 4, position: [3, 0, 0], rotation: [0, -Math.PI * 0.2, 0], scale: 1, color: '#10B981' },
  ];
  
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template.id);
    setCameraTarget(template.position);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };
  
  return (
    <Canvas shadows dpr={[1, 2]} style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}>
      <fog attach="fog" args={['#1a1a2e', 5, 15]} />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={50} />
      <CameraController target={cameraTarget} />
      
      <group position={[0, -1, 0]}>
        {templates.map((template) => (
          <WebsiteModel 
            key={template.id}
            position={template.position}
            rotation={template.rotation}
            scale={template.scale}
            color={template.color}
            isSelected={selectedTemplate === template.id}
            onClick={() => handleTemplateClick(template)}
          />
        ))}
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#111122" />
        </mesh>
        
        {/* Grid */}
        <gridHelper args={[50, 50, '#444444', '#222222']} position={[0, -0.99, 0]} />
      </group>
      
      <Environment preset="city" />
    </Canvas>
  );
};

const ThreeScene = ({ onSelectTemplate }) => {
  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-xl">
      <Scene onSelectTemplate={onSelectTemplate} />
    </div>
  );
};

export default ThreeScene;
