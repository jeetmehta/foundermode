// Mock function to simulate fetching earnings
export const fetchEarnings = async (): Promise<number> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate a random earning between $0 and $1000
  const earnings = Math.random() * 1000;
  return Number(earnings.toFixed(2));
};
