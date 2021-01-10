import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import * as GoogleMapsLoader from 'google-maps';
import { load } from '@angular/core/src/render3';
import { MatSnackBar } from '@angular/material';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn, bounceInDown, pulse } from 'ng-animate';

class Location {
  lat: number;
  lng: number;
}

class Drop {
  model_id: string;
  model_name: string;
  fbx: string;
  lat: string;
  lon: string;
  time: string;
}

@Component({
  selector: 'app-auto-drops',
  templateUrl: './auto-drops.component.html',
  styleUrls: ['./auto-drops.component.scss'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn, {
      params: {
        timing: 0.5,
      }
    })
    )]),
  ],
})
export class AutoDropsComponent implements OnInit {
  bounceIn: any;
  drop_generated = false;
  drop: Drop = new Drop();
  count = 1;

  markers: Array<any> = [];
  locations: Array<Location> = [];

  models: Array<any> = [];
  google;
  input: HTMLInputElement;
  radius = 150;
  drops = 1;
  map;
  marker;
  circle;
  geoCoder;
  loc: Location;

  constructor(private db: AngularFireDatabase, private snackBar: MatSnackBar) {
    this.db
      .list('/models')
      .snapshotChanges()
      .pipe(
        map(data => data.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(models => {
        this.models = models;
      });
  }
  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.input = <HTMLInputElement>document.getElementById('pac-input');

    GoogleMapsLoader.KEY = 'AIzaSyCXjWHn5fnsaG-RyTEADAP_7_QSYLlstl0';
    GoogleMapsLoader.LIBRARIES = ['places'];
    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load(google => {
      this.google = google;

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6518, lng: 73.1566 },
        zoom: 16
      });

      this.marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        position: { lat: 33.6518, lng: 73.1566 },
        visible: true,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      });

      //  this.addMarker(-33.8688, 151.2195, true)

      this.marker.addListener('dragend', () => {
        // tslint:disable-next-line:prefer-const
        let latlng = this.marker.getPosition();

        // tslint:disable-next-line:prefer-const
        let geoCoder = new google.maps.Geocoder();
        geoCoder.geocode(
          {
            location: {
              lat: latlng.lat(),
              lng: latlng.lng()
            }
          },
          (results, status) => {
            this.input.value = results[0].formatted_address;
          }
        );
      });

      this.circle = new google.maps.Circle({
        map: this.map,
        radius: this.radius,
        fillColor: '#000033',
        strokeColor: '#ff0000',
        strokeWeight: 0.5
      });

      this.circle.bindTo('center', this.marker, 'position');
      // this.marker.setVisible(true);

      const autocomplete = new google.maps.places.Autocomplete(this.input);

      autocomplete.bindTo('bounds', this.map);

      // Set the data fields to return when the user selects a place.
      autocomplete.setFields([
        'address_components',
        'geometry',
        'icon',
        'name'
      ]);

      autocomplete.addListener('place_changed', () => {
        // Sets the map on all markers in the array.
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
        this.locations = [];

        // infowindow.close();
        this.marker.setMap(null);

        // tslint:disable-next-line:prefer-const
        let place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert('No details available for input: \'' + place.name + '\'');
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17); // Why 17? Because it looks good.
        }
        this.marker.setPosition(place.geometry.location);
        this.circle.bindTo('center', this.marker, 'position');
        this.marker.setMap(this.map);

        let address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] &&
              place.address_components[0].short_name) ||
              '',
            (place.address_components[1] &&
              place.address_components[1].short_name) ||
              '',
            (place.address_components[2] &&
              place.address_components[2].short_name) ||
              ''
          ].join(' ');
        }
      });
    });
  }

  /////////////////////////////////////////////////////////

  setRadius() {
    this.circle.setRadius(this.radius);
  }

  countFunction() {
    // Sets the map on all markers in the array.
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    this.locations = [];

    this.loc = new Location();
    const latlng = this.marker.getPosition();

    this.loc.lat = latlng.lat();
    this.loc.lng = latlng.lng();

    for (let index = 0; index < this.count; index++) {
      this.locations.push(this.getRandomLoc(this.loc, this.radius));
    }

    for (let index = 0; index < this.count; index++) {
      this.loc.lat = this.locations[index].lat;
      this.loc.lng = this.locations[index].lng;

      this.addMarker(this.loc.lat, this.loc.lng, true, index);
    }

    this.drop_generated = true;
  }

  getRandomLoc(loc: any, dis: number): any {
    const DegreesToRadians = Math.PI / 180.0;
    const RadiansToDegrees = 180.0 / Math.PI;
    const EarthRadius = 6378137.0;

    const newLoc = new Location();
    const latA = loc.lat * DegreesToRadians;
    const lngA = loc.lng * DegreesToRadians;

    const rDistance = Math.random() * dis;

    const distance = rDistance / EarthRadius;

    const course = Math.random() * 360 * DegreesToRadians;

    const newLat = Math.asin(
      Math.sin(latA) * Math.cos(distance) +
        Math.cos(latA) * Math.sin(distance) * Math.cos(course)
    );
    let newLng = Math.atan2(
      Math.sin(course) * Math.sin(distance) * Math.cos(latA),
      Math.cos(distance) - Math.sin(latA) * Math.sin(latA)
    );

    newLng = ((lngA + newLng + Math.PI) % (Math.PI * 2)) - Math.PI;

    newLoc.lat = newLat * RadiansToDegrees;
    newLoc.lng = newLng * RadiansToDegrees;

    return newLoc;
  }

  addMarker(lat, lng, draggable, index) {
    const marker = new this.google.maps.Marker({
      map: this.map,
      position: { lat: lat, lng: lng },
      visible: true,
      draggable: draggable
    });

    marker.addListener('dragend', () => {
      // tslint:disable-next-line:prefer-const
      let latlng = this.marker.getPosition();
      // console.log(latlng);

      this.locations[index].lat = latlng.lat();
      this.locations[index].lng = latlng.lng();
    });

    this.markers.push(marker);
  }

  saveDrop(data) {

 //   console.log(data);

    let m;
    // let m= this.models.find(item => (item.key == data.key))
    // console.log(m);

    this.models.forEach(item => {

      if (item.key === data.model) {
      //  console.log(item);

        m = item;
      }
    });

    if (data.model !== '') {
      this.locations.forEach(loc => {
        this.drop.lat = loc.lat.toString();
        this.drop.lon = loc.lng.toString();

        this.drop.fbx = m.fbx;
        this.drop.model_name = m.name;
        this.drop.model_id = data.model;
        this.drop.time = this.getCurentDateTime();

       this.db.list('/drops').push(this.drop);

      // console.log(this.drop);

        this.drop = new Drop();

        this.openSnackBaar();
      });
    }
  }

  openSnackBaar(): any {
    this.snackBar.open('Offers Droped.', '', {
      duration: 3000
    });
  }

  getCurentDateTime() {
    const d = new Date();

    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const dateTime =
      day +
      '/' +
      month +
      '/' +
      year +
      ' ' +
      hour +
      ':' +
      minutes +
      ':' +
      seconds;

    return d['toGMTString']();
  }
}
