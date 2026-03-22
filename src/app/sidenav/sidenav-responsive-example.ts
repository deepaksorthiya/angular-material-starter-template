import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

import { Component, DOCUMENT, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'sidenav-responsive-example.html',
  styleUrls: ['sidenav-responsive-example.css'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
})
export class SidenavResponsiveExample implements OnDestroy {
  fillerNav = Array.from({ length: 50 }, (_, i) => `Navigation Item - ${i + 1}`);
  fillerContent = Array.from(
    { length: 50 },
    (_, i) =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.` + i,
  );

  private breakpointObserver = inject(BreakpointObserver);

  // Observe if the screen size matches that of a handset (mobile device) not using in code
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  isDarkMode = signal<boolean>(false);
  // Observe color scheme of system and update the isDarkMode signal accordingly
  $themeObserver = this.breakpointObserver
    .observe('(prefers-color-scheme: dark)')
    .subscribe((result) => {
      console.log('prefers-color-scheme: dark matches :', result.matches);
      this.isDarkMode.set(result.matches);
    });

  private document = inject(DOCUMENT);
  private htmlElement = this.document.querySelector('html')!;

  toolbarColor: ThemePalette;

  onThemeChange() {
    this.htmlElement.classList.toggle('theme-dark');
    this.isDarkMode.update((isDark) => !isDark);
  }

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isDarkMode.set(media.matchMedia('(prefers-color-scheme: dark)').matches);
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    console.log('isHandset :', this.isHandset$);
    // An effect runs automatically whenever the signal changes
    effect(() => {
      if (this.isDarkMode()) {
        this.htmlElement.classList.add('theme-dark');
        this.toolbarColor = undefined;
      } else {
        this.htmlElement.classList.remove('theme-dark');
        this.toolbarColor = 'primary';
      }
    });
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.$themeObserver.unsubscribe();
  }
}

/**  Copyright 2026 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
