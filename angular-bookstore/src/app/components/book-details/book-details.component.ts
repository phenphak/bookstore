import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book:Book =new Book();
  constructor(private bookService :BookService,private activatedRoute :ActivatedRoute,private cartService :CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      ()=>{
        this.getBookInfo();
      }
    )
  }

  getBookInfo(){
    const id :number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.get(id).subscribe(
      data => this.book=data
    )
  }

  addToCart(){
    const cartItems = new CartItem(this.book);
    this.cartService.addToCart(cartItems);
  }

}
