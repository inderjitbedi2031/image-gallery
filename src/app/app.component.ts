import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";

export interface ImageObject {
  base64: string | ArrayBuffer;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  imageArray: ImageObject[] = [];
  allowedFileType: string = 'image/';
  imageObject: ImageObject = { base64: '' };
  selectedIndex: number;

  constructor() { }

  ngOnInit(): void {
    of(1, 2, 3, 4, 5, 6).subscribe(number => {
      this.imageArray.push({ ...this.imageObject });
    });
  }
  tileChosen(index): void {
    this.selectedIndex = index;
  }
  fileChosen(file: any): void {
    if (file) {
      if (file.type.includes(this.allowedFileType)) {
        this.getImageBase64(file, this.selectedIndex);
      } else {
        alert('Invalid file extention.');
      }
    }
  }
  getImageBase64(file: any, imageIndex: number): void {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageArray.some((image, index) => {
        if (!image.base64) {
          this.imageArray[index].base64 = reader.result;
          return true;
        } else if (index === imageIndex) {
          this.imageArray[index].base64 = reader.result;
          return true;
        }
      });
    };
  }
  removeImage(imageIndex: number): void {
    this.imageArray.some((image, index) => {
      if (index === imageIndex) {
        this.imageArray.splice(index, 1);
        this.imageArray.push({ ...this.imageObject });
        return true;
      }
    });
  }
}
