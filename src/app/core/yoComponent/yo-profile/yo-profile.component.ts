import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'yo-profile',
    templateUrl: './yo-profile.component.html',
    styleUrls: ['./yo-profile.component.scss']
})
export class YoProfileComponent implements OnInit {
    @ViewChild('profileForm') profileForm: NgForm;
    private imgUrl: string = 'assets/images/profile-icon.png';
    private oriUrl: string = '';
    constructor(private _http: Http, private _hc: HttpClient) {}

    ngOnInit() {
        this.setOriImg();
    }

    openFileUpload(): void {
        document.getElementById('profile_file').click();
    }

    imageChange(event: any): void {
        console.log(event);
        const files: Array<File> = event.target.files;
        const isChange: boolean = files.length > 0 ? true : false;
        if (isChange) {
            this.setImgPreview(files);
            // this.imageUpload(files);
        } else {
            this.changeToOriImg();
        }
    }

    // imageUpload(files: Array<File>): void {
    //     const fd: FormData = new FormData();
    //     fd.append('img', files[0], files[0].name);
    //     this._hc
    //         .post('http://localhost:8080/usr/imageInsert', fd, {
    //             reportProgress: true,
    //             observe: 'events'
    //         })
    //         .subscribe(event => {
    //             if (event.type === HttpEventType.UploadProgress) {
    //                 console.log(
    //                     '업로드 이벤트',
    //                     Math.round((event.loaded / event.total) * 100) + '%'
    //                 );
    //             } else if (event.type === HttpEventType.Response) {
    //                 console.log('Response 이벤트', event);
    //             }
    //         });
    // }

    setImgPreview(files: Array<File>): void {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e: any) => {
            this.imgUrl = e.target.result;
        };
    }

    setOriImg(): void {
        this.oriUrl = this.imgUrl;
    }

    changeToOriImg(): void {
        this.imgUrl = this.oriUrl;
    }
}
