import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import {UserModel} from "../../../features-master/users/models/user.model";
import {UserService} from "../../../features-master/users/services/user.service";
import {URL_API} from "../../../core/helpers/params/params-api.routes";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
              private authenticationService: AuthenticationService,
              public languageService: LanguageService,
              private userService: UserService,
              public translate: TranslateService,
              public _cookiesService: CookieService) {
  }

  listLang = [
    { text: 'Français', flag: 'assets/images/flags/french.jpg', lang: 'fr' },
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  user: UserModel;
  errorImg: string = "";
  url=URL_API.baseUrlFiles;

  ngOnInit() {

    this.user = this.userService.getUser();

    if(this.user){
      this.errorImg = this.user.sex == "M" ? "assets/images/users/m.jpg" : "assets/images/users/f.jpg"
    }

    this.openMobileMenu = false;
    this.element = document.documentElement;

    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/french.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    const user = this.userService.getUser();

    this.authenticationService.logout(user.email).subscribe(res =>{
      if(res){
        this.router.navigate(['auth/login']).then();
      }
    });
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  profile() {
    console.log("zalme")
    //this.router.navigateByUrl('/app/account').then();
    this.router.navigate(['/app/account']).then();
  }
}
