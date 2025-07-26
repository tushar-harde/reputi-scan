import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReputationScore } from './ReputationScore';
import { ReputationTags, SAMPLE_TAGS } from './ReputationTags';
import { WalletCharts } from './WalletCharts';
import { ContractAnalysis } from './ContractAnalysis';
import { ArrowLeft, Copy, ExternalLink, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAddressType } from '@/utils/addressUtils';

interface WalletDashboardProps {
  address: string;
  onBack: () => void;
}

export const WalletDashboard = ({ address, onBack }: WalletDashboardProps) => {
  const [showComparison, setShowComparison] = useState(false);
  const [addressType, setAddressType] = useState<'wallet' | 'contract' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAddressType = async () => {
      try {
        const type = await getAddressType(address);
        setAddressType(type);
      } catch (error) {
        console.error('Error checking address type:', error);
        setAddressType('wallet'); // Default to wallet
      }
    };
    
    checkAddressType();
  }, [address]);
  
  // Mock data - in real app would fetch from API
  const mockData = {
    score: 78,
    summary: "This wallet demonstrates sophisticated DeFi engagement with a strong focus on yield farming and governance participation. The holder shows diamond hands behavior during market volatility and maintains a diverse protocol exposure. Risk factors are minimal with no detected bot activity or suspicious patterns.",
    tags: SAMPLE_TAGS.slice(0, 6), // Show first 6 tags
    balance: "42.7 ETH",
    totalTxs: 1547,
    firstSeen: "March 2021",
    lastActivity: "2 hours ago"
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold font-sora">
                {addressType === 'contract' ? 'Contract Analysis' : 'Wallet Analysis'}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{formatAddress(address)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setShowComparison(!showComparison)}
            variant="outline"
            className="hover:bg-accent"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {showComparison ? 'Hide' : 'Compare'}
          </Button>
        </div>

        {/* Main Content */}
        <div className={`grid gap-6 ${showComparison ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Primary Analysis */}
          <div className="space-y-6">
            {addressType === 'contract' ? (
              <ContractAnalysis address={address} />
            ) : (
              <>
                {/* Wallet Stats */}
                <Card className="elevated-card p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mockData.balance}</div>
                      <div className="text-sm text-muted-foreground">Balance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockData.totalTxs.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Transactions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockData.firstSeen}</div>
                      <div className="text-sm text-muted-foreground">First Seen</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockData.lastActivity}</div>
                      <div className="text-sm text-muted-foreground">Last Activity</div>
                    </div>
                  </div>
                </Card>

                {/* Reputation Score */}
                <Card className="elevated-card p-6">
                  <ReputationScore score={mockData.score} />
                </Card>

                {/* AI Summary */}
                <Card className="elevated-card p-6">
                  <h3 className="text-lg font-semibold font-sora mb-4">AI Analysis Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockData.summary}
                  </p>
                </Card>

                {/* Reputation Tags */}
                <Card className="elevated-card p-6">
                  <ReputationTags tags={mockData.tags} />
                </Card>

                {/* Charts */}
                <WalletCharts />
              </>
            )}
          </div>

          {/* Comparison Panel */}
          {showComparison && (
            <div className="space-y-6">
              <Card className="elevated-card p-6">
                <h3 className="text-lg font-semibold font-sora mb-4">Compare with Another Wallet</h3>
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Enter another wallet address to compare</p>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Add Wallet for Comparison
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};