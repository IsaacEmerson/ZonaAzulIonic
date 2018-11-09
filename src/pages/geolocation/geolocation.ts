import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Observable } from 'rxjs/Observable';
import { SpinnerProvider } from '../../providers/spinner/spinner'


declare var google: any;

@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  map: any;
  address = '';
  search: boolean = false;
  switch: string = "map";
  styleMap = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ];

  polygons = [];
  poligono_areas = {};
  poligono_logradouro = {};
  quant_poly = 0;

  logradouros = [];

  actual_city: any = {};

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public viewCtrl: ViewController,
    public platform: Platform,
    public spinner: SpinnerProvider,
    public alertCtrl: AlertController,
    public storage: Storage,
    public http: HttpServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation
  ) {
    this.platform.ready().then(() => this.loadMaps());
  }

  ionViewDidLoad() {
    this.storage.get('city_actual').then((city) => {
      this.actual_city = city;
    });
  }

  getLogradouros(type_area, id_area_logradouro) {
    this.http.getParam('client/buscarLogradouros', 'type_area=' + type_area + '&id_area_logradouro=' + id_area_logradouro).subscribe((result: any) => {
      this.logradouros = result;
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  getAreas() {
    this.http.get('client/areasLogradouros').subscribe((res: any) => {
      this.poligono_areas = res.poligono_areas;
      this.poligono_logradouro = res.poligono_logradouros;
      this.drawParkingAreas(this.poligono_areas, 0);
      this.drawParkingAreas(this.poligono_logradouro, 1);
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  drawParkingAreas(areas, cor: any) {
    let type_area = cor;
    cor == 1 ? cor = '#FF0000' : cor = '#FFAAAA';
    let pol = [];
    let i = 0;
    for (let key in areas) {
      pol[i] = new google.maps.Polygon({
        type_area: type_area,
        id_area_logradouro: key,
        paths: areas[key],
        strokeColor: cor,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: cor,
        fillOpacity: 0.30
      });
      pol[i].setMap(this.map);
      pol[i].addListener('click', (data) => {
        console.log(key + " " + type_area);
      });
      i++;
    }
    this.polygons[type_area] = pol;
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
      this.getAreas();
    } else {
      this.errorAlert('Error', 'Algo deu errado com a conexão com a Internet. Por favor, verifique sua Internet.')
    }
  }

  findInPoly(arrayPoly, latLng) {
    for (let poly of arrayPoly) {
      if (google.maps.geometry.poly.containsLocation(latLng, poly)) {
        //console.log(poly);
        return poly;
      }
    }
    return false;
  }

  initializeMap() {
    let that = this;
    that.currentLocation();
    this.zone.run(() => {

      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        //draggable: true,
        zoom: 16,
        center: this.actual_city ?
          { lat: +this.actual_city.lat, lng: +this.actual_city.lng } :
          { lat: 51.165691, lng: 10.451526 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: this.styleMap,
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: true,
      });

      // Map drag started
      google.maps.event.addListener(this.map, 'dragstart', () => {
        console.log('Drag start');
      });

      // Map dragging
      google.maps.event.addListener(this.map, 'drag', () => {
        that.address = 'Procurando...';
      });

      //Reload markers every time the map moves
      google.maps.event.addListener(this.map, 'dragend', () => {
        this.setLogradourosAndRates(that);
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });

    });
  }

  setLogradourosAndRates(that){
    let map_center = that.getMapCenter();
        let latLngObj = new google.maps.LatLng(map_center.lat(), map_center.lng());

        let logradouro;
        let area;
        if (logradouro = this.findInPoly(this.polygons[1], latLngObj)) {
          console.log(logradouro);
          console.log('achou na logradouro');
          this.getLogradouros(logradouro.type_area, logradouro.id_area_logradouro);
        } else if(area = this.findInPoly(this.polygons[0], latLngObj)) {
          if (area) {
            console.log(area);
            console.log('achou na Area');
            this.getLogradouros(area.type_area, area.id_area_logradouro);
          }
        }else{
          this.logradouros = [];
        }

        console.log(latLngObj);
        that.getAddress(latLngObj);
  }

  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let latLngObj = new google.maps.LatLng(location.lat(), location.lng());

      this.getAddress(latLngObj);

      let options = {
        center: location,
        zoom: 16
      };

      this.map.setOptions(options);
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          this.address = 'Autocomplete returned place with no geometry';
          // sub.error({
          //   message: 'Autocomplete returned place with no geometry'
          // });
        } else {
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          let latLngObj = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
          this.getAddress(latLngObj);
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  getAddressComponentByPlace(place, latLngObj) {
    var components;

    components = {};

    for (var i = 0; i < place.address_components.length; i++) {
      let ac = place.address_components[i];
      components[ac.types[0]] = ac.long_name;
    }

    let addressObj = {
      street: (components.street_number) ? components.street_number : 'not found',
      area: components.route,
      city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
      country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
      postCode: components.postal_code,
      loc: [latLngObj.long, latLngObj.lat],
      address: this.address
    }
    this.storage.clear();
    this.storage.set('carryr_customer', addressObj);
    return components;
  }

  currentLocation() {
    this.spinner.load();

    let locationOptions = { enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(latLng);
      let latLngObj = { lat: position.coords.latitude, long: position.coords.longitude };
      // Display  Marker
      this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      this.getAddress(latLng);
      this.spinner.dismiss();
      this.storage.set('current_latlong', latLngObj);
      return latLng;
    }, (err) => {
      console.log(err);
    });
  }

  getAddress(latLngObj) {
    console.log(latLngObj);
    //var latlng = new google.maps.LatLng(latLngObj.lat, latLngObj.long);
    var geocoder = new google.maps.Geocoder();
    // Get the address object based on latLngObj
    geocoder.geocode({
      latLng: latLngObj
    }, (results, status) => {

      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log(results[1]);

          this.address = results[0].formatted_address;
          //this.getAddressComponentByPlace(results[0], latLngObj);
        } else {
          console.log('No results found');
          this.address = results[0].formatted_address;
          //this.getAddressComponentByPlace(results[0], latLngObj);
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  getMapCenter() {
    return this.map.getCenter();
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  errorAlert(title, message) {
    alert('Error in Alert');
  }

}
