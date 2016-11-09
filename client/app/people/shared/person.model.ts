export class Address {
	city:    string;
	street:  string;
	country: string;

	constructor(data : {
		city?:    string,
		street?:  string,
		country?: string
	} = {}) {
		this.city = data.city || '';
		this.street = data.street || '';
		this.country = data.country || '';
	}
}

export class Person {
	id:            string;
	name:          string;
	phone:         string;
	avatar_image:  string;
	avatar_origin: string;
	email:         string;
	quote:         string;
	chuck:         string;
	birthday:      number;
	address:       Address;
	constructor(data: {
		id?:            string;
		name?:          string;
		phone?:         string;
		avatar_image?:  string;
		avatar_origin?: string;
		email?:         string;
		quote?:         string;
		chuck?:         string;
		birthday?:      number;
		address?:       Address
	} = {}) {
		this.id = data.id;
		this.name = data.name || '';
		this.phone = data.phone || '';
		this.avatar_origin = data.avatar_origin;
		this.avatar_image = data.avatar_image;
		this.email = data.email;
		this.quote = data.quote;
		this.chuck = data.chuck;
		this.birthday =  new Date().getFullYear() - new Date(data.birthday * 1000).getFullYear();
		this.address = data.address;
	}
}