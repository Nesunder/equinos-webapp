import { ChangeDetectorRef, Component, inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ImageUploadComponent } from '../components/image-upload/image-upload.component';
import { ImageGridComponent } from '../components/image-grid/image-grid.component';
import { HeaderComponent } from "../components/header/header.component";
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { FooterComponent } from "../components/footer/footer.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AnalysisComponent } from "../components/analysis/analysis.component";
import { HorseGridComponent } from "../components/horse-grid/horse-grid.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, SidebarComponent, ImageUploadComponent,
    ImageGridComponent, HeaderComponent, MatToolbar, MatIcon, FooterComponent,
    MatButtonModule, MatIconModule, MatDividerModule, AnalysisComponent, HorseGridComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('menubutton') menubutton!: ElementRef;

  opened: boolean = true;
  mobileQuery: MediaQueryList;
  navigationWindow: string = 'imageGrid';

  private _mobileQueryListener: () => void;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 933px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  checkScreenSize() {
    this.opened = window.innerWidth < 933 ? false : true;
  }

  setNavigationWindow(event: string) {
    this.navigationWindow = event
  }
}
