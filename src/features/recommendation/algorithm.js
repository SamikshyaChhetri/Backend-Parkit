function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  // Convert to radians
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestListing(userLocation, listings, count = 4) {
  // Input validation
  if (!userLocation) {
    console.error("Invalid user location:", userLocation);
    return null;
  }

  if (!listings || !Array.isArray(listings) || listings.length === 0) {
    console.error("Invalid or empty listings array:", listings);
    return null;
  }

  // Parse user location coordinates
  const userLat = parseFloat(userLocation.lat);
  const userLng = parseFloat(userLocation.lng);

  if (isNaN(userLat) || isNaN(userLng)) {
    console.error("Invalid user location coordinates:", userLocation);
    return null;
  }

  const scored = [];

  for (let listing of listings) {
    if (!listing) {
      console.warn("Skipping null/undefined listing");
      continue;
    }

    // Parse listing coordinates from strings to numbers
    const listingLat = parseFloat(listing.lat);
    const listingLong = parseFloat(listing.long);

    // Check if parsing was successful
    if (isNaN(listingLat) || isNaN(listingLong)) {
      console.warn(`Skipping listing with invalid coordinates:`, {
        id: listing.id,
        lat: listing.lat,
        long: listing.long,
        parsedLat: listingLat,
        parsedLong: listingLong,
      });
      continue;
    }

    const distance = haversine(userLat, userLng, listingLat, listingLong);

    // Check for valid distance calculation
    if (isNaN(distance)) {
      console.warn(`Invalid distance calculation for listing:`, listing);
      continue;
    }

    // Debug log to verify distances
    console.log(
      `Listing ID ${
        listing.id
      }: lat=${listingLat}, long=${listingLong}, distance = ${distance.toFixed(
        5
      )} km`
    );

    scored.push({ listing, distance });
  }

  if (scored.length === 0) {
    console.log("No valid listings found after parsing");
    return [];
  }

  // Sort by ascending distance and return up to `count` listings
  scored.sort((a, b) => a.distance - b.distance);
  const top = scored
    .slice(0, Math.max(0, parseInt(count, 10) || 4))
    .map((s) => s.listing);

  console.log(
    `Returning ${top.length} nearest listing(s): ${top
      .map((l) => l.id)
      .join(", ")}`
  );

  return top;
}
