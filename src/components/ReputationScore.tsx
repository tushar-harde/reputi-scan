import { useEffect, useState } from 'react';

interface ReputationScoreProps {
  score: number;
  size?: number;
}

export const ReputationScore = ({ score, size = 200 }: ReputationScoreProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);
  
  const circumference = 2 * Math.PI * 85;
  const progress = (animatedScore / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'hsl(var(--success))';
    if (score >= 60) return 'hsl(var(--warning))';
    if (score >= 40) return 'hsl(var(--primary))';
    return 'hsl(var(--destructive))';
  };
  
  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Moderate';
    if (score >= 20) return 'Poor';
    return 'Very Poor';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            fill="transparent"
            className="opacity-20"
          />
          
          {/* Animated progress circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getScoreColor(score)}30)`
            }}
          />
          
          {/* Glow effect */}
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke={getScoreColor(score)}
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="opacity-60 transition-all duration-1000 ease-out"
            style={{
              filter: `blur(4px)`
            }}
          />
        </svg>
        
        {/* Score text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold font-sora" style={{ color: getScoreColor(score) }}>
            {Math.round(animatedScore)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {getScoreLabel(score)}
          </div>
        </div>
      </div>
      
      {/* Score breakdown */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Reputation Score</h3>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Safety</div>
            <div className="font-medium" style={{ color: getScoreColor(score + 10) }}>
              {Math.min(100, score + 10)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Activity</div>
            <div className="font-medium" style={{ color: getScoreColor(score - 5) }}>
              {Math.max(0, score - 5)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Trust</div>
            <div className="font-medium" style={{ color: getScoreColor(score) }}>
              {score}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};