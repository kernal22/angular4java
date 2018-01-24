import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { ApiService } from '../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../shared/service/api/tokenExpiry.service';
import { CommonService } from '../shared/service/common/common.service';

declare const $: any;
declare const noUiSlider: any;
@Component({
	selector: 'profit-calculator',
	styleUrls: ['./profit-calculator.component.css'],
	templateUrl: './profit-calculator.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ProfitCalculatorComponent implements OnInit, OnDestroy{

	simpleSlider = 10;
	private user_id: string;
	private data: any = {};
	private packageTitle: any;

	public min_value: number = 0;
	public max_value: number = 1;

	private drag_value: number;
	private min_drag_value: number;
	private max_drag_value: number;

	private total_earning: number;
	public total_days: number= 365;

	private total_min_earning: number;
	private total_max_earning: number;
	
	private roi:number;
	private prevSliderVal: number;
	private packagetype: string;
	public purchaseW: number;
	public prevPack: string;
	
	private packagePurchaseDetails: object = {};

	constructor( private api: ApiService, private tokenExpService: TokenExpiryService, public commonService: CommonService ){}


	public ngOnInit(){

		this.api.post('/profile/getbalance', {"wtype":"purchase"}).subscribe(data=>{
			this.purchaseW = data.data.balance;

    		this.api.get('/getallpackages').subscribe(data=> {

			    this.data = data;
			    if(this.data.status === 'success'){
			        this.packageTitle = this.data.data;

			        this.simpleSlider = this.packageTitle[0].from;
			        this.packagetype = this.packageTitle[0].packname;
			        this.prevPack = this.packageTitle[0].packname;

			        this.min_drag_value = this.packageTitle[0].from;
			        this.max_drag_value = this.packageTitle[0].to;

			        this.min_value = this.packageTitle[0].from;
			        this.max_value = this.packageTitle[0].to;

			        this.roi = this.packageTitle[0].roipercent;

			        this.total_min_earning = ((this.packageTitle[0].from*this.packageTitle[0].roipercent)/100)*365;
			        this.total_max_earning = ((this.packageTitle[0].to*this.packageTitle[0].roipercent)/100)*365;
			    }

			    $('#indicatorContainerInvestment').radialIndicator({
				    radius: 90,
				    minValue: this.total_min_earning,
				    maxValue: this.total_max_earning,
				    format: '$ #',
				    barBgColor: 'rgba(233, 30, 99, 0.2)',
				    barColor: 'rgb(233, 30, 99)',
				    fontColor: 'rgb(233, 30, 99)',
				    barWidth: 10,
				    fontSize: 26,
				    frameTime: 1,
				    fontWeight: 'normal',
				    roundCorner : true,
				});

				$('#indicatorContainerBet').radialIndicator({
				    radius: 90,
				    minValue: this.min_drag_value,
				    maxValue: this.max_drag_value,     
				    format: '$ #',
				   	barBgColor: 'rgba(156, 39, 176, 0.2)',
				    barColor: 'rgb(156, 39, 176)',
				    fontColor: 'rgb(156, 39, 176)',
				    barWidth: 10,
				    fontSize: 26,
				    frameTime: 1,
				    fontWeight: 'normal',
				    roundCorner : true,
				});

				$('#indicatorContainerDays').radialIndicator({
				    radius: 90,
				    displayNumber: false,
				    initValue: 100,
				    barBgColor: 'rgba(44, 169, 227, 0.2)',
				    barColor: 'rgb(44, 169, 227)',
				    fontColor: 'rgb(44, 169, 227)',
				    barWidth: 10,
				    fontSize: 26,
				    frameTime: 1,
				    fontWeight: 'normal',
				    roundCorner : true,
				});

				this.calculateMinMaxRange(this.commonService.package_name, null);

		    }, err=> {
		            this.tokenExpService.isTokenValid();
		    });
	    });

		$('#description').show();

	}
	calculateProfit(value:number){
		this.simpleSlider = value;
		this.total_earning = ((value*this.roi)/100)*this.total_days;
		this.drag_value = value;

		var radialObj = $('#indicatorContainerInvestment').data('radialIndicator');
		radialObj.animate(this.total_earning.toFixed(2));

		var radialObjInvest = $('#indicatorContainerBet').data('radialIndicator');
		radialObjInvest.animate(this.drag_value);

	}
	calculateRoiProfit(type:string){
		if(type==='normal'){
			this.total_days= 365;
		}
		else if(type==='booster'){
			this.total_days= 730;
		}
		this.calculateMinMaxRange(this.packagetype, null);
		this.calculateProfit(this.simpleSlider);
	}
	calculateMinMaxRange(type: string, obj){
		var t = this;
		if(type==='TYCOON' || type==='' || type===null || type===undefined){
			t.changePackageValues(t.packageTitle[0]);
		}
		else if(type==="ULTIMATE"){
			t.changePackageValues(t.packageTitle[1]);
		}
		else if(type==="INFINITY"){
			t.changePackageValues(t.packageTitle[2]);
		}

		if(obj && t.prevPack !== type){
			if(type === 'TYCOON' || ( type === 'ULTIMATE' && t.prevPack === 'INFINITY') ){
				setTimeout(function(){
					t.simpleSlider = 0;
				}, 20);
			}
			t.prevPack = type;
		}
	}
	changePackageValues(pack){
		this.min_value = pack.from;
		this.max_value = pack.to;
		this.roi = pack.roipercent;	
		this.total_min_earning = ((this.min_value*this.roi)/100)*this.total_days;
		this.total_max_earning = ((this.max_value*this.roi)/100)*this.total_days;
		this.packagetype = pack.packname;
		this.min_drag_value = pack.from;
		this.max_drag_value = pack.to;
 		$('#indicatorContainerInvestment').empty();
		$('#indicatorContainerInvestment').radialIndicator({
		    radius: 90,
		    minValue: this.total_min_earning,
		    maxValue: this.total_max_earning,
		    format: '$ #',
		    barBgColor: 'rgba(233, 30, 99, 0.2)',
		    barColor: 'rgb(233, 30, 99)',
		    fontColor: 'rgb(233, 30, 99)',
		    barWidth: 10,
		    fontSize: 26,
		    frameTime: 1,
		    fontWeight: 'normal',
		    roundCorner : true,
		});
		$('#indicatorContainerBet').empty();
		$('#indicatorContainerBet').radialIndicator({
		    radius: 90,
		    minValue: this.min_drag_value,
		    maxValue: this.max_drag_value, 
		    format: '$ #',
		   	barBgColor: 'rgba(156, 39, 176, 0.2)',
		    barColor: 'rgb(156, 39, 176)',
		    fontColor: 'rgb(156, 39, 176)',
		    barWidth: 10,
		    fontSize: 26,
		    frameTime: 1,
		    fontWeight: 'normal',
		    roundCorner : true,
		});

	}
	purchasePackage(package_id, package_name){

		this.packagePurchaseDetails = {
			packid: package_id,
			amount: this.simpleSlider
		};

		// console.log(this.packagePurchaseDetails);

		this.api.post('/profile/upgrade', this.packagePurchaseDetails).subscribe(data=>{
			this.data = data;
			if(this.data.status === 1){
				console.log(this.data.data);
			}
		});

	}
	ngOnDestroy(){
		this.commonService.package_id=0;
	}

}