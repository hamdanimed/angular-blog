import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http:HttpClient) { }

  uploadPhoto(files:FileList){
  let formData =new FormData()
  console.log(files[0]);
  const url = 'https://api.cloudinary.com/v1_1/dhlbxtl5w/raw/upload';
  const preset = 'xxrof7sq';
  formData.append('file',files[0]);
  formData.append('upload_preset', preset); 

  return this.http.post(url, formData);
  }
}
