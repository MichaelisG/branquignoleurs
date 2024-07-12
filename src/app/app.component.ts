import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ihm';

  thing: any;

  testForm = this.fb.group({
    test: [],
  });

  constructor(
    private fb: FormBuilder,
    private store: AngularFirestore,
  ) {
  }

  onTest() {
    console.log(this.testForm.get('test')!.value);
    const ref = this.store.collection('/test');
    ref.snapshotChanges()
    .pipe(
      map(t => t.map(
        c => ({ id: c.payload.doc.id, data: c.payload.doc.data() }),
      )),
    )
    .subscribe(console.log);
  }
}
