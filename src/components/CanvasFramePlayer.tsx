import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FrameManifest } from '../types/manifest';

interface CanvasFramePlayerProps {
  scrollProgress: number; // 0.0 to 1.0
  onFrameUpdate?: (currentFrame: number, totalFrames: number, progressPercent: number) => void;
  sequenceName?: string;
}

export const CanvasFramePlayer: React.FC<CanvasFramePlayerProps> = ({
  scrollProgress,
  onFrameUpdate,
  sequenceName = 'biologicals-macro',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [manifest, setManifest] = useState<FrameManifest | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const currentFrameRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // 1. Fetch manifest
  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const res = await fetch(`/frames/${sequenceName}/manifest.json`);
        if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status}`);
        const data: FrameManifest = await res.json();
        setManifest(data);
      } catch (err) {
        console.error('Failed to load frame sequence manifest:', err);
      }
    };
    fetchManifest();
  }, [sequenceName]);

  // 2. Check mobile tier
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 3. Preload all frame images
  useEffect(() => {
    if (!manifest) return;

    let isSubscribed = true;
    const totalFrames = manifest.frameCount;
    const tier = isMobile ? manifest.mobile : manifest.desktop;
    const subDir = tier.dir;

    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/frames/${sequenceName}/${subDir}frame_${frameNum}.${manifest.format}`;
      
      img.onload = () => {
        if (!isSubscribed) return;
        loadedImages[i - 1] = img;
        loadedCount++;

        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isSubscribed) return;
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
    }

    return () => {
      isSubscribed = false;
    };
  }, [manifest, isMobile, sequenceName]);

  // 4. Render frame to canvas (Full Cover Mode - Restored)
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = images.length;
    const clampedIdx = Math.max(0, Math.min(total - 1, frameIdx));
    const img = images[clampedIdx];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Natural aspect ratio cover fitting (Full screen cover mode restored)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();

    if (onFrameUpdate) {
      onFrameUpdate(clampedIdx + 1, total, ((clampedIdx + 1) / total) * 100);
    }
  }, [images, onFrameUpdate]);

  // 5. Update canvas on scroll
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const targetFrame = Math.round(scrollProgress * (images.length - 1));
    currentFrameRef.current = targetFrame;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      renderFrame(currentFrameRef.current);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollProgress, isLoaded, images, renderFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  return (
    <div className="relative w-full h-full bg-[#050B14] overflow-hidden select-none flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block transition-opacity duration-300 pointer-events-none"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
};
