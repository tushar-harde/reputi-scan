import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample data
const protocolData = [
  { name: 'Uniswap', value: 35, color: '#FF6B9D' },
  { name: 'Aave', value: 25, color: '#9D4EDD' },
  { name: 'Compound', value: 20, color: '#4EA5D9' },
  { name: 'Curve', value: 15, color: '#47A856' },
  { name: 'Others', value: 5, color: '#FFB347' }
];

const nftHoldData = [
  { collection: 'Azuki', avgDays: 45, count: 3 },
  { collection: 'Pudgy Penguins', avgDays: 120, count: 2 },
  { collection: 'BAYC', avgDays: 180, count: 1 },
  { collection: 'CryptoPunks', avgDays: 360, count: 1 },
  { collection: 'Art Blocks', avgDays: 90, count: 4 }
];

const gasSpendingData = [
  { month: 'Jan', gas: 0.8 },
  { month: 'Feb', gas: 1.2 },
  { month: 'Mar', gas: 0.6 },
  { month: 'Apr', gas: 2.1 },
  { month: 'May', gas: 1.8 },
  { month: 'Jun', gas: 1.4 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const WalletCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Protocol Usage Pie Chart */}
      <Card className="elevated-card p-6 hover-lift">
        <h3 className="text-lg font-semibold font-sora mb-4">Protocol Usage</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={protocolData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={12}
              >
                {protocolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* NFT Hold Duration Bar Chart */}
      <Card className="elevated-card p-6 hover-lift">
        <h3 className="text-lg font-semibold font-sora mb-4">NFT Hold Duration</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nftHoldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="collection" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="avgDays" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Gas Spending Line Chart */}
      <Card className="elevated-card p-6 hover-lift lg:col-span-2 xl:col-span-1">
        <h3 className="text-lg font-semibold font-sora mb-4">Gas Spending (ETH)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gasSpendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'ETH', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="gas" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--primary-glow))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};