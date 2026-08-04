import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full h-[400px] rounded-xl overflow-hidden shadow-inner relative z-0">
      <div #mapContainer class="w-full h-full"></div>
    </div>
  `
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map: L.Map | null = null;

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Coordonnées d'Abidjan par défaut
    this.map = L.map(this.mapContainer.nativeElement).setView([5.359951, -4.008256], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    // Custom marker pour simuler un livreur
    const customIcon = L.divIcon({
      className: 'bg-primary w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white',
      html: '<div style="width:8px; height:8px; background:white; border-radius:50%;"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([5.359951, -4.008256], { icon: customIcon }).addTo(this.map)
      .bindPopup('Livreur: Jean Dupont<br>Statut: En route')
      .openPopup();
      
    L.marker([5.33, -3.98], { icon: customIcon }).addTo(this.map)
      .bindPopup('Livreur: Marc Konan<br>Statut: Disponible');
  }
}
