import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-transaction-header',
  templateUrl: './main-transaction-header.component.html',
  styleUrls: ['./main-transaction-header.component.scss']
})
export class MainTransactionHeaderComponent implements OnInit {
  @Input('objects')objects: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Transaction methods
   */
  getTotalAmount(): number {
    let amount: number = 0;

    this.objects.forEach(el=>{
      amount =amount + el.transactionAmount;
    })
    return amount ;
  }

  /**
   * get simoway amount
   */
  getSimowayAmount() : number{
    let amount: number = 0;
    if(this.objects && this.objects.length > 0){
      this.objects.forEach(el=>{
        if(el.transactionOperation == 'Achat billet' && el.receivedUser?._id){
          if(el.receivedOperator?.commercialInfo?.percentSellTicketWeb){
            amount += Number(el.transactionAmount) * Number(el.receivedOperator?.commercialInfo?.percentSellTicketWeb) /100;
          }
        }
      })
    }

    return amount ;
  }
}
