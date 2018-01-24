import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'users',
  styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {

	public banners;
	public num: number[];
	public img: string;

	ngOnInit(){
		var t = this;
		t.banners = [
				{img: 'JAAVACOINBANNER.jpg', title: 'Crypto Currency'},
				{img: 'JAAVARRADEBANNER1.jpg', title: 'Bit Coin'},
				{img: 'jaavatradeBanner1.jpg', title: 'Jaava Trade'},
				{img: 'jaavatradeBanner2.jpg', title: 'Jaava Trade Crypto Currency'},
				{img: 'jaavatradeBanner4.jpg', title: 'The Payment of Future'}
		]
		let a: number;
		t.num=[];
		for( a=0; a<t.banners.length; a++){
			t.num.push(a);
		}
	}
	showImage(img){
		this.img = img;
		$('#myModal').modal("show");
	}

}