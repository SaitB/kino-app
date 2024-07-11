import { ChangeDetectionStrategy, Component, OnInit, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../interface/iuser';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatInputModule, FormsModule, ],
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  public authService = inject(AuthService);
  // public animal = signal('');
  // public readonly name = model('');
  public readonly dialog = inject(MatDialog);



  public initForm(): void {
      this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.min(5)])
    });
  
  }

  constructor( private _router: Router) {
   
   }

  ngOnInit() {
    this.initForm();
  }

  public submit( ) {   
    let user: IUser = {
      email: this.form.value.email, 
      password : this.form.value.password
    }
    return this.authService.login(user).subscribe((x) => {
      this.authService.setToLocalStorage(x);
      this.form.reset()
      this._router.navigate(['catalog']);
    })
  }






}
