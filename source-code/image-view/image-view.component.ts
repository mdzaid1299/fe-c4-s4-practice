import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  image: any;
  constructor(private imageService: ImageService) { 
  }

  ngOnInit(): void {
    // code to read value of route parameter `id` and use it to fetch the corresponding image
  }

  delete() {
    this.imageService.deleteImage(this.image.id).subscribe(data=>{
      // code to navigate to home
    });
  }

}
