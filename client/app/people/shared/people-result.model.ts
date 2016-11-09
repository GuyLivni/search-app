export class PeopleResult {

	public result: any[];
	public totalCount: number;

	constructor(data: {
		result?: any[],
		totalCount?: number
	} = {}) {
		this.result = data.result || [];
		this.totalCount = data.totalCount || 0;
	}
}