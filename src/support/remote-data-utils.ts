import { Dispensary } from '@dutchiesdk/ecommerce-extensions-sdk';

export const groupLocationsByState = (locations: Dispensary[]) => {
  const grouped = locations.reduce(
    (acc, location) => {
      acc[location.address.state] = acc[location.address.state] || [];
      acc[location.address.state].push(location);
      acc[location.address.state].sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    },
    {} as Record<string, Dispensary[]>
  );

  return Object.keys(grouped)
    .sort()
    .reduce(
      (acc, state) => {
        acc[state] = grouped[state];
        return acc;
      },
      {} as Record<string, Dispensary[]>
    );
};
