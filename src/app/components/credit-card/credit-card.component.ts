import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit{

  listCards:any[] = [
    {
      owner: 'Mark',
      numCard: '12345678900',
      expirationDate: '15/23',
      cvv: 223
    },
    {
      owner: 'Junes',
      numCard: '23456584443',
      expirationDate: '11/23',
      cvv: 2443
    },
    {
      owner: 'Jhon',
      numCard: '12345678963',
      expirationDate: '15/12',
      cvv: 223
    },
  ]

  form: FormGroup;

  constructor(private fb:FormBuilder,
    private toastr: ToastrService) {

    this.form = this.fb.group({
      owner:['', Validators.required],
      numCard:['', Validators.required, Validators.minLength(16), Validators.maxLength(16)],
      expirationDate:['', Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      cvv:['', Validators.required, Validators.minLength(3), Validators.maxLength(3)]
    });

  }

  ngOnInit(): void {

  }

  addCard(){

    const card: any = {

      owner: this.form.get('owner')?.value,
      numCard: this.form.get('numCard')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,

    }

    this.listCards.push(card);
    this.toastr.success('Registered!', 'Card successfully registered!');
    this.form.reset();

  }

  deleteCard(index: number){
    this.listCards.splice(index, 1);
    this.toastr.error('Deleted!', 'Card successfully deleted!');
  }

}
