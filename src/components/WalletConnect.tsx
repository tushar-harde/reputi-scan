import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Wallet, Copy, Search } from 'lucide-react';

interface WalletConnectProps {
  onAddressSubmit: (address: string) => void;
}

export const WalletConnect = ({ onAddressSubmit }: WalletConnectProps) => {
  const [manualAddress, setManualAddress] = useState('');
  
  const handleConnectWallet = () => {
    // Mock wallet connection - in real app would integrate with Web3 provider
    const mockAddress = '0x1234567890123456789012345678901234567890';
    onAddressSubmit(mockAddress);
  };
  
  const handleManualSubmit = () => {
    if (manualAddress.trim()) {
      onAddressSubmit(manualAddress.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full web3-gradient glow-effect mb-4">
            <Wallet className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-sora bg-gradient-primary bg-clip-text text-transparent">
            Wallet Reputation AI
          </h1>
          <p className="text-muted-foreground text-lg">
            Analyze any Ethereum wallet's reputation with AI-powered insights
          </p>
        </div>

        {/* Connection Options */}
        <div className="space-y-6">
          {/* Wallet Connect */}
          <Card className="elevated-card p-6 hover-lift">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-sora">Connect Your Wallet</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleConnectWallet}
                  className="h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  MetaMask
                </Button>
                <Button 
                  onClick={handleConnectWallet}
                  variant="secondary"
                  className="h-12"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  WalletConnect
                </Button>
              </div>
            </div>
          </Card>

          {/* Manual Entry */}
          <Card className="elevated-card p-6 hover-lift">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-sora">Manual Address Entry</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="0x... or ENS name"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                  className="flex-1 h-12 bg-input border-border/50"
                />
                <Button 
                  onClick={handleManualSubmit}
                  disabled={!manualAddress.trim()}
                  className="h-12 px-4 bg-gradient-primary hover:opacity-90"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Get instant insights including:</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-accent">🧠 Activity Analysis</span>
            <span className="px-2 py-1 rounded-full bg-accent">📊 Risk Assessment</span>
            <span className="px-2 py-1 rounded-full bg-accent">🎯 Behavior Tags</span>
          </div>
        </div>
      </div>
    </div>
  );
};