import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface ParametersPanelProps {
  mode: "ECB" | "CBC";
  setMode: (mode: "ECB" | "CBC") => void;
  encoding: "hex" | "base64";
  setEncoding: (encoding: "hex" | "base64") => void;
}

const ParametersPanel = ({ mode, setMode, encoding, setEncoding }: ParametersPanelProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Encryption Parameters</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mode">Cipher Mode</Label>
            <Select value={mode} onValueChange={(value: "ECB" | "CBC") => setMode(value)}>
              <SelectTrigger id="mode" className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ECB">ECB (Electronic Codebook)</SelectItem>
                <SelectItem value="CBC">CBC (Cipher Block Chaining)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {mode === "CBC" ? "More secure, uses IV" : "Simpler, less secure"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="encoding">Output Encoding</Label>
            <Select value={encoding} onValueChange={(value: "hex" | "base64") => setEncoding(value)}>
              <SelectTrigger id="encoding" className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hex">Hexadecimal</SelectItem>
                <SelectItem value="base64">Base64</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Format for encrypted output
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="padding">Padding Scheme</Label>
            <Select defaultValue="pkcs7" disabled>
              <SelectTrigger id="padding" className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pkcs7">PKCS#7</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              PKCS#7 standard padding
            </p>
          </div>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-foreground mb-1">Block Size</div>
              <div className="text-muted-foreground">64 bits (8 bytes) for both DES and 3DES</div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Key Generation</div>
              <div className="text-muted-foreground">Cryptographically secure random generation</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParametersPanel;
