import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CatalogComponent } from '../catalog/catalog.component';
import { CatalogDataService } from '../../services/catalog-data/catalog-data.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
})


export class ModalComponent implements  OnInit {
  readonly dialogRef = inject(MatDialogRef<CatalogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  public catalogData = inject(CatalogDataService);
  public item:any = {};
  
  constructor(
    private _changeDetection: ChangeDetectorRef
  ) { }

  
  ngOnInit() {
    this.getDataById();
  }

  getDataById() {
    this.catalogData.getById(this.data.item).subscribe(x => {
      this.item = x;
      this._changeDetection.markForCheck();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
