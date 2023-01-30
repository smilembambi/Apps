import { Component , OnInit} from '@angular/core';
import {ConfigClass} from "./core/helpers/class/config.class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");

    new ConfigClass().initParamsGlobal();
  }
}
