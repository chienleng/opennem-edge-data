import Papa from 'papaparse';

export async function get() {
	const dataUrl = import.meta.env.VITE_DATA_URL;
	const metaResponse = await fetch(`${dataUrl}/data/au/emissions/quarter-meta.json`);
	const meta = await metaResponse.json();
	const dataResponse = await fetch(`${dataUrl}${meta.path}`);
	const csv = await dataResponse.text();
	const parsed = Papa.parse(csv, { header: true });

	return {
		body: {
			...meta,
			data: parsed.data
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'max-age=0, must-revalidate'
		}
	};
}
