import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  user= {
    email: '',
    name: ''
  };
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.db
      .list(`/users/${this.id.trim()}`)
      .valueChanges()
      .subscribe(data => {
        this.user.email = <string>data[0];
        this.user.name = <string>data[1];
      });

    // this.dataService.getOne(this.id).subscribe(data => {
    //   this.user = data;
    // });
  }

  update(newData) {
    this.db.object(`/users/${this.id.trim()}`).update(newData);
    this.router.navigate(['/users']);
  }

  ngOnInit() {}
}
