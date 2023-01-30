import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {MainAllService} from "../../../../core/services/main-all.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {ConfigClass} from "../../../../core/helpers/class/config.class";
import {MESSAGE_ENREGISTREMENT_OK} from "../../../../core/helpers/params/params-message";

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {
  @Input('origin') origin : string;

  zoom = 14;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    center:new google.maps.LatLng(-4.267778, 15.291944),
    scrollwheel: true,
    disableDoubleClickZoom: true,
    minZoom: 2,
    fullscreenControl:true,
    fullscreenControlOptions:{
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControl:false,
    streetViewControl: false,
  };

  markers: any[] = [];
  markersChild: any[] = [];
  markersMember: any[] = [];
  markersChurch: any[] = [];

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  isReady: boolean = false;

  id: string;
  title: string;
  object: any;
  loading: boolean = false;
  icon: any;
  private urlApi: any;
  stepSearch: number = 0;
  stepSearchResponse: string;
  locationSelected: { lng: any; lat: any };

  state: string =  "view";

  addChild: boolean = false;
  addMember: boolean = false;
  addChurch: boolean = false;
  markerSelected: any;
  geoJsonData: any;


  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private mainService: MainAllService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private messageService: MessageService,
              private location: Location,
              private activatedRoute: ActivatedRoute) { }


  ngAfterViewInit() {
    this.loadGeoJsonData();
  }

  loadGeoJsonData() {
    fetch('assets/geo/quartiers_bzv.geojson')
      .then(response => response.json())
      .then(data => {
        if(data){
          this.geoJsonData = data;
          console.log(data);
          this.map.data.loadGeoJson(data);
        }
      });
  }

  ngOnInit(): void {


    const stepSearch = JSON.parse(localStorage.getItem("stepSearch"));
    const stepSearchResponse = JSON.parse(localStorage.getItem("stepSearchResponse"));
    if(stepSearch) this.stepSearch = Number(stepSearch);
    localStorage.removeItem("stepSearch")
    localStorage.removeItem("stepSearchResponse")
    this.stepSearchResponse = stepSearchResponse;

    if(this.stepSearch && this.stepSearch > 0){
      if(this.stepSearchResponse == "oui") this.getCurrentPosition();
      this.state = "edit";
    }

    this.cdr.detectChanges();

    this.icon = this.getInfo('icon');
    this.urlApi = this.getInfo('api-route');

    this.getObject();
  }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,  //-4.267778,
        lng: position.coords.longitude //15.291944,
      };
      this.locationSelected = {
        lat: position.coords.latitude,  //-4.267778,
        lng: position.coords.longitude //15.291944,
      };
      let icon = 'assets/images/icon/icon_myposition.png';
      let image = 'assets/images/icon/icon_myposition.png';

      let object: any = {};
      object.label  = "Ma position actuelle";
      this.addMarker(position.coords.latitude, position.coords.longitude, icon, 'my', object, image);
    });
    this.zoom = 19;
  }

  getCityPosition(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.object.city.location.lat,  //-4.267778,
        lng: this.object.city.location.lng//15.291944,
      };
      this.locationSelected = {
        lat: this.object.city.location.lat,  //-4.267778,
        lng: this.object.city.location.lng //15.291944,
      };

      let icon = 'assets/images/icon/icon_city.png';
      let image = 'assets/images/icon/icon_city.png';

      let object: any = {};
      object.label  = "Ville de " + this.object.city.label;

      this.addMarker(this.object.city.location.lat, this.object.city.location.lng, icon, 'city', object, image);
    });
    this.zoom = 19;
  }

  getPositionObject(lat, lng){
    console.log("positionObject")
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: lat,  //-4.267778,
        lng: lng //15.291944,
      }
      let icon;
      let image;
      let type;
      if(this.origin == "church"){
        icon = 'assets/images/icon/icon_church.png';
        image = 'assets/images/icon/icon_church.png';
        type = "church"
      }
      if(this.origin == "user"){
        icon = 'assets/images/icon/icon_member.png';
        image = 'assets/images/icon/icon_member.png';
        type = "member"
      }

      this.addMarker(lat, lng, icon, type, this.object, image);
    });
    this.zoom = 19;
  }

  /**
   * get info
   * @param label
   */
  getInfo(label): any {
    return new ConfigClass().getParams(this.origin, 'info', label);
  }

  /**
   * get object
   */
  getObject(){
    /** get params for know if is a edit or a add **/
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      // if is a edit
      if (this.id && this.id != '0') {

        /** use for tested the origin if is STAR, REM or PASTOR, because is USER nature **/
        const urlApi = new ConfigClass().getParams(this.origin, 'info', 'api-route');

        /** get one in db **/
        this.loading = true;
        this.mainService.getOne(this.id, urlApi).subscribe(res => {
          if (res && res.success) {

            //this.object = new GetOneClass().getOneMain(res.data, this.origin);
            this.object = res.data;
            if(this.origin == "church"){
              this.getChild();
              this.getMember();
            }

            if(this.stepSearch){
              if(this.stepSearchResponse == "non") this.getCityPosition();
              this.state = "edit";
            }

            if(this.origin == "user"){
              this.getChurch();
            }

            console.log(this.object.location);

            if(this.object.location){
              this.getPositionObject(this.object.location.lat, this.object.location.lng)
            }

            this.title = "Emplacement géographique de l'église : " + this.object.label

            this.loading = false;
            this.cdr.detectChanges()
          }
        })

      }
      // if is a add

    });
  }

  /**
   * get church child
   */
  getChild() {
    let params: any = {};
    params.parent = this.object._id
    this.mainService.getAll(params, "church").subscribe({
      next:(res)=>{
        if(res.success){
          res.data.forEach(el=>{
            if(el.location){
              let icon = 'assets/images/icon/icon_church_child.png';
              let image = 'assets/images/icon/icon_church_child.png';
              this.addMarker(el.location.lat, el.location.lng , icon, 'church', el, image, 'child');
            }
          })
        }
      }
    })
  }

  /**
   * get church near
   */
  getChurch() {
    let params: any = {};
    params.parent = this.object._id
    this.mainService.getAll(params, "user/church-near/"+this.object._id).subscribe({
      next:(res)=>{
        if(res.success){
          res.data.forEach(el=>{
            if(el.location){
              let icon = 'assets/images/icon/icon_church.png';
              let image = 'assets/images/icon/icon_church.png';
              this.addMarker(el.location.lat, el.location.lng , icon, 'church', el, image, 'church');
            }
          })
        }
      }
    })
  }

  /**
   * get member list
   */
  getMember() {
    let params: any = {};
    params.church = this.object._id
    this.mainService.getAll(params, "user").subscribe({
      next:(res)=>{
        if(res.success){
          console.log('Member', res.data);
          res.data.forEach(el=>{
            if(el.location){
              let icon = 'assets/images/icon/icon_member.png';
              let image = 'assets/images/icon/icon_member.png';

              //this.addMarker(el.location.lat, el.location.lng , icon, 'home', {}, image);
              this.addMarker(el.location.lat, el.location.lng , icon, 'member', el, image, 'member');
            }
          })
        }
      }
    })
  }

  openSearch() {
    this.stepSearch = 1;
    localStorage.setItem("stepSearch", JSON.stringify(this.stepSearch))
  }

  back() {
    if(this.origin == "church") localStorage.setItem('parentIdAdd', JSON.stringify(this.object?.parent?._id));
    this.location.back();
  }

  getCurrentPlace(response: string = "oui") {
    this.stepSearch = 2;
    localStorage.setItem("stepSearch", JSON.stringify(this.stepSearch));
    localStorage.setItem("stepSearchResponse", JSON.stringify(response));
    //get current position
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]).then();
  }



  /**
   * add marker
   * @param lat
   * @param lng
   * @param icon
   * @param type
   * @param object
   * @param image
   * @param label
   */
  addMarker(lat, lng, icon,  type, object, image, label= "" ) {
    if(label == ""){
      this.markers.push({
        position: {
          lat: lat ,
          lng: lng,
        },
        options: {
          animation: google.maps.Animation.DROP,
          icon: icon
        },
        type: type,
        object: object,
        image: image
      });
    }else{
      if(label=="child"){
        this.markersChild.push({
          position: {
            lat: lat ,
            lng: lng,
          },
          options: {
            animation: google.maps.Animation.DROP,
            icon: icon
          },
          type: type,
          object: object,
          image: image
        });
      }
      else if(label=="church"){
        this.markersChurch.push({
          position: {
            lat: lat ,
            lng: lng,
          },
          options: {
            animation: google.maps.Animation.DROP,
            icon: icon
          },
          type: type,
          object: object,
          image: image
        });
      }

      else{
        this.markersMember.push({
          position: {
            lat: lat ,
            lng: lng,
          },
          options: {
            animation: google.maps.Animation.DROP,
            icon: icon
          },
          type: type,
          object: object,
          image: image
        });
      }

    }

  }

  /**
   * open popup marker
   * @param marker
   * @param windowIndex
   * @param markerElement
   */
  openInfoWindow(marker: MapMarker, windowIndex: number, markerElement) {

    this.markerSelected = markerElement
    this.info.open(marker)
    return;

  }

  saveLocation() {
    this.object.location = this.locationSelected;
    this.object.position = this.locationSelected;

    console.log(this.object);
    this.mainService.create(this.object, this.origin).subscribe({
      next:(res)=>{
        if(res.success){
          this.messageService.add({key: 'tc', severity: 'success', summary: 'Bien', detail: MESSAGE_ENREGISTREMENT_OK});

        }
      }
    })

  }



  /**
   * select my position
   * @param $event
   */
  selectPositionByClick($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {

    if(this.state == "edit"){
      this.locationSelected ={
        lat: $event.latLng.lat(),
        lng: $event.latLng.lng()
      };
      let icon;
      let image;
      let type;
      if(this.origin == "church"){
        icon = 'assets/images/icon/icon_church.png';
        image = 'assets/images/icon/icon_church.png';
        type = "church"
      }

      if(this.origin == "user"){
        icon = 'assets/images/icon/icon_member.png';
        image = 'assets/images/icon/icon_member.png';
        type = "member"
      }

      if(this.markers?.length == 2){
        this.markers.splice(1,1);
      }

      this.addMarker($event.latLng.lat(), $event.latLng.lng(), icon, type, this.object, image);

    }

  }

  /**
   * open child
   */
  openCloseChild() {
    this.addChild = !this.addChild;
    if(this.addChild)this.markers = this.markers.concat(this.markersChild)
    else this.markers = this.markers.filter(x => !this.markersChild.includes(x));
  }

  openCloseMember() {
    this.addMember = !this.addMember;
    if(this.addMember)this.markers = this.markers.concat(this.markersMember)
    else this.markers = this.markers.filter(x => !this.markersMember.includes(x));
  }

  openCloseChurchNear() {
    this.addChurch = !this.addChurch;
    if(this.addChurch)this.markers = this.markers.concat(this.markersChurch)
    else this.markers = this.markers.filter(x => !this.markersChurch.includes(x));

    this.zoom = 15;
  }
}
