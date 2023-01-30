import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  test: string = "";
  error: string = "";
  message: string;


  title:string = "Valider l'opération";
  word: string = "Valider";
  description: string =  "Pour valider cette opération, tapez le mot <strong>Valider</strong> dans la zone à saisie";

  constructor(public config: DynamicDialogConfig,
              private router: Router,
              private dialogService: DynamicDialogRef) { }

  ngOnInit(): void {
    if(this.config.data){

      if(this.config.data.title){
        this.title = this.config.data.title;
      }

      if(this.config.data.word){
        this.word = this.config.data.word;
      }

      if(this.config.data.description){
        this.description = this.config.data.description;
      }
    }

  }

  checkText() {
    if(this.message?.trim().toUpperCase() == this.word.toUpperCase()){
      this.dialogService.close({data:true,url:this.router.url});
    }else{
      this.error = "Saissisez correctement le mot <"+ this.word +">";
    }
  }

  close(){
    this.dialogService.close({data:false,url:this.router.url});

  }

}
