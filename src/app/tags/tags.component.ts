import { Component } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  isTagActive = false;

  onTagClick() {
    this.isTagActive = true;
  }

}
