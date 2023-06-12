import { Component, Output,Input,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus,faTimes,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../data-types/category';
import { Post } from '../data-types/post';
import { FirebaseService } from '../services/firebase-service/firebase.service';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';


@Component({
  selector: 'app-home-filters',
  templateUrl: './home-filters.component.html',
  styleUrls: ['./home-filters.component.css']
})
export class HomeFiltersComponent {
  faCard = faCaretDown;
  faPlus = faPlus;
  faTimes = faTimes;
  faTrash = faTrash;

  post:Post={id:null,userId:0,date:0,title:"",content:"",picturesId:[],categorieId:0};
  images:{url:any,file:File}[]=[];
  
  @Input() categories:Category[]=[];
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
  @ViewChild('imgInput', { static: true }) imgInput!: ElementRef<HTMLInputElement>;

  getFile(){
    const fileInput = this.imgInput.nativeElement;
    return fileInput.files||new FileList();
  }

  loggedInUser!:any;
  newPost:{title:string,content:string,date:number,categorieId:number,username:string,pictureUrl:string}={
    title:"",
    content:"",
    date:0,
    categorieId:0,
    username:"",
    pictureUrl:""
  };
  selectCategory!:any;

  constructor(private firebase:FirebaseService,private cloudinary:CloudinaryService){}
  ngOnInit(){
   this.loggedInUser=this.firebase.user;
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

  createNewPost(dialog:HTMLDialogElement){
    console.log("createNewPost");

    
    if(this.selectCategory && this.selectCategory.toLowerCase()!=="categories" && this.newPost.content.length && this.newPost.title.length){
      this.newPost.categorieId=this.categories.filter(category=>category['name'].toLowerCase()===this.selectCategory.toLowerCase() )[0].id;
      this.newPost.date=Date.now();
      this.newPost.username=this.loggedInUser.username;
      if( this.getFile().length>0){
        this.cloudinary.uploadAsyncPhoto(this.getFile()).subscribe(
          (data)=> {

            this.newPost.pictureUrl=data.url;
            // console.log(this.newPost);
            this.firebase.addPost(this.newPost).subscribe(()=>{
                console.log('create new post');
                this.newPost={
                  title:"",
                  content:"",
                  date:0,
                  categorieId:0,
                  username:"",
                  pictureUrl:""
                };
                this.images=[];
                dialog.close();
          }
        )})
       
      }else{
        this.firebase.addPost(this.newPost).subscribe(()=>{
          console.log('create new post');
          this.newPost={
            title:"",
            content:"",
            date:0,
            categorieId:0,
            username:"",
            pictureUrl:""
          };
          dialog.close();
        })
      }
      
    }else{
      console.log("not all field are filled");
    }

  }
  cancelCreateNewPost(dialog:HTMLDialogElement){
    this.newPost={
      title:"",
      content:"",
      date:0,
      categorieId:0,
      username:"",
      pictureUrl:""
    };
    dialog.close();
  }

}
