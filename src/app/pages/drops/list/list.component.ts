import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { map } from 'rxjs/operators';

import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
// import 'rxjs/add/operator/map';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from "ng-animate";


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn, {
      params: {
        timing: 0.5,
      }
    })
    )]),
  ],
})
export class ListComponent implements OnInit, OnDestroy {

  bounceIn: any;

  sub: Subscription
  displayedColumns = ["position", "model_name", "lat", 'lng', 'time'];
  dataSource: MatTableDataSource<DropsCollection>;

  models_URI = 'https://angular-7-project.firebaseio.com/models/';
  modelsRef$: AngularFireList<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  models = [];

  constructor(private http: HttpClient,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private route: Router
  ) {

    this.modelsRef$ = this.db.list("/drops");

    this.sub = this.modelsRef$
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(list => {

        this.models = new Array;
        let index = 0;

        list.forEach(element => {
          let tempObj = {
            model_id: element.model_id,
            model_name: element.model_name,
            time: element.time,
            lat: element.lat,
            lng: element.lon
          }

          this.models.push(tempObj);

          //Model name request

          // try {
          //   this.getModelName(element.model_id, index);
          // } catch (error) {

          // }
          index++;
        });
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.models);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() { }

  clicked(d) {
    return this.route.navigate[`/${d.key}`];
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(formValue) {
    this.modelsRef$.push(formValue);
  }

  getModelName(id, index) {
    this._sendRequest(id).then((data: any) => {
      // console.log(data);
      this.models[index].model_name = data.name;
    })
  }

  _sendRequest(id) {
    return new Promise(resolve => {
      this.http.get(this.models_URI + id + '.json')
        .subscribe(data => { resolve(data); },
          err => {
            console.log(err); resolve(false)
          });
    });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

export interface DropsCollection {
  Key: string;
  model_id: string;
  lat: number;
  lng: number;
  time: string
}
