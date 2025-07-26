import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, TrendingUp, Clock, Code, AlertTriangle } from 'lucide-react';

interface ContractAnalysisProps {
  address: string;
}

export const ContractAnalysis = ({ address }: ContractAnalysisProps) => {
  // Mock contract data - in real app would fetch from API
  const contractData = {
    name: "Uniswap V3 Router",
    type: "DEX Router",
    verified: true,
    securityScore: 92,
    totalValue: "$2.1B",
    uniqueUsers: "1.2M",
    dailyTxs: "45,231",
    deployedDate: "May 2021",
    compiler: "Solidity 0.8.17",
    audits: ["Trail of Bits", "ConsenSys Diligence"],
    riskFactors: [
      { type: "Medium", description: "Complex upgrade mechanism" },
      { type: "Low", description: "External dependencies" }
    ],
    functionCalls: [
      { name: "swapExactTokensForTokens", count: 12567, percentage: 35 },
      { name: "addLiquidity", count: 8901, percentage: 25 },
      { name: "removeLiquidity", count: 7234, percentage: 20 },
      { name: "swapTokensForExactTokens", count: 7199, percentage: 20 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Contract Header */}
      <Card className="elevated-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold font-sora">{contractData.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary">{contractData.type}</Badge>
              {contractData.verified && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{contractData.securityScore}</div>
            <div className="text-sm text-muted-foreground">Security Score</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{contractData.totalValue}</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{contractData.uniqueUsers}</div>
            <div className="text-sm text-muted-foreground">Unique Users</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{contractData.dailyTxs}</div>
            <div className="text-sm text-muted-foreground">Daily Txs</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{contractData.deployedDate}</div>
            <div className="text-sm text-muted-foreground">Deployed</div>
          </div>
        </div>
      </Card>

      {/* Technical Details */}
      <Card className="elevated-card p-6">
        <h3 className="text-lg font-semibold font-sora mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Technical Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Compiler Version:</span>
              <span className="font-medium">{contractData.compiler}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract Type:</span>
              <span className="font-medium">{contractData.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Verification:</span>
              <Badge variant={contractData.verified ? "default" : "destructive"}>
                {contractData.verified ? "Verified" : "Unverified"}
              </Badge>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-muted-foreground block mb-2">Security Audits:</span>
              <div className="space-y-1">
                {contractData.audits.map((audit, index) => (
                  <Badge key={index} variant="outline" className="mr-2">
                    {audit}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Function Usage */}
      <Card className="elevated-card p-6">
        <h3 className="text-lg font-semibold font-sora mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Most Used Functions
        </h3>
        <div className="space-y-4">
          {contractData.functionCalls.map((func, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{func.name}</span>
                <span className="text-muted-foreground">{func.count.toLocaleString()} calls</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${func.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Assessment */}
      <Card className="elevated-card p-6">
        <h3 className="text-lg font-semibold font-sora mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Risk Assessment
        </h3>
        <div className="space-y-3">
          {contractData.riskFactors.map((risk, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card border">
              <span className="text-sm">{risk.description}</span>
              <Badge 
                variant={risk.type === 'Low' ? 'default' : risk.type === 'Medium' ? 'secondary' : 'destructive'}
              >
                {risk.type} Risk
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};