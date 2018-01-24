import { Injectable } from '@angular/core';

@Injectable()

export class CommonService{
	public pic: string;
	public user: string;
	public package_id: number = 0;
	public package_name: string = "";
	public taskToken: string;
}