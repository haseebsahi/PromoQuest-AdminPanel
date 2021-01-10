import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { map } from "rxjs/operators";
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";

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
export class ListComponent implements OnInit {
  bounceIn: any;
  
  displayedColumns = ["position", "name", "email"];
  dataSource: MatTableDataSource<UserCollection>;

  usersRef$: AngularFireList<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private route: Router
  ) {
    let users: Array<any> = [];
    this.usersRef$ = this.db.list("/users");

    this.usersRef$
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(list => {
        users = list;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() {}

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
    this.usersRef$.push(formValue);
  }

}

export interface UserCollection {
  Key: string;
  name: string;
  email: string;
}
