// Utility functions for address validation and type detection

export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const isContract = async (address: string): Promise<boolean> => {
  // Mock implementation - in real app would check if address has code
  // For demo purposes, we'll consider certain known contract addresses
  const knownContracts = [
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI token
    '0xa0b86a33e6776c83b5e8e7a9be6b91c46a3b30c4', // Uniswap V3 Router
    '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', // Uniswap V2 Router
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  ];
  
  // Simple heuristic: if it looks like a known contract pattern
  const lowercaseAddress = address.toLowerCase();
  
  // Check known contracts
  if (knownContracts.includes(lowercaseAddress)) {
    return true;
  }
  
  // Simple heuristic: contracts often end with patterns like 0000, or have specific prefixes
  // This is just for demo - real implementation would check on-chain
  return (
    lowercaseAddress.endsWith('0000') ||
    lowercaseAddress.includes('0000000') ||
    Math.random() < 0.3 // 30% chance for demo purposes
  );
};

export const getAddressType = async (address: string): Promise<'wallet' | 'contract'> => {
  if (!isValidEthereumAddress(address)) {
    throw new Error('Invalid Ethereum address');
  }
  
  const isContractAddress = await isContract(address);
  return isContractAddress ? 'contract' : 'wallet';
};