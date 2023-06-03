import { Component, Output,Input,EventEmitter } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus,faTimes,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../data-types/category';


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
  constructor(){}

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

}
