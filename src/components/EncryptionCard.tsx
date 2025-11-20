import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface EncryptionCardProps {
  title: string;
  description: string;
  result: string;
  time: number;
  icon: React.ReactNode;
  accentColor: "primary" | "accent";
}

const EncryptionCard = ({ title, description, result, time, icon, accentColor }: EncryptionCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={`p-6 border-2 transition-all duration-300 ${
      result ? `border-${accentColor} shadow-lg animate-slide-in` : "border-border"
    } bg-gradient-to-br from-card to-secondary`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${accentColor}/10 text-${accentColor}`}>
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          {time > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time.toFixed(2)}ms
            </Badge>
          )}
        </div>

        {result ? (
          <div className="space-y-3">
            <div className="relative">
              <div className="p-4 bg-background rounded-lg border border-border font-mono text-sm break-all animate-encrypt">
                {result}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full bg-${accentColor} animate-pulse-glow`} />
              Encryption completed
            </div>
          </div>
        ) : (
          <div className="p-8 bg-background rounded-lg border border-dashed border-border text-center text-muted-foreground">
            Waiting for encryption...
          </div>
        )}
      </div>
    </Card>
  );
};

export default EncryptionCard;
