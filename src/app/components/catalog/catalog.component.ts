import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Signal, ViewChild, computed, inject, model, signal } from '@angular/core';
import {  MatPaginatorModule} from '@angular/material/paginator';
import { CatalogDataService } from '../../services/catalog-data/catalog-data.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

export interface IData {
  items: Object[],
  total: Number,
  totalPages: Number
}

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatPaginatorModule, ModalComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatInputModule, FormsModule,],
})
export class CatalogComponent implements OnInit {
  public pageIndex = 0;
  public length = 100;
  public pageSize = 20;
  public data1 = signal([{}]);
  public data:any = [{}];
  public dataDetail:any = {};
  public authService = inject(AuthService);
  public animal = signal('');
  public readonly item = model('');
  public readonly dialog = inject(MatDialog);

  public catalogData = inject(CatalogDataService);

  constructor(
    private _changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getData();
  }

  public getData(pageIndex?: number) {
    if(pageIndex) {
      return this.catalogData.getData(pageIndex).subscribe(x => {
        this.data1.set(x.items);
        this._changeDetection.markForCheck();
        this.pagePaginate();
      })
    }
    return this.catalogData.getData().subscribe(x => {
      this.data1.set(x.items);
      this._changeDetection.markForCheck();
      this.pagePaginate();
    })


  }

  public pagePaginate(e?:any) {
    let firstCut = this.pageIndex * this.pageSize;
    let secondCut = firstCut + this.pageSize;;
    if(e){
      firstCut = e.pageIndex * e.pageSize;
      secondCut = firstCut + e.pageSize;
      this.getData(e.pageIndex);
    }
    this.data = this.data1().slice(firstCut, secondCut);
  }

  public openDialog(item?:any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
     
      data: {item: item.kinopoiskId, animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

}
