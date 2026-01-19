import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HapticMatrixProps {
    isActive: boolean;
    intensity: number; // 0-100
    className?: string;
}

export function HapticMatrix({ isActive, intensity, className }: HapticMatrixProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas to match display size
        const resize = () => {
            const { width, height } = canvas.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Matrix Config
        const cols = 40;
        const rows = 30;
        let frame = 0;
        let animationId: number;

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear but keep transparent background

            const cellWidth = canvas.width / cols;
            const cellHeight = canvas.height / rows;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * cellWidth;
                    const y = j * cellHeight;
                    
                    // Simulation Logic
                    let active = false;
                    
                    if (isActive) {
                        // Noise pattern based on time and position
                        const noise = Math.sin(i * 0.2 + frame * 0.1) * Math.cos(j * 0.2 + frame * 0.1);
                        // Intensity threshold
                        if (Math.random() < (intensity / 100) * 0.5 + (noise * 0.2)) {
                            active = true;
                        }
                    }

                    // Draw Needle Point
                    ctx.beginPath();
                    if (active) {
                        ctx.fillStyle = '#00f3ff'; // Neon Cyan
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = '#00f3ff';
                        ctx.arc(x + cellWidth/2, y + cellHeight/2, Math.min(cellWidth, cellHeight) * 0.3, 0, Math.PI * 2);
                    } else {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // Dim dot
                        ctx.shadowBlur = 0;
                        ctx.arc(x + cellWidth/2, y + cellHeight/2, 1, 0, Math.PI * 2);
                    }
                    ctx.fill();
                }
            }
            
            frame++;
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [isActive, intensity]);

    return (
        <canvas 
            ref={canvasRef} 
            className={cn("w-full h-64 rounded-xl border border-white/10 bg-black/40", className)}
        />
    );
}
