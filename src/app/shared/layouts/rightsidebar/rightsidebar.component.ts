import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

import { LAYOUT_WIDTH, SIDEBAR_TYPE, TOPBAR } from '../layouts.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})

/**
 * Rightsidebar component
 */
export class RightsidebarComponent implements OnInit {

  isVisible: string;
  attribute: string;

  width: string;
  sidebartype: string;
  topbar: string;

  constructor(private eventService: EventService,
              private router: Router) { }

  ngOnInit() {
    this.width = LAYOUT_WIDTH;
    this.sidebartype = SIDEBAR_TYPE;
    this.topbar = TOPBAR;

    /**
     * horizontal-vertical layput set
     */
    this.attribute = document.body.getAttribute('data-layout');
    const vertical = document.getElementById('is-layout');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (this.attribute == 'horizontal') {
      vertical.removeAttribute('checked');
    }
  }

  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

  /**
   * Change Topbar
   */
  changeTopbar(topbar: string) {
    this.topbar = topbar;
    this.eventService.broadcast('changeTopbar', topbar);
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout) {
    if (layout.target.checked == true)
      this.eventService.broadcast('changeLayout', 'vertical');
    else
      this.eventService.broadcast('changeLayout', 'horizontal');
  }

  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
  }

  changeSidebartype(sidebar: string) {
    this.sidebartype = sidebar;
    this.eventService.broadcast('changeSidebartype', sidebar);
  }

  openCityManage() {
    this.router.navigateByUrl('/app/administration/ville').then()
    document.body.classList.remove('right-bar-enabled');
  }

  openCountryManage() {
    this.router.navigateByUrl('/app/administration/pays').then()
    document.body.classList.remove('right-bar-enabled');
  }

  openMinistryManage() {
    this.router.navigateByUrl('/app/administration/ministere').then()
    document.body.classList.remove('right-bar-enabled');
  }

  openPastorManage() {
    this.router.navigateByUrl('/app/administration/pasteur').then()
    document.body.classList.remove('right-bar-enabled');
  }

  openRemManage() {
    this.router.navigateByUrl('/app/administration/rem').then()
    document.body.classList.remove('right-bar-enabled');
  }

  openStarManage() {
    this.router.navigateByUrl('/app/administration/star').then()
    document.body.classList.remove('right-bar-enabled');
  }

  openUserManage() {
    this.router.navigateByUrl('/app/administration/utilisateur').then()
    document.body.classList.remove('right-bar-enabled');
  }

}
