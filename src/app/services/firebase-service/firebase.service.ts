import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData,doc,setDoc,getDoc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user:any={username:"hamdanimed"};

  constructor(private db:Firestore) { }
  getCategories(){
    const aCollection=collection(this.db,'categories');
    // collectionData(aCollection).subscribe((items)=>{
    //   console.log(items)
    // })
    const docRef=collection(this.db,"categories") ;
    return collectionData<any>(aCollection,{idField:'id'});
  }
  getCategory(categorieId:number){
    const aDoc=doc(this.db,'categories',`/${categorieId}`);
    return from(getDoc<any>(aDoc));
  }
  getPosts(){
    const aCollection=collection(this.db,'posts');
    return collectionData<any>(aCollection,{idField:'id'}); 
  }
  getPost(postId:string){
    // const aCollection=collection(this.db,`posts`,`posts/${postId}`);
    const aDoc=doc(this.db,'posts',`/${postId}`);
    return from(getDoc<any>(aDoc));
    // return collectionData(aCollection,{idField:'id'});
  }
  addPost(post:any){
    const aCollection=collection(this.db,'posts');
    return from(addDoc<any>(aCollection,post));
  }
  updatePost(postUpdated:any){
    const aDoc=doc(this.db,'posts',`/${postUpdated.id}`);
    return from(updateDoc(aDoc,postUpdated));
  }
  deletePost(postId:any){
    const aDoc=doc(this.db,'posts',`/${postId}`);
    return from(deleteDoc(aDoc));
  }
  getComments(){
    const aCollection=collection(this.db,'comments');
    return collectionData<any>(aCollection,{idField:'id'});
  }
  addComment(comment:any){
    const aCollection=collection(this.db,'comments');
    return from(addDoc<any>(aCollection,comment));
  }
  deleteComment(commentId:any){
    const aDoc=doc(this.db,'comments',`/${commentId}`);
    return from(deleteDoc(aDoc));
  }
  updateComment(commentUpdated:any){
    const aDoc=doc(this.db,'comments',`/${commentUpdated.id}`);
    return from(updateDoc(aDoc,commentUpdated));
  }
  getLikes(){
    const aCollection=collection(this.db,'likes');
    return collectionData<any>(aCollection,{idField:'id'})
  }
  addLike(like:any){
    const aCollection=collection(this.db,'likes');
    return from(addDoc<any>(aCollection,like));
  }
  deleteLike(likeId:any){
    const aDoc=doc(this.db,'likes',`/${likeId}`);
    return from(deleteDoc(aDoc));
  }
  getFollowers(){
    const aCollection=collection(this.db,'followers');
    return collectionData<any>(aCollection,{idField:'id'});
  }
  addFollow(follow:any){
    const aCollection=collection(this.db,'followers');
    return from(addDoc<any>(aCollection,follow));
  }
  deleteFollow(followId:any){
    const aDoc=doc(this.db,'followers',`/${followId}`);
    return from(deleteDoc(aDoc));
  }
}
