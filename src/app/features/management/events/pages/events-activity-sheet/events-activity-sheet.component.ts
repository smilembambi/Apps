import {Component, OnInit, ViewChild} from '@angular/core';
import {EventModel} from "../../models/event.model";
import {MainAllService} from "../../../../../core/services/main-all.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from 'primeng/api';
import {ActivitySheetModel, TestimonialModel} from "../../models/activity-sheet.model";
import {UserModel} from "../../../../../features-master/users/models/user.model";
import {TIMES} from "../../../../../core/helpers/constancy/times.constancy";
import {DialogService} from "primeng/dynamicdialog";
import {AddTestimonyComponent} from "./add-testimony/add-testimony.component";
import {Location} from "@angular/common";
import {URL_API} from "../../../../../core/helpers/params/params-api.routes";
import {HttpClient} from "@angular/common/http";
import {FileUpload} from "primeng/fileupload";


@Component({
  selector: 'app-events-activity-sheet',
  templateUrl: './events-activity-sheet.component.html',
  styleUrls: ['./events-activity-sheet.component.scss']
})
export class EventsActivitySheetComponent implements OnInit {
  loading: any;
  event: EventModel;
  isEdit: boolean = false;
  title: string = "";
  id: string = "";


  uploadedFiles: any[] = [];

  times: any[] = TIMES;
  private state: string = "edit";

  driver: UserModel;
  drivers: UserModel[] = [];

  uploadUrl: string =  URL_API.baseUrlFiles+"events/";
  images: string[] = [];
  @ViewChild('fileUpload', {static: false}) fileUpload: FileUpload;

  files = [];
  currentImage: string;
  display: boolean = false;



  constructor(private mainService: MainAllService,
              private messageService: MessageService,
              private location: Location,
              private http: HttpClient,
              private dialogService: DialogService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(el => {
      if (el && el.id) {
        this.id = el.id
        this.getEvent()
      }
    })

  }

  getEvent() {
    this.loading = true;
    this.mainService.getOne(this.id, 'event').subscribe({
      next: (res) => {
        if (res.success) {
          this.event = res.data;
          this.title = "Fiche d'activité de " + this.event.label;


          if (this.event?.church?.manager) {
            this.event.church.manager.label = this.event.church.manager.label + "(Rem)"
            this.drivers.push(this.event.church.manager)
          }
          if (this.event?.church?.subManager) {
            this.event.church.subManager.label = this.event.church.subManager.label + "(Corem)"
            this.drivers.push(this.event.church.subManager)
          }


          let other = new UserModel();
          other._id = "other";
          other.label = "Autres";

          this.drivers.push(other);

          if (!this.event?.activitySheet) {

            let activitySheet = new ActivitySheetModel();
            activitySheet.subject = ""
            activitySheet.driver = "";
            activitySheet.driverObject = null;
            activitySheet.startTime = "";
            activitySheet.endTime = "";
            activitySheet.testimonials = [];
            this.event.activitySheet = activitySheet;

          }
          console.log("vous")
          if(this.event?.pictures && this.event.pictures.length > 0){

            this.event.pictures.forEach(el=>{
              const url = URL_API.baseUrlFiles+"events/"+el;
             this.images.push(url)
            })



          }
          this.loading = false;
        }
      }
    })
  }

  saveList() {

    const formData = new FormData();
    console.log(this.uploadedFiles.length)

    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('filename', this.uploadedFiles[i]);
    }
    formData.append('event', JSON.stringify(this.event));

    this.mainService.create(formData, 'event/activity-sheet').subscribe({
      next: (res => {
        if (res.success) {
          console.log("comme")
          this.location.back()
        }
      })
    })
  }

  back() {
    this.location.back()
  }

  download() {

  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }


  /**
   * read and di testimony
   * @param testimony
   * @param state
   */
  doTestimony(testimony: TestimonialModel = new TestimonialModel(), state: string = "edit") {
    console.log(testimony)
    const ref = this.dialogService.open(AddTestimonyComponent, {
      header: state == "edit" ? "Ajouter un témoignage" : "Visualisation de témoignage",
      width: '30%',
      data: {state: state, testimony: testimony},
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        if (res.data) {
          if (!this.event?.activitySheet?.testimonials) this.event.activitySheet.testimonials = []
          this.event.activitySheet.testimonials.push(res.data)
        }
      }
    });

  }


  getUpload($event) {
    this.uploadedFiles = $event.currentFiles
  }


  openImage(link: string) {
    this.currentImage = link;
    this.display = true;
  }
}
