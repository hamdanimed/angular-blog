import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent {
  falike = faThumbsUp;
  facomment = faCommentAlt;
  faback = faArrowLeft;

  constructor(private location: Location){}

  goBack(){
    this.location.back();
  }
}
