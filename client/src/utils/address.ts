export function isValidEthereumAddress(address:string) {
  if (typeof address !== 'string') return false;
  if (!address.startsWith('0x')) return false;
  if (address.length !== 42) return false;
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
  
  return true;
}