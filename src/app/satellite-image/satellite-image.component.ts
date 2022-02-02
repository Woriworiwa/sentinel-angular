import { Component, OnInit } from '@angular/core';
import { WmsLayer, BBox, CRS_EPSG4326, MimeTypes, ApiType, } from '@sentinel-hub/sentinelhub-js';
import { DomSanitizer } from '@angular/platform-browser';
import { Layer } from '../models/layer';

@Component({
  selector: 'app-satellite-image',
  templateUrl: './satellite-image.component.html',
  styleUrls: ['./satellite-image.component.scss']
})

export class SatelliteImageComponent implements OnInit {
  imageUrl: string = '';   
  layersArray: Layer[] = [
    {id: 'TRUECOLOR', name: 'True color'},
    {id: 'NDVI', name: 'NDVI'},
    {id: 'FALSECOLOR', name: 'False color'},
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageUrl = this.getUrl(this.layersArray[0]);    
  }  

  handleChange(layer: Layer){
    this.imageUrl = this.getUrl(layer)
  }  

  getUrl(layer: Layer){
    const wmslayer = this.createWmsLayer(layer.id);

    const bbox = new BBox(CRS_EPSG4326, 14.95, 37.7, 15.05, 37.8);
    const getMapParams = {
      bbox: bbox,
      fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
      toTime: new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59)),
      width: 512,
      height: 512,
      format: MimeTypes.JPEG,
    };

    return wmslayer.getMapUrl(getMapParams, ApiType.WMS);
  }

  createWmsLayer(layerId: string): WmsLayer{
    return new WmsLayer({
      baseUrl: 'https://services.sentinel-hub.com/ogc/wms/8fabe20c-9448-4608-b7f7-57ee3bdc785b',
      layerId: layerId,
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
