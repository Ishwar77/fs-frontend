import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
    constructor(
        private snackbar: MatSnackBar
    ) { }
    public snackbars(message, type) {
        this.snackbar.open(message, "", {
            duration: 3000,
            verticalPosition: "top",
            panelClass: [type],
        });
    }
}