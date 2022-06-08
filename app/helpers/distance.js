/**
 * Calculates distance between coordinates
 *
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @param [unit] - M (miles), K (kilometers) or N (nautical) - Default K
 * @param [round] - Must round - Default true
 *
 * @returns {number|string}
 */
export function calcDistance(lat1, lon1, lat2, lon2, unit = "K", round = true) {
	const radlat1  = Math.PI * lat1 / 180;
	const radlat2  = Math.PI * lat2 / 180;
	const theta    = lon1 - lon2;
	const radtheta = Math.PI * theta / 180;

	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

	if( dist > 1 )
	{
		dist = 1;
	}

	dist = Math.acos(dist);
	dist = dist * 180 / Math.PI;
	dist = dist * 60 * 1.1515;

	if( unit === "K" )
	{
		dist = dist * 1.609344
	}
	else if( unit === "N" )
	{
		dist = dist * 0.8684
	}

	return round ? dist.toFixed(0) : dist;
}
