import { Component, OnInit,  } from '@angular/core';
import { Location } from "@angular/common";
import {MainAllService} from "../../../../../core/services/main-all.service";
import {ActivatedRoute} from "@angular/router";
import {EventModel} from "../../models/event.model";
import {PresenceListModel} from "../../models/presence-list.model";
import * as moment from 'moment';
import {AllClass} from "../../../../../core/helpers/class/all.class";
import {ToastrService} from "ngx-toastr";
import {MESSAGE_CREATION_OK, MESSAGE_ENREGISTREMENT_OK} from "../../../../../core/helpers/params/params-message";
import {MemberModel} from "../../../member/models/member.model";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-events-presence',
  templateUrl: './events-presence.component.html',
  styleUrls: ['./events-presence.component.scss']
})
export class EventsPresenceComponent implements OnInit {
  loading: boolean = false;
  icon: any;
  title: string =  "Liste de présence";
  objects: any;
  origin: any;
  headers: any;
  presenceList: PresenceListModel[];
  lastChanged: PresenceListModel;
  event: EventModel;
  test: boolean;

  memberSelected: MemberModel;


  typeAbsences: any[] = [];
  selectedTypeAbsence: any;
  id : string;

  constructor(private mainService: MainAllService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private location: Location
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(el=>{
      if(el && el.id){
        this.id = el.id
        this.getListPresence()
      }
    })


    this.mainService.getAll({}, 'event/type-absence').subscribe({
      next:(res)=>{
        if(res.success){
          this.typeAbsences  = res.data;
          this.selectedTypeAbsence = res.data.find(el=> el.value == '5')
        }
      }
    })

  }

  getListPresence(){
    this.loading = true;
    this.mainService.getAll({}, 'event/'+this.id +'/presence').subscribe({
      next:(res)=>{
        if(res.success){
          this.presenceList  = res.data;
          this.event = res.element;
          this.loading = false;
        }
      }
    })
  }

  reload() {
    this.getListPresence();
  }

  back() {
    this.location.back();
  }

  /**
   * change list
   * @param list
   * @param response
   */
  changeList(list: PresenceListModel, response: string) {

    this.lastChanged = list;
    const index = this.presenceList.findIndex(el=> el._id == this.lastChanged._id);
    this.presenceList[index].isPresent = response;

    if(response == 'P') return;


    if(this.presenceList[index].reasonAbsence) {
      this.selectedTypeAbsence = this.typeAbsences.find(el=> el.value == this.presenceList[index].reasonAbsence.value)
    }
    else {
      this.selectedTypeAbsence = this.typeAbsences.find(el=> el.value == '5')
      this.presenceList[index].reasonAbsence = this.selectedTypeAbsence;
    }
  }

  /**
   * get name day to french
   * @param dateEvent
   */
  getNameDay(dateEvent: string): string {
    const word = moment(dateEvent).locale('fr').format('dddd')
    return  word.charAt(0).toUpperCase() + word.slice(1) + " ";
  }

  /**
   * gte date event
   * @param dateEvent
   */
  getDayDetail(dateEvent: string) : string{
    const date = new Date(dateEvent);
    let d = date.getDate();
    let monthName = moment(dateEvent).locale('fr').format('MMMM');
    monthName =  monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return new AllClass().completeNumberTwoCaractere(d) + " " + monthName + " " + date.getFullYear();
  }

  /**
   * confirm
   */
  confirmTypeAbsence() {
    this.lastChanged.reasonAbsence = this.selectedTypeAbsence;
    const index = this.presenceList.findIndex(el=> el._id == this.lastChanged._id);
    this.presenceList[index].reasonAbsence = this.selectedTypeAbsence;
    if(this.selectedTypeAbsence.value != "5") this.presenceList[index].isPresent = "RA";
  }

  /**
   * save list
   */
  saveList() {
    this.loading = true
    this.mainService.create(this.presenceList, 'event/'+this.id +'/presence').subscribe({
      next:(res)=>{
        if(res.success){
          this.loading = false

          this.messageService.add({key: 'tc', severity: 'success', summary: 'Bien', detail: MESSAGE_ENREGISTREMENT_OK});


        }
      }
    })
  }
}
