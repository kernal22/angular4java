import { Component, OnInit, ElementRef } from '@angular/core';

import { AuthService } from '../../shared/service/authservice/authservice.service';
import { TokenService } from '../../shared/service/api/tokenservice.service';

import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    ErrorMessage: string;
    data: any = {};
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public mobile: boolean = false;

    constructor(private element: ElementRef,
                 private authService: AuthService,
                 private router: Router,
                 private tokenService: TokenService
                 ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700);

         if (window.screen.width === 360 || window.screen.width < 1000) { // 768px portrait
              this.mobile = true;
        }
    }

    onLogin() {
        this.authService.onLogin(this.model).subscribe(
                        result => {
                            this.data = result;
                            if(this.data.status === 'success'){
                                this.tokenService.saveToken(this.data.data.token, this.data.data.sign);
                                this.router.navigateByUrl('/dashboard');
                            } else if(this.tokenService.getToken()){
                                this.router.navigateByUrl('/dashboard');
                            } else {
                                this.showNotification('top', 'left', this.data.data, 'danger');
                            }
                        },
                        error=>{
                            swal({
                                type: 'warning',
                                title: "Some ERROR occured!",
                                text: "Please try again...",
                                timer: 2000,
                                buttonsStyling: false,
                                showConfirmButton: false
                            }).catch(swal.noop);
                        });
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    showNotification(from: any, align: any, message: string, status: string) {
          $.notify({
              icon: 'notifications',
              message: message
          }, {
              type: status,
              timer: 3000,
              placement: {
                  from: from,
                  align: align
              }
          });
      }
}
