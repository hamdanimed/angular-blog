import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

import { Post } from '../../data-types/post';
import { Like } from '../../data-types/like';
import { Category } from '../../data-types/category';
import { User } from '../../data-types/user';
import { CommentInteraction } from '../../data-types/comment';
import { Picture } from '../../data-types/picture';
import { Follow } from '../../data-types/follow';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService{
  createDb(){
    faker.seed(124);
    const pictures : Picture[]=[
      {id:1,url:faker.image.avatar(),alt:""}
    ];
    const users : User[] = [
      {id:1,avatarId:1,username:faker.name.firstName(),email:faker.internet.email(),password:faker.internet.password(),birthday:"1999-12-06",bio:faker.lorem.paragraph()},
      {id:2,avatarId:1,username:faker.name.firstName(),email:faker.internet.email(),password:faker.internet.password(),birthday:"1998-12-06",bio:faker.lorem.paragraph()},
      {id:3,avatarId:1,username:faker.name.firstName(),email:faker.internet.email(),password:faker.internet.password(),birthday:"2000-12-06",bio:faker.lorem.paragraph()},
      {id:4,avatarId:1,username:faker.name.firstName(),email:faker.internet.email(),password:faker.internet.password(),birthday:"1995-12-06",bio:faker.lorem.paragraph()},
      {id:5,avatarId:1,username:faker.name.firstName(),email:faker.internet.email(),password:faker.internet.password(),birthday:"2001-04-06",bio:faker.lorem.paragraph()}
    ];
    const followers: Follow[]=[
      {idFollower:12,idFollowed:13},
      {idFollower:12,idFollowed:13},
      {idFollower:12,idFollowed:14},
    ];
    const posts : Post[] = [
      {
        id:12,
        userId:12,
        date:faker.datatype.number({min:1681342105}),
        title:faker.lorem.words(),
        content:faker.lorem.paragraph(),
        picturesId:[10],
      }
    ];
    const comments : CommentInteraction[] =[
      {id:12,postId:12,date:faker.datatype.number({min:1681342105}),content:faker.lorem.paragraph()},
      {id:12,postId:12,date:faker.datatype.number({min:1681342105}),content:faker.lorem.paragraph()},
      {id:13,postId:11,date:faker.datatype.number({min:1681342105}),content:faker.lorem.paragraph()},
    ];
    const likes : Like[] =[
      {
        id:12,
        postId:12,
        date:faker.datatype.number({min:1681342105})
      }
    ];
    const categories : Category[] =[
      {id:1,name:"sports"},
      {id:2,name:"it"},
      {id:3,name:"scientific"},
      {id:4,name:"art & design"},
      {id:5,name:"gaming"},
      {id:6,name:"life style"},
      {id:7,name:"business"},
      {id:8,name:"health & fitness"},
    ];
    return {pictures,users,followers,posts,comments,likes,categories};
  }

  genId<T extends Picture | User | Post | CommentInteraction | Like | Category>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
