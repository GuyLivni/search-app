import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Person} from "./person.model";
import {Subject, Observable} from "rxjs";
import {PeopleResult} from "./people-result.model";
import {PagerModel} from "./pager.model";

@Injectable()
export class PeopleService {
	private searchUrl = 'http://localhost:4000/search';
	private _searchTermSource = new Subject<string>();
	currentSearchTerm$ = this._searchTermSource.asObservable();

	constructor(private http: Http) {}

	searchEvent(searchTerm) {
		this._searchTermSource.next(searchTerm);
	}

	search(term: any, pager: PagerModel) {
		const params = new URLSearchParams();
		let totalCount = 0;

		params.set('name', term.name);
		params.set('phone', term.phone);
		params.set('age', term.age);
		params.set('pageIndex', pager.pageIndex.toString());
		params.set('pageSize', pager.pageSize.toString());

		return this.http
			.get(this.searchUrl, {search: params})
			.map((res) => res.json())
			.catch(this.handleError)
			.do((result: any) => {
				totalCount = result['total'];
			})
			.map((res) => res['data'].map((person)=> {
				return new Person(person)
			}))
			.map(people => new PeopleResult({
				result: people,
				totalCount: totalCount
			}));
	}

	handleError(error: Response | any){
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg || 'server error');

	}
}
