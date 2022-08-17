import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IModalData {
  name?: string
}

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,@Inject(MAT_DIALOG_DATA) public data: IModalData) { }

  ngOnInit(): void {
  }

  close(confirmed: boolean) {
    this.dialogRef.close(confirmed)
  }
}
