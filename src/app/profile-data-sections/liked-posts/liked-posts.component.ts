import { Component } from '@angular/core';
import { faThumbsUp,faCommentAlt} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent {
  faThumbsUp=faThumbsUp;
  faCommentAlt=faCommentAlt;
}
