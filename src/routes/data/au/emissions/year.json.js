import Papa from 'papaparse';

export async function get() {
	const response = await fetch(
		'https://raw.githubusercontent.com/opennem/emissions-csv/main/data/au-2021-emissions-projections-fig-7.csv'
	);

	const csv = await response.text();
	const parsed = Papa.parse(csv, { header: true });

	return {
		// @ts-ignore
		body: parsed.data,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	};
}
