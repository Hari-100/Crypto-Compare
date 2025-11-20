import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, Key, Zap } from "lucide-react";
import EncryptionCard from "@/components/EncryptionCard";
import VisualizationPanel from "@/components/VisualizationPanel";
import ParametersPanel from "@/components/ParametersPanel";
import { toast } from "sonner";

const Index = () => {
  const [plaintext, setPlaintext] = useState("Hello, Cryptography!");
  const [desKey, setDesKey] = useState("");
  const [tripleDesKey, setTripleDesKey] = useState("");
  const [mode, setMode] = useState<"ECB" | "CBC">("CBC");
  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [desResult, setDesResult] = useState("");
  const [tripleDesResult, setTripleDesResult] = useState("");
  const [desTime, setDesTime] = useState(0);
  const [tripleDesTime, setTripleDesTime] = useState(0);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateRandomKey = (bits: 64 | 192) => {
    const bytes = bits / 8;
    const array = new Uint8Array(bytes);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleGenerateKeys = () => {
    const desKeyGenerated = generateRandomKey(64);
    const tripleDesKeyGenerated = generateRandomKey(192);
    setDesKey(desKeyGenerated);
    setTripleDesKey(tripleDesKeyGenerated);
    toast.success("Keys generated successfully!");
  };

  const handleEncrypt = () => {
    if (!plaintext.trim()) {
      toast.error("Please enter plaintext to encrypt");
      return;
    }
    if (!desKey || !tripleDesKey) {
      toast.error("Please generate or enter encryption keys");
      return;
    }

    setIsEncrypting(true);
    setShowVisualization(true);

    // Simulate encryption process with timing
    setTimeout(() => {
      // DES encryption simulation
      const desStart = performance.now();
      // In a real implementation, you'd use CryptoJS here
      const desEncrypted = btoa(plaintext + "-DES-" + mode);
      const desEnd = performance.now();
      setDesTime(desEnd - desStart);
      setDesResult(encoding === "hex" ? Array.from(desEncrypted).map(c => c.charCodeAt(0).toString(16)).join("") : desEncrypted);

      // 3DES encryption simulation
      const tripleDesStart = performance.now();
      const tripleDesEncrypted = btoa(plaintext + "-3DES-" + mode);
      const tripleDesEnd = performance.now();
      setTripleDesTime(tripleDesEnd - tripleDesStart);
      setTripleDesResult(encoding === "hex" ? Array.from(tripleDesEncrypted).map(c => c.charCodeAt(0).toString(16)).join("") : tripleDesEncrypted);

      setIsEncrypting(false);
      toast.success("Encryption completed!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CryptoCompare
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization and comparison of DES vs 3DES encryption algorithms
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border shadow-lg">
          <div className="space-y-4">
            <div>
              <Label htmlFor="plaintext" className="text-lg font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Plaintext Input
              </Label>
              <Input
                id="plaintext"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter text to encrypt..."
                className="mt-2 text-lg bg-background border-border focus:ring-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="desKey" className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" />
                  DES Key (64-bit / 16 hex chars)
                </Label>
                <Input
                  id="desKey"
                  value={desKey}
                  onChange={(e) => setDesKey(e.target.value)}
                  placeholder="Auto-generated or enter key..."
                  className="mt-2 font-mono bg-background border-border"
                  maxLength={16}
                />
              </div>

              <div>
                <Label htmlFor="tripleDesKey" className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-accent" />
                  3DES Key (192-bit / 48 hex chars)
                </Label>
                <Input
                  id="tripleDesKey"
                  value={tripleDesKey}
                  onChange={(e) => setTripleDesKey(e.target.value)}
                  placeholder="Auto-generated or enter key..."
                  className="mt-2 font-mono bg-background border-border"
                  maxLength={48}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={handleGenerateKeys} variant="outline" className="flex-1 min-w-[200px]">
                <Zap className="w-4 h-4 mr-2" />
                Generate Keys
              </Button>
              <Button 
                onClick={handleEncrypt} 
                className="flex-1 min-w-[200px] bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={isEncrypting}
              >
                {isEncrypting ? "Encrypting..." : "Encrypt Both"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Parameters Panel */}
        <ParametersPanel 
          mode={mode}
          setMode={setMode}
          encoding={encoding}
          setEncoding={setEncoding}
        />

        {/* Visualization Panel */}
        {showVisualization && (
          <VisualizationPanel isEncrypting={isEncrypting} mode={mode} />
        )}

        {/* Results Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <EncryptionCard
            title="DES Encryption"
            description="Data Encryption Standard (56-bit effective key)"
            result={desResult}
            time={desTime}
            icon={<Lock className="w-6 h-6" />}
            accentColor="primary"
          />

          <EncryptionCard
            title="3DES Encryption"
            description="Triple DES (168-bit effective key)"
            result={tripleDesResult}
            time={tripleDesTime}
            icon={<Shield className="w-6 h-6" />}
            accentColor="accent"
          />
        </div>

        {/* Information Section */}
        <Card className="p-6 bg-card border-border">
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="des">DES Details</TabsTrigger>
              <TabsTrigger value="3des">3DES Details</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison" className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-primary">DES vs 3DES Comparison</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">DES (Data Encryption Standard)</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>56-bit effective key length</li>
                    <li>64-bit block size</li>
                    <li>16 rounds of processing</li>
                    <li>Considered insecure for modern use</li>
                    <li>Faster but less secure</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-accent">3DES (Triple DES)</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>168-bit effective key length</li>
                    <li>64-bit block size</li>
                    <li>48 rounds (3 × 16 rounds)</li>
                    <li>More secure than DES</li>
                    <li>Slower but stronger security</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="des" className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-primary">DES Algorithm Details</h3>
              <p className="text-muted-foreground">
                DES is a symmetric-key algorithm that uses a 56-bit key to encrypt 64-bit blocks of data. 
                It employs 16 rounds of Feistel network structure with substitution and permutation operations.
              </p>
            </TabsContent>
            <TabsContent value="3des" className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-accent">3DES Algorithm Details</h3>
              <p className="text-muted-foreground">
                3DES applies the DES algorithm three times to each data block with three different keys. 
                This significantly increases security while maintaining backward compatibility with DES.
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;
