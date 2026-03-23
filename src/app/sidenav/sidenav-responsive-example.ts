import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Component, DOCUMENT, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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

  // Observe if the screen size matches that of a handset (mobile device)
  // for more info on breakpoints https://material.angular.io/cdk/layout/overview
  protected readonly isMobile = signal(true);
  handsetObserver$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    )
    .subscribe((isMobile) => {
      console.log('isMobile :', isMobile);
      this.isMobile.set(isMobile);
    });

  private readonly THEME_KEY = 'theme';
  protected readonly isDarkMode = signal<boolean>(false);
  // Observe color scheme of system and update the isDarkMode signal accordingly
  $themeObserver = this.breakpointObserver
    .observe('(prefers-color-scheme: dark)')
    .subscribe((result) => {
      console.log('(prefers-color-scheme: dark) :', result.matches);
      // get user prefer theme if already set
      const theme = this.getInitialTheme();
      if (theme === 'system') {
        // if no theme set use system specific
        this.isDarkMode.set(result.matches);
      }
    });

  private document = inject(DOCUMENT);
  private htmlElement = this.document.documentElement;

  toolbarColor: ThemePalette;

  onThemeChange() {
    this.isDarkMode.update((isDark) => !isDark);
    if (this.isDarkMode()) {
      localStorage.setItem(this.THEME_KEY, 'dark');
    } else {
      localStorage.setItem(this.THEME_KEY, 'light');
    }
  }

  private getInitialTheme() {
    const theme = localStorage.getItem(this.THEME_KEY);
    if (theme) {
      return theme;
    }
    return 'system';
  }

  constructor() {
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
    this.$themeObserver.unsubscribe();
    this.handsetObserver$.unsubscribe();
  }
}
