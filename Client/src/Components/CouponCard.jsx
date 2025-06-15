import { useRef, useEffect, useState } from "react";

export default function ScratchCard() {
  // Refs and state management
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false); // Tracks if coupon is revealed
  const [isDrawing, setIsDrawing] = useState(false); // Tracks scratching motion
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // Canvas dimensions

  // Responsive canvas sizing
  useEffect(() => {
    const updateDimensions = () => {
      const maxWidth = 600;
      const cardWidth = Math.min(window.innerWidth - 32, maxWidth); // 32px = 2*16px padding
      setDimensions({ width: cardWidth, height: cardWidth * 0.6 }); // 3:2 aspect ratio
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Canvas initialization and scratch layer setup
  useEffect(() => {
    const drawScratchLayer = () => {
      if (!canvasRef.current || dimensions.width === 0) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      // Set physical canvas size
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Create scratch overlay
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#1a1a1a"; // Dark gray scratch layer
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add instructional text
      ctx.fillStyle = "#4a4a4a";
      ctx.font = `bold ${dimensions.width / 15}px Arial`; // Responsive font size
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch This Card", canvas.width / 2, canvas.height / 2);

      // Configure for erase effect
      ctx.globalCompositeOperation = "destination-out"; // Makes drawing erase existing content
    };

    drawScratchLayer();
  }, [dimensions]);

  // Scratch interaction handlers
  const startScratch = () => setIsDrawing(true);
  const stopScratch = () => setIsDrawing(false);

  const handleScratch = (e) => {
    if (!isDrawing || revealed || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    // Cross-browser coordinate handling
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    // Create circular erase effect
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // 20px radius eraser
    ctx.fill();

    checkScratchProgress();
  };

  // Progress tracking and reveal logic
  const checkScratchProgress = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clearCount = 0;

    // Analyze pixel data (RGBA format)
    for (let i = 3; i < pixels.length; i += 4) { // Check alpha channel only
      if (pixels[i] === 0) clearCount++; // Count transparent pixels
    }

    // Calculate cleared percentage
    const clearedPercentage = (clearCount / (canvas.width * canvas.height)) * 100;
    
    // Reveal threshold check
    if (clearedPercentage > 20) {
      setRevealed(true);
      // Clear canvas after animation
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 500); // Match animation duration
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-white text-xl md:text-2xl font-semibold text-center">
          Scratch this to reveal your discount coupon
        </h2>
        
        {/* Card container with gradient border */}
        <div className="w-full max-w-3xl relative border-2 border-emerald-400/30 rounded-xl overflow-hidden 
                        bg-gradient-to-br from-gray-900 to-gray-800 p-1">
          <div className="relative w-full aspect-[3/2] flex items-center justify-center">
            {revealed ? (
              // Revealed content
              <div className="animate-fade-in">
                <span className="text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 
                               bg-clip-text text-transparent">
                  DISCOUNT50
                </span>
              </div>
            ) : (
              // Scratch canvas
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
                onMouseDown={startScratch}
                onMouseUp={stopScratch}
                onMouseMove={handleScratch}
                onTouchStart={startScratch}
                onTouchEnd={stopScratch}
                onTouchMove={handleScratch}
              />
            )}
          </div>
        </div>

        {/* Instruction text */}
        <p className="text-gray-400 text-sm text-center mt-4">
          * Scratch at least 20% of the area to reveal the coupon code
        </p>
      </div>
    </div>
  );
}