import { Component, OnInit } from '@angular/core';
import { WmsLayer, BBox, CRS_EPSG4326, MimeTypes, ApiType, } from '@sentinel-hub/sentinelhub-js';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../models/layer';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
    {id: 'TRUECOLOR', name: 'True color'},
    {id: 'NDVI', name: 'NDVI'},
    {id: 'FALSECOLOR', name: 'False color'},
  ];
  selectedLayer: Layer = this.availableLayers[0];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchImage(this.selectedLayer);    
  }  

  fetchImage(layer: Layer){
    const wmslayer = this.createWmsLayer(layer.id);

    const bbox = new BBox(CRS_EPSG4326, 14.95, 37.7, 15.05, 37.8);
    const getMapParams = {
      bbox: bbox,
      fromTime: this.startDate,
      toTime: this.endDate,
      width: 512,
      height: 512,
      format: MimeTypes.JPEG,
    };

    this.imageUrl = wmslayer.getMapUrl(getMapParams, ApiType.WMS);
  }

  createWmsLayer(layerId: string): WmsLayer{
    return new WmsLayer({
      baseUrl: 'https://services.sentinel-hub.com/ogc/wms/8fabe20c-9448-4608-b7f7-57ee3bdc785b',
      layerId: layerId,
    });
  }

  handleLayerChange(layer: Layer){
    this.selectedLayer = layer;
    this.fetchImage(this.selectedLayer);
  }

  startChange(event: MatDatepickerInputEvent<Date>)
  {
    this.startDate = <Date>event.value;    
    this.fetchImage(this.selectedLayer);
  }

  endChange(event:MatDatepickerInputEvent<Date>)
  {
    this.endDate = <Date>event.value;
    this.fetchImage(this.selectedLayer);
  }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
