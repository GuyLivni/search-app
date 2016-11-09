export class PagerModel {
	public pageSize: number;
	public pageIndex: number;

	constructor(data: {
		pageSize?: number,
		pageIndex?: number
	} = {}) {
		this.pageSize = data.pageSize || 20;
		this.pageIndex = data.pageIndex || 1;
	}
}