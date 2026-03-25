import { ChangeDetectionStrategy, Component, Directive, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Directive({
  selector: '[appUnderDev]',
  standalone: true,
})
export class UnderDevDirective {
  readonly dialog = inject(MatDialog);

  // Intercepts the click event on whatever element this directive is attached to
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // Prevent the default action (like a form submitting or a link navigating)
    event.preventDefault();
    event.stopPropagation();

    // Trigger your dialog here
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <h2 mat-dialog-title>
      <mat-icon color="warn">engineering</mat-icon>
      Under Development
    </h2>
    <mat-dialog-content
      ><p style="margin-top: 8px;">
        This functionality is currently under development. We are working hard to bring this feature
        to you soon!
      </p></mat-dialog-content
    >
    <mat-dialog-actions>
      <button matButton mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}
