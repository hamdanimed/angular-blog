import { Component } from '@angular/core';

import { faPlus,faThumbsUp,faCommentAlt,faEye,faPen,faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent {
  faPlus=faPlus;
  faThumbsUp=faThumbsUp;
  faCommentAlt=faCommentAlt;
  faEye=faEye;
  faPen=faPen;
  faTrash=faTrash;

}
