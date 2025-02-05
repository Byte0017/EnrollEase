import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Atom, Binary, Calculator, FlaskRound as Flask, FunctionSquare as Function, Pi, Sigma, Brain, Dna, Microscope, Rocket, Zap } from 'lucide-react';
import io from 'socket.io-client';

// Particle System Configuration
const PARTICLE_COUNT = 50;
const PARTICLE_COLORS = ['#60A5FA', '#818CF8', '#34D399', '#A78BFA'];

// Enhanced Tech Elements with Categories
const techElements = [
  { icon: <Function className="w-6 h-6" />, formula: "∫(e^x)dx = e^x + C", category: "math" },
  { icon: <Pi className="w-6 h-6" />, formula: "E = mc²", category: "physics" },
  { icon: <Atom className="w-6 h-6" />, formula: "ΔG = ΔH - TΔS", category: "chemistry" },
  { icon: <Calculator className="w-6 h-6" />, formula: "F = G(m₁m₂/r²)", category: "physics" },
  { icon: <Sigma className="w-6 h-6" />, formula: "∑(n²) = n(n+1)(2n+1)/6", category: "math" },
  { icon: <Binary className="w-6 h-6" />, formula: "2π = 6.28318530718", category: "math" },
  { icon: <Flask className="w-6 h-6" />, formula: "PV = nRT", category: "chemistry" },
  { icon: <Brain className="w-6 h-6" />, formula: "y = σ(Wx + b)", category: "ai" },
  { icon: <Dna className="w-6 h-6" />, formula: "A-T, G-C", category: "biology" },
  { icon: <Microscope className="w-6 h-6" />, formula: "λ = h/p", category: "physics" },
  { icon: <Rocket className="w-6 h-6" />, formula: "Δv = ve ln(m₀/m₁)", category: "engineering" },
  { icon: <Zap className="w-6 h-6" />, formula: "P = VI", category: "electronics" }
];

// Particle Component
const Particle = ({ index }: { index: number }) => {
  const randomAngle = Math.random() * Math.PI * 2;
  const radius = 100 + Math.random() * 200;
  const x = Math.cos(randomAngle) * radius;
  const y = Math.sin(randomAngle) * radius;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
        left: '50%',
        top: '50%',
      }}
      animate={{
        x: [x, -x, x],
        y: [y, -y, y],
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 10 + Math.random() * 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Enhanced Tech Element Component
const TechElement = ({ x, y, element, mouseX, mouseY }: any) => {
  const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
  const maxDistance = 300;
  const scale = Math.max(1 - distance / maxDistance, 0.8);
  const rotation = (Math.atan2(mouseY - y, mouseX - x) * 180) / Math.PI;

  return (
    <motion.div
      className="absolute flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm"
      style={{
        left: x,
        top: y,
        scale,
        rotate: rotation * 0.1,
        background: `rgba(${distance < 100 ? '99, 102, 241' : '30, 41, 59'}, 0.1)`,
        border: `1px solid rgba(${distance < 100 ? '129, 140, 248' : '71, 85, 105'}, 0.2)`,
      }}
      animate={{
        x: (mouseX - x) * 0.1,
        y: (mouseY - y) * 0.1,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 150,
      }}
    >
      <motion.div
        className="text-cyan-400"
        animate={{ rotate: distance < 100 ? 360 : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {element.icon}
      </motion.div>
      <motion.span
        className="text-sm font-mono text-cyan-300"
        animate={{
          opacity: distance < 200 ? 1 : 0.5,
          scale: distance < 100 ? 1.1 : 1,
        }}
      >
        {element.formula}
      </motion.span>
    </motion.div>
  );
};

// Cursor Trail Effect
const CursorTrail = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: x - 20,
        y: y - 20,
      }}
      transition={{ type: "spring", damping: 15, stiffness: 150 }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10 rounded-full"
          style={{
            background: `rgba(99, 102, 241, ${0.1 - i * 0.02})`,
            transform: `scale(${1 + i * 0.2})`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

function App() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [otherCursors, setOtherCursors] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const rotateX = useTransform(y, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(x, [0, window.innerWidth], [-5, 5]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const socketInstance = io('http://localhost:5000');
    setSocket(socketInstance);

    socketInstance.on('cursor-update', (cursorData: any) => {
      setOtherCursors((prevCursors) => [
        ...prevCursors.filter((cursor) => cursor.id !== cursorData.id),
        cursorData,
      ]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    x.set(event.clientX);
    y.set(event.clientY);
    setMousePosition({ x: event.clientX, y: event.clientY });

    if (socket) {
      socket.emit('cursor-move', {
        id: socket.id,
        x: event.clientX,
        y: event.clientY,
      });
    }
  }, [socket]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)',
      }}
    >
      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(PARTICLE_COUNT)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Glowing Orbs with Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0) 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <motion.div
          className="max-w-5xl text-center"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 relative"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
                Welcome to EnrollEase
              </span>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 -z-10 blur-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(34, 211, 238, 0.3))',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-cyan-200/80 mb-12 font-light"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Experience a seamless and intuitive registration process designed for the modern student
            </motion.p>
            
            <motion.a
              href="/login"
              className="inline-block relative px-12 py-6 text-xl font-semibold rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-[1px] bg-gray-900/90 rounded-xl" />
              <motion.span
                className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 flex items-center gap-3 group-hover:text-white transition-colors duration-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Begin Your Journey
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.div>
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Tech Elements */}
      {techElements.map((element, index) => {
        const angle = (index / techElements.length) * Math.PI * 2;
        const radius = 300;
        const x = window.innerWidth / 2 + Math.cos(angle) * radius;
        const y = window.innerHeight / 2 + Math.sin(angle) * radius;
        
        return (
          <TechElement
            key={index}
            x={x}
            y={y}
            element={element}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
          />
        );
      })}

      {/* Cursor Effects */}
      <CursorTrail x={mousePosition.x} y={mousePosition.y} />

      {/* Other Cursors */}
      {otherCursors.map((cursor) => (
        <motion.div
          key={cursor.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: cursor.x - 20,
            top: cursor.y - 20,
          }}
        >
          <motion.div
            className="w-10 h-10 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0) 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default App;