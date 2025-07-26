import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ReputationTag {
  emoji: string;
  label: string;
  description: string;
  type: 'positive' | 'neutral' | 'negative';
}

interface ReputationTagsProps {
  tags: ReputationTag[];
}

export const ReputationTags = ({ tags }: ReputationTagsProps) => {
  const getTagVariant = (type: string) => {
    switch (type) {
      case 'positive':
        return 'default';
      case 'negative':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getTagStyles = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-gradient-success border-success/30 text-success-foreground hover-lift';
      case 'negative':
        return 'bg-gradient-danger border-destructive/30 text-destructive-foreground hover-lift';
      default:
        return 'bg-gradient-secondary border-border/30 hover-lift';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold font-sora">Reputation Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Badge
                variant={getTagVariant(tag.type)}
                className={`px-3 py-2 text-sm cursor-help transition-all duration-200 ${getTagStyles(tag.type)}`}
              >
                <span className="mr-2">{tag.emoji}</span>
                {tag.label}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tag.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

// Predefined tags for demo
export const SAMPLE_TAGS: ReputationTag[] = [
  {
    emoji: '🧠',
    label: 'Degen',
    description: 'Frequently trades high-risk, high-reward tokens and experimental DeFi protocols',
    type: 'neutral'
  },
  {
    emoji: '🎨',
    label: 'NFT Flipper',
    description: 'Actively buys and sells NFTs for profit with quick turnover times',
    type: 'neutral'
  },
  {
    emoji: '🪙',
    label: 'Whale',
    description: 'Holds significant amounts of cryptocurrency with large transaction volumes',
    type: 'positive'
  },
  {
    emoji: '🧲',
    label: 'Airdrop Hunter',
    description: 'Participates in multiple protocols to qualify for potential airdrops',
    type: 'neutral'
  },
  {
    emoji: '💎',
    label: 'Diamond Hands',
    description: 'Demonstrates long-term holding behavior even during market volatility',
    type: 'positive'
  },
  {
    emoji: '🧼',
    label: 'Reputable Holder',
    description: 'Maintains clean transaction history with established DeFi protocols',
    type: 'positive'
  },
  {
    emoji: '👨‍💼',
    label: 'Long-Term Investor',
    description: 'Shows strategic investment patterns with extended holding periods',
    type: 'positive'
  },
  {
    emoji: '🗳️',
    label: 'Verified DAO Voter',
    description: 'Actively participates in governance voting across multiple DAOs',
    type: 'positive'
  },
  {
    emoji: '⚠️',
    label: 'High Risk',
    description: 'Engages with protocols or tokens flagged as potentially risky',
    type: 'negative'
  },
  {
    emoji: '🔗',
    label: 'Bridge Risk',
    description: 'Frequently uses cross-chain bridges which may increase exposure to smart contract risks',
    type: 'negative'
  },
  {
    emoji: '🤖',
    label: 'Bot-like Activity',
    description: 'Transaction patterns suggest possible automated or bot-driven behavior',
    type: 'negative'
  },
  {
    emoji: '📉',
    label: 'Token Approval Risk',
    description: 'Has granted excessive token approvals that could pose security risks',
    type: 'negative'
  }
];