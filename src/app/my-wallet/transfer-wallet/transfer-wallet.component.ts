import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'transfer-wallet',
  styleUrls: ['./transfer-wallet.component.css'],
  templateUrl: './transfer-wallet.component.html'
})

export class TransferWalletComponent implements OnInit {

	public wallet : any = {};
	public purchaseWallet: any = {};
	private data: any;

	constructor(
		private api: ApiService,
		private tokenExpService: TokenExpiryService
	){}

	ngOnInit(){
		var t = this;
		t.selectWallet('trading');
		t.api.post('/profile/getbalance', {wtype : "purchase"}).subscribe(data=>{
			t.data = data;
			if(t.data.status === 'success'){
				t.purchaseWallet = {
					img: 'wallet_2',
					color: 'red',
					title: 'Purchase Wallet',
					value: t.data.data.balance.toLocaleString('en')
				}
			}
		}, err=>{
			this.tokenExpService.isTokenValid();
		});
	}

	onTransfer(){
		console.log(this.wallet);
	}

	selectWallet(wtype){
		var t = this;
		t.api.post('/profile/getbalance', {wtype : wtype}).subscribe(data=>{
			t.data = data;
			if(t.data.status === 'success'){
				t.wallet.availableBal = t.data.data.balance;
			}
		}, err=>{
			this.tokenExpService.isTokenValid();
		});
	}
}