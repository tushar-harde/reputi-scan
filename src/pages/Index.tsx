import { useState } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { WalletDashboard } from '@/components/WalletDashboard';

const Index = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSubmit = (address: string) => {
    setSelectedAddress(address);
  };

  const handleBack = () => {
    setSelectedAddress(null);
  };

  if (selectedAddress) {
    return <WalletDashboard address={selectedAddress} onBack={handleBack} />;
  }

  return <WalletConnect onAddressSubmit={handleAddressSubmit} />;
};

export default Index;
