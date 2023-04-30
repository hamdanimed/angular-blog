import { Component, Output,Input,EventEmitter } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-filters',
  templateUrl: './home-filters.component.html',
  styleUrls: ['./home-filters.component.css']
})
export class HomeFiltersComponent {
  faCard = faCaretDown;
  faPlus = faPlus;
  
  @Input() forYou:boolean=false;
  @Input() sort:string="";
  @Output() forYouEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleForYou(forYou:boolean){
    this.forYouEvent.emit(forYou);
  }
  @Output() selectSortEvent:EventEmitter<string> = new EventEmitter<string>();
  selectSort(sort:string){
    this.selectSortEvent.emit(sort);
  }


}
