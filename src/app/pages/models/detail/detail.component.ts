import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  model;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.db
      .list(`/models/${this.id.trim()}`)
      .valueChanges()
      .subscribe(data => {
        this.model = data;
       
      });

    // this.dataService.getOne(this.id).subscribe(data => {
    //   this.model = data;
    // });
  }

  update(newData) {
    this.db.object(`/models/${this.id.trim()}`).update(newData);
    this.router.navigate(['/models']);
  }

  ngOnInit() {}
}
