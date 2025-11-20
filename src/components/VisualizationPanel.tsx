import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface VisualizationPanelProps {
  isEncrypting: boolean;
  mode: string;
}

const VisualizationPanel = ({ isEncrypting, mode }: VisualizationPanelProps) => {
  const [desProgress, setDesProgress] = useState(0);
  const [tripleDesProgress, setTripleDesProgress] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    if (isEncrypting) {
      setDesProgress(0);
      setTripleDesProgress(0);
      setCurrentRound(0);

      const interval = setInterval(() => {
        setDesProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 6.25; // 16 rounds for DES
        });
        setTripleDesProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 2.08; // 48 rounds for 3DES
        });
        setCurrentRound(prev => {
          if (prev >= 48) return 48;
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isEncrypting]);

  return (
    <Card className="p-6 bg-card border-border animate-slide-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">Encryption Process Visualization</h3>
          {isEncrypting && (
            <RefreshCw className="w-6 h-6 text-primary animate-spin" />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DES Visualization */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              <h4 className="text-lg font-semibold text-primary">DES Process</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Round {Math.min(Math.floor(currentRound / 3), 16)} of 16</span>
                <span>{Math.round(desProgress)}%</span>
              </div>
              <Progress value={desProgress} className="h-2" />
            </div>

            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex-1 p-2 bg-secondary rounded text-center">
                  Initial Permutation
                </div>
                <ArrowRight className="w-4 h-4 text-primary" />
                <div className="flex-1 p-2 bg-secondary rounded text-center">
                  16 Rounds
                </div>
                <ArrowRight className="w-4 h-4 text-primary" />
                <div className="flex-1 p-2 bg-secondary rounded text-center">
                  Final Permutation
                </div>
              </div>
            </div>
          </div>

          {/* 3DES Visualization */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
              <h4 className="text-lg font-semibold text-accent">3DES Process</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Round {Math.min(currentRound, 48)} of 48</span>
                <span>{Math.round(tripleDesProgress)}%</span>
              </div>
              <Progress value={tripleDesProgress} className="h-2" />
            </div>

            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex-1 p-2 bg-secondary rounded text-center">
                    DES Encrypt (K1)
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex-1 p-2 bg-secondary rounded text-center">
                    DES Decrypt (K2)
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex-1 p-2 bg-secondary rounded text-center">
                    DES Encrypt (K3)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="flex items-center gap-3 text-sm">
            <div className="font-semibold">Mode:</div>
            <div className="px-3 py-1 bg-primary/20 text-primary rounded-full">
              {mode}
            </div>
            <div className="text-muted-foreground ml-auto">
              {mode === "CBC" ? "Cipher Block Chaining" : "Electronic Codebook"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VisualizationPanel;
