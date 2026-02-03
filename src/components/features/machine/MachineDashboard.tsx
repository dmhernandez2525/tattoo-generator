'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { HapticMatrix } from './HapticMatrix';
import { Activity, Power, Zap, Gauge, ChevronLeft } from 'lucide-react';

interface MachineSettings {
    voltage: number;
    frequency: number;
    depth: number;
}

interface MachineDashboardProps {
    onBack: () => void;
    onSettingsChange?: (settings: MachineSettings) => void;
}

export function MachineDashboard({ onBack, onSettingsChange }: MachineDashboardProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    
    // Calibration State
    const [depth, setDepth] = useState([1.2]); // mm
    const [speed, setSpeed] = useState([85]); // Hz
    const [voltage, setVoltage] = useState([7.5]); // V

    useEffect(() => {
        if (!onSettingsChange) return;
        onSettingsChange({
            voltage: voltage[0] ?? 7.5,
            frequency: speed[0] ?? 85,
            depth: depth[0] ?? 1.2,
        });
    }, [depth, speed, voltage, onSettingsChange]);

    // Connection Simulation
    useEffect(() => {
        const timer = setTimeout(() => setIsConnected(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const togglePrint = () => {
        setIsPrinting(!isPrinting);
    };

    return (
        <div className="w-full max-w-5xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
             {/* Header */}
             <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Disconnect
                </Button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 animate-pulse'}`} />
                        <span className="font-mono text-sm text-slate-400">{isConnected ? 'SYSTEM ONLINE' : 'SEARCHING...'}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualizer Panel */}
                <Card variant="neon" className="lg:col-span-2 min-h-[400px] flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neon-cyan">
                            <Activity className="w-5 h-5" />
                            HAPTIC NEEDLE MATRIX
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-6 flex flex-col gap-4">
                        <HapticMatrix isActive={isPrinting} intensity={speed[0] ?? 85} className="flex-1 w-full" />
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                                <div className="text-xs text-slate-400 uppercase tracking-wider">Active Needles</div>
                                <div className="text-2xl font-display font-bold text-white">{isPrinting ? '1,024' : '0'}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                                <div className="text-xs text-slate-400 uppercase tracking-wider">Pressure</div>
                                <div className="text-2xl font-display font-bold text-white">{isPrinting ? '450g' : '0g'}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                                <div className="text-xs text-slate-400 uppercase tracking-wider">Temp</div>
                                <div className="text-2xl font-display font-bold text-white">34°C</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Controls Panel */}
                <Card className="flex flex-col gap-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gauge className="w-5 h-5" />
                            CALIBRATION
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Voltage */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-slate-300">Voltage</label>
                                <span className="font-mono text-neon-purple">{voltage}V</span>
                            </div>
                            <Slider value={voltage} onValueChange={setVoltage} min={4} max={12} step={0.1} />
                        </div>

                        {/* Speed */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-slate-300">Frequency</label>
                                <span className="font-mono text-neon-cyan">{speed}Hz</span>
                            </div>
                            <Slider value={speed} onValueChange={setSpeed} min={0} max={150} step={1} />
                        </div>

                         {/* Depth */}
                         <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-slate-300">Needle Depth</label>
                                <span className="font-mono text-white">{depth}mm</span>
                            </div>
                            <Slider value={depth} onValueChange={setDepth} min={0.1} max={4.0} step={0.1} />
                        </div>

                        <div className="pt-4">
                            <Button 
                                className={`w-full h-14 text-lg font-bold tracking-widest transition-all duration-300 ${isPrinting ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-neon-cyan text-black hover:bg-neon-cyan/90 shadow-[0_0_30px_rgba(0,243,255,0.4)]'}`}
                                onClick={togglePrint}
                            >
                                {isPrinting ? (
                                    <>
                                        <Power className="w-6 h-6 mr-2" /> ABORT
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-6 h-6 mr-2" /> INITIATE IMPRINT
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
