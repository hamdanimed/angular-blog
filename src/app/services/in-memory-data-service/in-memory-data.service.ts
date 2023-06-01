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
      {id:1,url:faker.image.avatar(),alt:""},
      {id:2,url:faker.image.avatar(),alt:""},
      {id:3,url:faker.image.avatar(),alt:""},
      {id:4,url:faker.image.avatar(),alt:""},
      {id:5,url:faker.image.avatar(),alt:""},
      {id:6,url:faker.image.cats(),alt:""},
      {id:7,url:faker.image.cats(),alt:""},
      {id:8,url:faker.image.cats(),alt:""},
      {id:9,url:faker.image.cats(),alt:""},
      {id:10,url:faker.image.cats(),alt:""},
    ];
    const users : User[] = [
      {id:1,avatarId:1,username:"Hamdanimed",email:faker.internet.email(),password:faker.internet.password(),birthday:"1999-12-06",bio:faker.lorem.paragraph()},
      {id:2,avatarId:2,username:"Ahmed10",email:faker.internet.email(),password:faker.internet.password(),birthday:"1998-12-06",bio:faker.lorem.paragraph()},
      {id:3,avatarId:3,username:"TopReviewer",email:faker.internet.email(),password:faker.internet.password(),birthday:"2000-12-06",bio:faker.lorem.paragraph()},
      {id:4,avatarId:4,username:"Hamza360",email:faker.internet.email(),password:faker.internet.password(),birthday:"1995-12-06",bio:faker.lorem.paragraph()},
      {id:5,avatarId:5,username:"BenAarrouch",email:faker.internet.email(),password:faker.internet.password(),birthday:"2001-04-06",bio:faker.lorem.paragraph()}
    ];
    const followers: Follow[]=[
      {id:1,idFollower:1,idFollowed:2},
      {id:2,idFollower:1,idFollowed:5},
      {id:3,idFollower:2,idFollowed:1},
      {id:4,idFollower:2,idFollowed:3},
      {id:5,idFollower:2,idFollowed:4},
      {id:6,idFollower:3,idFollowed:4},
      {id:7,idFollower:3,idFollowed:1},
      {id:8,idFollower:5,idFollowed:1},
      {id:9,idFollower:5,idFollowed:4},
      {id:10,idFollower:5,idFollowed:2},
    ];
    const posts : Post[] = [
      {id:1,userId:1,date:1675112925,title:"The Easiest Ways to Generate a Side Income with Python",content:"As a seasoned Python developer, I’ve learned that there are countless ways to monetize my skills. However, not all methods are equal in terms of simplicity and potential earnings. In this blog, I’ll share my firsthand experiences and reveal the easiest ways I’ve used Python to generate a side income.",picturesId:[6],categorieId:2},
      {id:2,userId:1,date:1668460125,title:"How to become very good at Machine Learning",content:"Some might recommend ML courses online. But this is the gist of what they suggest. Now none of this is strictly bad per se. It is however incomplete. Such advice will work for you, BUT it will be a grind to get to an advanced level. If you’re someone who is trying to transition into ML from other fields (or has any other time obligations) you don’t have the time for this kind of bottom-up approach. So how can someone like that compete with people who work ML full-time? Or people who spend hours learning the ins and outs of these systems in classes. It took 3 years of Math for me to get to Convolutions, Laplace Transformations, and Multivariate Optimisation. I’m still learning a lot more. You don’t have three years. So what should you do? How can you break into higher ranks of Machine Learning? What can you add to the training that gurus recommend?",picturesId:[7],categorieId:2},
      {id:3,userId:2,date:1683738798,title:"And Then There Were Four- The Premier League Relegation Battle",content:"With just three games to be played, it really is crunch time in the relegation battle. Although not mathematically down just yet, Southampton need several miracles to happen if they have any chance of survival. The other two spots are still wide open, with 19th to 16th being separated by just three points. The four sides",picturesId:[8],categorieId:1},
      {id:4,userId:1,date:1683637818,title:"We’ve Been Wrong About Muscle Cramps for Decades",content:"you’ve ever suffered from a muscle cramp you know just how painful and debilitating it can be. They come in various levels of severity, but most are bad enough to pull you out of your sport or at least greatly affect your performance and overall functionality. While you may think thar",picturesId:[9],categorieId:1},
      {id:5,userId:4,date:faker.datatype.number({min:1681342105}),title:faker.lorem.words(),content:faker.lorem.paragraph(),picturesId:[10],categorieId:6},
      {id:6,userId:5,date:faker.datatype.number({min:1681342105}),title:faker.lorem.words(),content:faker.lorem.paragraph(),picturesId:[],categorieId:7},
      {id:7,userId:1,date:faker.datatype.number({min:1681342105}),title:faker.lorem.words(),content:faker.lorem.paragraph(),picturesId:[],categorieId:1},
      {id:8,userId:2,date:faker.datatype.number({min:1681342105}),title:faker.lorem.words(),content:faker.lorem.paragraph(),picturesId:[],categorieId:8},
    ];
    const comments : CommentInteraction[] =[
      {id:1,userId:1,postId:1,date:faker.datatype.number({min:1681342105}),content:faker.lorem.paragraph()},
      {id:2,userId:5,postId:1,date:faker.datatype.number({min:1681342105}),content:faker.lorem.paragraph()},
      {id:3,userId:1,postId:2,date:faker.datatype.number({min:1681342105}),content:faker.lorem.paragraph()},
    ];
    const likes : Like[] =[
      {id:1,userId:1,postId:1,date:faker.datatype.number({min:1681342105})},
      {id:2,userId:2,postId:1,date:faker.datatype.number({min:1681342105})},
      {id:3,userId:4,postId:1,date:faker.datatype.number({min:1681342105})},
      {id:4,userId:5,postId:1,date:faker.datatype.number({min:1681342105})},
      {id:5,userId:1,postId:2,date:faker.datatype.number({min:1681342105})},
      {id:6,userId:1,postId:3,date:faker.datatype.number({min:1681342105})},
      {id:7,userId:1,postId:5,date:faker.datatype.number({min:1681342105})},
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

  genId<T extends Picture | User | Post | CommentInteraction | Like >(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}
