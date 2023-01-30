import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-main-loading',
  templateUrl: './main-loading.component.html',
  styleUrls: ['./main-loading.component.scss']
})
export class MainLoadingComponent implements OnChanges, OnInit {
  @Input('loading') loading: boolean ;
  @Input('message') message: string ;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.message) this.message = changes.message.currentValue;

  }

  ngOnInit(): void {
    this.message = "Chargement en cours Veuillez patientez...";
  }


}
