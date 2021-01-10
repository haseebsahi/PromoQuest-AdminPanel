import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from "ng-animate";

@Component({
  selector: "app-claims",
  templateUrl: "./claims.component.html",
  styleUrls: ["./claims.component.scss"],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn, {
      params: {
        timing: 0.5,
      }
    })
    )]),
  ],
})
export class ClaimsComponent {
  bounceIn; any;

  rows = '';
  colums = '';
  table = '';

  rows1: HTMLTableHeaderCellElement;
  table1: HTMLTableElement;

  displayedColumns = [];
  dataSource = new MatTableDataSource<UserCollection>();
  
  main_userList: UserCollection[] = [];
  main_walletList: any = [];

  model_dictionary = new Array<Dictionary>();

  UserRef$: AngularFireList<any>;
  ModelRef$: AngularFireList<any>;
  WalletRef$: AngularFireList<any>;

  userSubscription: Subscription;
  modelSubscription: Subscription;
  walletSubscription: Subscription;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private db: AngularFireDatabase) {

    this.UserRef$ = this.db.list("/users");
    this.ModelRef$ = this.db.list("/models");
    this.WalletRef$ = this.db.list("/wallets");

    this.walletSubscription = this.WalletRef$.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(walletList => {
        this.main_walletList = walletList;
        this.userSubscription = this.UserRef$.snapshotChanges()
          .pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe(userList => {
            this.main_userList = userList;
            this.modelSubscription = this.ModelRef$.snapshotChanges()
              .pipe(
                map(changes =>
                  changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                )
              )
              .subscribe(model_list => {
                this.table = '';
                this.rows = '';
                this.colums = '';
                model_list.forEach(mh => {
                  this.colums += "<th>" + mh.name + "</th>";
                });
                // walletList.forEach(wallet => {
                userList.forEach(user => {
                  var model_counts = "";
                  model_list.forEach(model => {
                    model_counts += '<td>' + this.getWalletCounts(user.key, model.key) + "</td>";
                  });
                  this.rows +=
                    '<tr style="height: 45px; border-top: 1px solid rgb(221, 219, 219);">' +
                    '<td>' + user.name + "</td>" +
                    "<td>" + user.email + "</td>" +
                    // "<td>" + 
                    model_counts
                  //  + "</td>"
                  "</tr> ";
                });
                // })

                this.table = '<table style="width:100%; background-color:white; font-size:1em; text-align:center;">' +
                  "<tr style='color: blue; height:45px; font-size: 1.2em;'>" +
                  "<th>Name</th>" +
                  "<th>Email</th>" +
                  this.colums +
                  "</tr>" +
                  this.rows +
                  "</table>";
              });
          });
      })
  }

  setUserValue(arg0: { user: any; dictionaries: Dictionary[]; }): any {

    let user = new UserCollection();
    user.claims = new Array<Dictionary>();

    user.key = arg0.user.key;
    user.name = arg0.user.name;
    user.email = arg0.user.email;
    user.claims = arg0.dictionaries;

    this.main_userList.push(user);
  }

  getData(row: UserCollection, column) {

    let result = undefined;
    row.claims.forEach(item => {
      if (item.MODEL_NAME == column) {

        result = item.count
      }
    })

    if (result == undefined) {
      return row[column]
    }
    return result

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getWalletCounts(user_id, model_id) {

    let count = 0;

    this.main_walletList.forEach(element => {

      if (element.key == user_id) {
        var models = [];
        for (var key in element) {
          if (key != 'key') {
            models.push(element[key])
          }
        }
        models.forEach(m => {
          if (m.model_id == model_id) {
            count = count + m.claims;
          }
        });
      }
    });
    return count;

  }

  getCounts(user_id, model_id) {

    try {
      var temp;
      temp = this.main_userList.filter(f => f.key == user_id).pop();

      let count = 0;

      if (temp.claim != null) {

        for (let key in temp.claims) {

          let ModelID = temp.claims[key].model_id;

          if (ModelID == model_id) {

            count++;
          }
        }
      }
      return count;
    }
    catch (err) {
      return 0
    }
  }
}

export class Dictionary {
  public MODEL_KEY: string;
  public MODEL_NAME: string;
  public count: number = 0;
}

export class UserCollection {
  key: string;
  name: string;
  email: string;
  claims: Array<Dictionary>;
}

export class WalletCollection {

}
