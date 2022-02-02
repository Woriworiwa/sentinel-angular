import { Component } from '@angular/core';
import { WmsLayer, BBox, CRS_EPSG4326, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sentinel-angular';
  imageUrl: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getMapParams();    
  }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getMapParams(){
    const layer = new WmsLayer({
      baseUrl: 'https://services.sentinel-hub.com/ogc/wms/8fabe20c-9448-4608-b7f7-57ee3bdc785b',
      layerId: 'TRUECOLOR',
    });

    const bbox = new BBox(CRS_EPSG4326, 14.95, 37.7, 15.05, 37.8);
    const getMapParams = {
      bbox: bbox,
      fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
      toTime: new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59)),
      width: 512,
      height: 512,
      format: MimeTypes.JPEG,
    };

    this.imageUrl = layer.getMapUrl(getMapParams, ApiType.WMS);
  }
}
