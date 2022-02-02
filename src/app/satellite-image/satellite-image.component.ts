import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../models/layer';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SentinelService } from '../services/sentinel.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-satellite-image',
  templateUrl: './satellite-image.component.html',
  styleUrls: ['./satellite-image.component.scss']
})

export class SatelliteImageComponent implements OnInit {
  imageUrl: string = '';

  startDate: Date = new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0));
  endDate: Date = new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59));

  availableLayers: Layer[] = [
    { id: 'TRUECOLOR', name: 'True color' },
    { id: 'NDVI', name: 'NDVI' },
    { id: 'FALSECOLOR', name: 'False color' },
  ];

  selectedLayer: Layer = this.availableLayers[0];

  constructor(private sanitizer: DomSanitizer, private sentinelService: SentinelService) { }

  ngOnInit(): void {
    this.fetchImage();
  }

  fetchImage() {
    this.imageUrl = this.sentinelService.fetchImage(this.selectedLayer, this.startDate, this.endDate);
  }

  layerChange(event: MatButtonToggleChange) {
    this.selectedLayer = event.value as Layer;
    this.fetchImage();
  }

  startChange(event: MatDatepickerInputEvent<Date>) {    
    this.startDate = <Date>event.value;
    this.fetchImage();
  }

  endChange(event: MatDatepickerInputEvent<Date>) {    
    this.endDate = <Date>event.value;
    this.fetchImage();
  }

  // Removes the unsafe: prefix from the URL
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
