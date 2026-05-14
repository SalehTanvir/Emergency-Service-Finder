const EARTH_RADIUS_KM = 6371;

export function toRad(value) {
  return (value * Math.PI) / 180;
}

export function getDistanceKm(origin, target) {
  if (!origin || !target) return null;

  const latDelta = toRad(target.lat - origin.lat);
  const lngDelta = toRad(target.lng - origin.lng);
  const originLat = toRad(origin.lat);
  const targetLat = toRad(target.lat);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(originLat) * Math.cos(targetLat) * Math.sin(lngDelta / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function sortByDistance(items, origin) {
  return [...items].sort((left, right) => {
    const leftDistance = getDistanceKm(origin, left.location);
    const rightDistance = getDistanceKm(origin, right.location);

    if (leftDistance === null && rightDistance === null) return 0;
    if (leftDistance === null) return 1;
    if (rightDistance === null) return -1;
    return leftDistance - rightDistance;
  });
}

export function formatDistance(distanceKm) {
  if (distanceKm === null || distanceKm === undefined || Number.isNaN(distanceKm)) {
    return null;
  }

  if (distanceKm < 1) {
    return `${Math.max(0.1, distanceKm).toFixed(1)} km`;
  }

  return `${distanceKm.toFixed(1)} km`;
}
