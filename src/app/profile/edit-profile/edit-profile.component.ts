import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
import swal from 'sweetalert2';
import  cc from '../../../assets/scripts/countries.json';

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}
@Component({
    selector: 'edit-profile',
    templateUrl: './edit-profile.component.html'
})

export class EditProfileComponent implements OnInit, OnChanges, AfterViewInit{

	user: any;
	data: any;
	public celebPics: string[];
	public profilePics: string[];
 	public chosen: boolean = false;
 	public chosenpic: string;
 	public chosenPrev: string;
    public profileData;
	constructor(
		private api: ApiService,
		private tokenExpService: TokenExpiryService,
		public common: CommonService
	){}

	ngOnInit() {

	  	let i;
        this.profilePics = [];
        for(i=1;i<=8;i++){
          this.profilePics.push('i'+i);
        }

        this.celebPics = [];
        for(i=1;i<=8;i++){
          this.celebPics.push(''+i);
        }

		this.api.get('/user/me').subscribe(data=>{
			if(data.status === 'success'){
				this.user = this.data;
				this.data = data.data;

                let country = cc.find(data => this.data.country === data.code);
                
				this.profileData = {
	                name: this.data.membername,
	                email: this.data.email,
	                userId: this.data.memberid,
	                doj: this.data.doj,
	                sponsorId: this.data.introid,
	                sponsorName: this.data.introname,
	                profilepic: this.data.profileimg,
	                country: country.name,
	                contact: this.data.mobile,
	                bitcoinaddress: this.data.bitcoinaddress,
	                ethereumaddress: this.data.ethereumaddress,
                };
			}
		}, err=>{
	          this.tokenExpService.isTokenValid();
	      });

		        // Code for the Validator
        // const $validator = $('.wizard-card form').validate({
        //     rules: {
        //           firstname: {
        //             required: true,
        //           minlength: 3
        //       },
        //         lastname: {
        //             required: true,
        //           minlength: 3
        //       },
        //         email: {
        //             required: true,
        //           minlength: 3,
        //       }
        //     },

        //     errorPlacement: function(error: any, element: any) {
        //         $(element).parent('div').addClass('has-error');
        //      }
        //  });

        // Wizard Initialization
        $('.wizard-card').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            // onNext: function(tab, navigation, index) {
            //     var $valid = $('.wizard-card form').valid();
            //     if(!$valid) {
            //         $validator.focusInvalid();
            //         return false;
            //     }
            // },

            onInit: function(tab: any, navigation: any, index: any){
              let $total = navigation.find('li').length;
              let $wizard = navigation.closest('.wizard-card');

              let $first_li = navigation.find('li:first-child a').html();
              let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
              $('.wizard-card .wizard-navigation').append($moving_div);

              $total = $wizard.find('.nav li').length;
             let  $li_width = 100/$total;

              let total_steps = $wizard.find('.nav li').length;
              let move_distance = $wizard.width() / total_steps;
              let index_temp = index;
              let vertical_level = 0;

              let mobile_device = $(document).width() < 600 && $total > 3;

              if(mobile_device){
                  move_distance = $wizard.width() / 2;
                  index_temp = index % 2;
                  $li_width = 50;
              }

              $wizard.find('.nav li').css('width',$li_width + '%');

              let step_width = move_distance;
              move_distance = move_distance * index_temp;

              let $current = index + 1;

              if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                  move_distance -= 8;
              } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                  move_distance += 8;
              }

              if(mobile_device){
                  let x: any = index / 2;
                  vertical_level = parseInt(x);
                  vertical_level = vertical_level * 38;
              }

              $wizard.find('.moving-tab').css('width', step_width);
              $('.moving-tab').css({
                  'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                  'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

              });
              $('.moving-tab').css('transition','transform 0s');
           },

            onTabClick : function(tab: any, navigation: any, index: any){

                const $valid = $('.wizard-card form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function(tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.wizard-card');
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function(){
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if ( index !== 0 ) {
                    $(checkbox).css({
                        'opacity':'0',
                        'visibility':'hidden',
                        'position':'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity':'1',
                        'visibility':'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
               let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                	'text-transform':'none',
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });
        $('#wizard-picture').change(function(){
            const input = $(this);

            if (input[0].files && input[0].files[0]) {
                const reader = new FileReader();

                reader.onload = function (e: FileReaderEvent) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });

        $('[data-toggle="wizard-radio"]').click(function(){
            const wizard = $(this).closest('.wizard-card');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function(){
            if ( $(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');


    }
        ngOnChanges(changes: SimpleChanges) {
        const input = $(this);

        if (input[0].files && input[0].files[0]) {
            const reader: any = new FileReader();

            reader.onload = function (e: FileReaderEvent) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    }
    ngAfterViewInit() {
        $('.wizard-card').each(function(){

            const $wizard = $(this);
            const index = $wizard.bootstrapWizard('currentIndex');
            let $total = $wizard.find('.nav li').length;
           let  $li_width = 100/$total;

            let total_steps = $wizard.find('.nav li').length;
            let move_distance = $wizard.width() / total_steps;
            let index_temp = index;
            let vertical_level = 0;

            let mobile_device = $(document).width() < 600 && $total > 3;

            if(mobile_device){
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width',$li_width + '%');

            let step_width = move_distance;
            move_distance = move_distance * index_temp;

            let $current = index + 1;

            if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                move_distance -= 8;
            } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                move_distance += 8;
            }

            if(mobile_device){
                let x: any = index / 2;
                vertical_level = parseInt(x);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
        });
    }
    savePic(){
    console.log(this.chosenpic);
    this.api.post('/profile/setprofileimg', {profileimg: this.chosenpic}).subscribe(data=>{
      this.data = data;
      if(this.data.status === 'success'){
        $('#myModal').modal("hide");

        this.api.get('/user/me').subscribe(data=>{
          this.data = data;
          if(this.data.status === 'success'){
            this.common.pic = this.data.data.profileimg;
            this.profileData.profilepic = this.data.data.profileimg;
          }
        }, err=>{
            this.tokenExpService.isTokenValid();
        });
        swal({
            type: 'success',
            title: 'Success!',
            text: this.data.data,
            buttonsStyling: false,
            showConfirmButton: false,
            timer: 1500
        }).catch(swal.noop);
      }
    }, err=>{
        this.tokenExpService.isTokenValid();
    });
  }
  chosePic(pic){
	var t = this;
	t.chosen = true;
	t.chosenPrev = t.chosenpic;
	t.chosenpic = pic;
	$("#img-"+pic).css({"transform": "scale(1.1, 1.1)", "z-index": 2, "border-color": "#000"});
	$("#img-"+t.chosenPrev).css({"transform": "scale(1,1)", "z-index": 1, "border-color": "#ddd"}); 
  }
}
