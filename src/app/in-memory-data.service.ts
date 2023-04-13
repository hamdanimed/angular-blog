import { Injectable } from '@angular/core';
import { Post } from './post';
import { Like } from './like';
import { Category } from './category';
import { User } from './user';
import { CommentInteraction } from './comment';

import { faker } from '@faker-js/faker';
import { Picture } from './picture';

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
      {
        id:12,
        postId:12,
        date:faker.datatype.number({min:1681342105}),
        content:faker.lorem.paragraph()
      }
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
    return {pictures,users,posts,comments,likes,categories};
  }

  genId<T extends Picture | User | Post | CommentInteraction | Like | Category>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
