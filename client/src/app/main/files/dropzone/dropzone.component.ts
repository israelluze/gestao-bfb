import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  @Output() droppedFiles = new EventEmitter<FileList>();
  isDraggingOver = false;
  constructor() { }

  ngOnInit() {
  }

  onDragOverEvent(event: DragEvent) {
    event.preventDefault();
    console.log('onDragOverEvent');
    this.isDraggingOver = true;
  }
  onDragLeaveEvent(event: DragEvent ) {
    event.preventDefault();
    console.log('onDragLeaveEvent');
    this.isDraggingOver = false;
  }
  onDropEvent(event) {
    event.preventDefault();
    console.log('onDropEvent');
    this.droppedFiles.emit(event.dataTransfer.files);
  }

}
