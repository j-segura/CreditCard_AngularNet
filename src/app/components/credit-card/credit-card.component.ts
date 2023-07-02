import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit{

  listCards:any[] = [];
  action = 'Add';

  form: FormGroup;
  id: number | undefined;

  constructor(private fb:FormBuilder,
    private toastr: ToastrService,
    private _cardService : CardService) {

    this.form = this.fb.group({
      owner:['', Validators.required],
      numCard:['', Validators.required, Validators.minLength(16), Validators.maxLength(16)],
      expirationDate:['', Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      cvv:['', Validators.required, Validators.minLength(3), Validators.maxLength(3)]
    });

  }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){
    this._cardService.getCardList().subscribe(data => {
      this.listCards = data;
    },error => {
      console.log(error);
    })
  }

  addCard(){

    const card: any = {

      owner: this.form.get('owner')?.value,
      numCard: this.form.get('numCard')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,

    }

    if (this.id == undefined) {
      this._cardService.saveCard(card).subscribe(data => {
        this.toastr.success('Registered!', 'Card successfully registered!');
        this.getCards();
        this.form.reset();
      },error => {
        this.toastr.error('Not Registered!', 'Card NOT registered!');
      })
    }else {
      card.id = this.id;
      this._cardService.updateCard(this.id, card).subscribe(data => {
        this.form.reset();
        this.action = 'Add';
        this.id = undefined;
        this.toastr.info('Updated!', 'Card successfully Updated!');
        this.getCards();
      },error => {
        this.toastr.error('Not Updated!', 'Card NOT Updated!');
      })
    }

  }

  deleteCard(id: number){
    this._cardService.deleteCard(id).subscribe(data => {
      this.toastr.error('Deleted!', 'Card successfully deleted!');
      this.getCards();
    },error => {
      console.log("Error deleting the Card");
    });
  }

  editCard(card: any){
    this.action = 'Edit';
    this.id = card.id;

    this.form.patchValue({
      owner: card.owner,
      numCard: card.numCard,
      expirationDate: card.expirationDate,
      cvv: card.cvv
    })
  }

}
