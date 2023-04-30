import { Component, Input , Output, EventEmitter } from '@angular/core';
import { Category } from '../data-types/category';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {

  @Output() selectTagEvent:EventEmitter<Category> = new EventEmitter<Category>();

  selectTag(tag:Category){
    this.selectTagEvent.emit(tag);
  }


  @Input() tags:Category[]=[];
  @Input() selectedTag:Category = {id:0,name:'all'};

  isTagActive = false;

  onTagClick() {
    this.isTagActive = true;
  }

}
