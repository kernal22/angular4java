import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
import { Router } from '@angular/router';

declare const $: any;

@Component({
    selector: 'upgrade-package',
    styleUrls: ['./upgrade-package.component.css'],
    templateUrl: './upgrade-package.component.html'
})

export class UpgradePackageComponent implements OnInit {

  public packageTitle;
  private data;
  constructor(private api: ApiService, private tokenExpService: TokenExpiryService, private commonService: CommonService, private router: Router){

  }
  
	ngOnInit() {

      this.api.get('/getallpackages').subscribe(data=> {
              this.data = data;
              if(this.data.status === 'success'){
                this.packageTitle = this.data.data;
                $(".full-content").removeClass("full-content");
              }
            }, err=> {
                    this.tokenExpService.isTokenValid();
          });
  }

  purchasePlan(package_id, package_name){
    	this.commonService.package_id = package_id;
      this.commonService.package_name = package_name;
      this.router.navigate(['/profit-calculator']);
    }

}
