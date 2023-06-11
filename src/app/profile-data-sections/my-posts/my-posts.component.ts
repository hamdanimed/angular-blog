import { Component ,ElementRef,Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faPlus,faThumbsUp,faCommentAlt,faEye,faPen,faTrash,faTimes } from '@fortawesome/free-solid-svg-icons'
import { Category } from 'src/app/data-types/category';
import { EagerPost } from 'src/app/data-types/eagerPost';
import { Post } from 'src/app/data-types/post';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { FakeDataService } from 'src/app/services/fake-data-service/fake-data.service';
import { FirebaseService } from 'src/app/services/firebase-service/firebase.service';

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
  faTimes=faTimes;
  faTrash=faTrash;

  filter:string = ""
  setFilter(filter:string){
    this.filter = filter;
    this.updatePosts();
  }
  updatePosts(){
    if(this.filter==='newest'){
      this.eagerPosts.sort((a,b) => b.post.date - a.post.date)
    }
    else if(this.filter==='popular'){
      this.eagerPosts.sort((a,b) => b.likesCount - a.likesCount)

    }
  }

  userInPage!:any;
  eagerPosts:any[] = [];
  images:{url:any,file:File}[]=[];
  categories!:any[];
  postToDeleteId:any="";

  loggedInUser!:any;
  bindedPostObject:{title:string,content:string,date:number,categorieId:number,username:string,pictureUrl:string}={
    title:"",
    content:"",
    date:0,
    categorieId:0,
    username:"",
    pictureUrl:""
  };
  selectCategory!:any;
  modalAction:string='create'; // 'modify' ou 'create'
  postToModifyId:any="";

  @ViewChild('imgInput', { static: true }) imgInput!: ElementRef<HTMLInputElement>;

  getFile(){
    const fileInput = this.imgInput.nativeElement;
    return fileInput.files;
  }

  constructor(private firebase:FirebaseService,private cloudinary:CloudinaryService,private fakeDataService:FakeDataService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(){
    this.firebase.getCategories().subscribe(categories=>{
      this.categories=categories;
    })
    //get the route parameters from the parent route
    this.route.parent?.params.subscribe((params)=>{
      this.loggedInUser=this.firebase.user;
      this.userInPage={username:params['id']};
      //get the following list of the user with the id in parameter
      this.firebase.getPosts().subscribe(posts=>{
        this.eagerPosts=[];
        const userPosts=posts.filter(post=>post.username===this.userInPage.username);
        userPosts.forEach((post)=>{
          let eagerPost :any = {post:{},date:0,category:"",commentsCount:0,likesCount:0};
          eagerPost.post=post;
          eagerPost.date=new Date(eagerPost.post.date);
          eagerPost.category=this.categories.filter(categorie=>{return categorie['id']===String(eagerPost.post.categorieId)})[0];
          // this.firebase.getCategories().subscribe((categories)=>{
          //   this.categories=categories;
          // })
          this.firebase.getComments().subscribe((comments)=>{
            eagerPost.commentsCount=comments.filter(comment=>comment['postId']===eagerPost.post.id).length;
          })
          this.firebase.getLikes().subscribe(likes=>{
            eagerPost.likesCount=likes.filter(oneLike=>oneLike['postId']===eagerPost.post.id).length;
          })

          // console.log(eagerPost)
          this.eagerPosts.push(eagerPost);
        })
        
      })
      // this.fakeDataService.getUserPosts(params['id']).subscribe((posts)=>{
      //   // this.posts=posts;
      //   posts.forEach((post)=>{
      //     let eagerPost = {} as EagerPost;
      //     eagerPost.post = post;
      //     eagerPost.date = new Date(post.date*1000);
      //     //converte date from timestamp to a Date object for each post
      //     // this.dates.push(new Date(post.date*1000));
      //     //get categorie object for each post's categorie
      //     this.fakeDataService.getCategory(post.categorieId).subscribe((category)=>{
      //       // this.categories.push(category);
      //       eagerPost.category= category;
      //     })
      //     //get comments for each posts to get the number of comments
      //     this.fakeDataService.getComments(post.id).subscribe((comments)=>{
      //       // this.commentsCounters.push(comments.length);
      //       eagerPost.commentsCount = comments.length;
      //     })
      //     //get likes for each posts to get the number of likes
      //     this.fakeDataService.getLikes(post.id).subscribe((likes)=>{
      //       // this.likesCounters.push(likes.length);
      //       eagerPost.likesCount = likes.length;
      //       this.eagerPosts.push(eagerPost)
      //       console.log(this.eagerPosts);
      //     })
      //   })

      // })

    })
  }

  showUploadedImgs(event:any){
    let files=event.target.files;
    if(files.length === 0) return ;
    
    const readersPromises=[];

    for(let i=0;i<files.length;i++){

      readersPromises.push(
        new Promise((resolve,reject)=>{
          if(this.images.length===0){
            this.images.push({url:URL.createObjectURL(files[i]),file:files[i]})
          }else{
            this.images=[{url:URL.createObjectURL(files[i]),file:files[i]}];
          }
          resolve(files[i].name);
          reject(console.log("an error happened while loading the images"))
        })
      );
    }

    Promise.all(readersPromises).then((value)=>{
      console.log("images were all loaded",value)
    })

  }

  deleteImage(imageToDelete:any){
    this.images=this.images.filter((img)=>{return img!==imageToDelete});
  }

  showModal(dialog:HTMLDialogElement){
    dialog.showModal();
  }
  closeModal(dialog:HTMLDialogElement){
    dialog.close();
  }

  verifyDeletePost(postId:any,dialog:HTMLDialogElement){
    dialog.showModal();
    this.postToDeleteId=postId;
    
  }
  deletePost(dialog:HTMLDialogElement){
    dialog.close();
    if(this.postToDeleteId.length){
      this.firebase.deletePost(this.postToDeleteId).subscribe(()=>{
        console.log('post was deleted')
      })
    }
    this.postToDeleteId="";
  }
  cancelPostDeletion(dialog:HTMLDialogElement){
    this.postToDeleteId="";
    console.log('cancel post deletion')
    dialog.close();
  }

  redirectToViewPost(postId:any){
    this.router.navigate([`/post/${postId}`])
  }

  executeModalAction(dialog:HTMLDialogElement){
    if(this.selectCategory && this.selectCategory.toLowerCase()!=="categories" && this.bindedPostObject.content.length && this.bindedPostObject.title.length){
     
      if(this.modalAction==='create'){
        this.bindedPostObject.categorieId=this.categories.filter(category=>category['name'].toLowerCase()===this.selectCategory.toLowerCase() )[0].id;
        this.bindedPostObject.date=Date.now();
        this.bindedPostObject.username=this.loggedInUser.username;
        // this.bindedPostObject.pictureUrl="https://picsum.photos/500";
        if(this.getFile() !== null){
          this.cloudinary.uploadPhoto(this.getFile() as FileList).subscribe(
            (data:any)=>{
              // console.log(data)
              this.bindedPostObject.pictureUrl=data.url;
              // console.log(this.newPost);
              this.firebase.addPost(this.bindedPostObject).subscribe(()=>{
                  console.log('create new post');
                  this.bindedPostObject={
                    title:"",
                    content:"",
                    date:0,
                    categorieId:0,
                    username:"",
                    pictureUrl:""
                  };
              })
              this.selectCategory='CATEGORIES';
              this.images=[];
          })
        }else{
          console.log(this.bindedPostObject);
          this.firebase.addPost(this.bindedPostObject).subscribe(()=>{
            console.log('create new post');
            this.bindedPostObject={
              title:"",
              content:"",
              date:0,
              categorieId:0,
              username:"",
              pictureUrl:""
            };
            this.selectCategory='CATEGORIES';
            this.images=[];
          })
        }

      }
      else if(this.modalAction==='modify'){
        this.bindedPostObject.categorieId=this.categories.filter(category=>category['name'].toLowerCase()===this.selectCategory.toLowerCase() )[0].id;
        this.bindedPostObject.date=Date.now();
        this.bindedPostObject.username=this.loggedInUser.username;
        // this.bindedPostObject.pictureUrl="https://picsum.photos/500";

        if(this.getFile() !== null){
          this.cloudinary.uploadPhoto(this.getFile() as FileList).subscribe(
            (data:any)=>{
              // console.log(data)
              this.bindedPostObject.pictureUrl=data.url;
              // console.log(this.newPost);
              console.log(this.bindedPostObject);
              this.firebase.updatePost({...this.bindedPostObject,id:this.postToModifyId}).subscribe(()=>{
                console.log('updated the post');
                this.bindedPostObject={
                  title:"",
                  content:"",
                  date:0,
                  categorieId:0,
                  username:"",
                  pictureUrl:""
                };
                this.selectCategory='CATEGORIES';
                this.postToModifyId="";
                this.modalAction='create';
                this.images=[];
        }) 
          })
        }else{
          console.log(this.bindedPostObject);
          this.firebase.updatePost({...this.bindedPostObject,id:this.postToModifyId}).subscribe(()=>{
            console.log('updated the post');
            this.bindedPostObject={
              title:"",
              content:"",
              date:0,
              categorieId:0,
              username:"",
              pictureUrl:""
            };
            this.selectCategory='CATEGORIES';
            this.postToModifyId="";
            this.modalAction='create';
            this.images=[];
          }) 
        }


        // console.log(this.bindedPostObject);
        // this.firebase.updatePost({...this.bindedPostObject,id:this.postToModifyId}).subscribe(()=>{
        //   console.log('updated the post');
        //   this.bindedPostObject={
        //     title:"",
        //     content:"",
        //     date:0,
        //     categorieId:0,
        //     username:"",
        //     pictureUrl:""
        //   };
        //   this.selectCategory='CATEGORIES';
        //   this.postToModifyId="";
        //   this.modalAction='create';
        // })  
      }

      dialog.close();
    }
    else{
      console.log("not all field are filled");
    }
  }

  cancelModalAction(dialog:HTMLDialogElement){
    this.bindedPostObject={
      title:"",
      content:"",
      date:0,
      categorieId:0,
      username:"",
      pictureUrl:""
    };
    this.selectCategory='CATEGORIES';
    this.postToModifyId="";
    this.images=[];
    dialog.close();
  }

  modifyPost(postId:any,dialog:HTMLDialogElement){
    this.firebase.getPost(postId).subscribe((post)=>{
      const postData=post.data();
      this.postToModifyId=postId;
      this.bindedPostObject.title=postData.title;
      this.bindedPostObject.content=postData.content;
      this.bindedPostObject.pictureUrl=postData.pictureUrl;
      this.images=[{url:postData.pictureUrl,file:new File([""], "filename")}]
      // console.log(postData.categorieId)
      this.selectCategory=this.categories.filter(category=>category.id===String(postData.categorieId))[0].name.toUpperCase();
      // console.log(this.selectCategory,this.categories,postData)
    })
    this.modalAction='modify'
    dialog.showModal();
  }

  // verifyModification(eagerPost:any,dialog:HTMLDialogElement){
  //   this.firebase.updatePost(eagerPost).subscribe(()=>{
  //     console.log('post updated');
  //     dialog.close();
  //   })

  // }

}
