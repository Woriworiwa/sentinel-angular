import { Injectable } from '@angular/core';
import { WmsLayer, BBox, CRS_EPSG4326, MimeTypes, ApiType, } from '@sentinel-hub/sentinelhub-js';
import { Layer } from '../models/layer';

@Injectable({
  providedIn: 'root'
})
export class SentinelService {
  url: string = 'https://services.sentinel-hub.com/ogc/wms';
  instantId: string = '8fabe20c-9448-4608-b7f7-57ee3bdc785b'
  constructor() { }

  fetchImage(layer: Layer, fromTime: Date, toTime: Date): string{
    const wmslayer = this.createWmsLayer(layer);

    const bbox = new BBox(CRS_EPSG4326, 14.95, 37.7, 15.05, 37.8);
    const getMapParams = {
      bbox: bbox,
      fromTime: fromTime,
      toTime: toTime,
      width: 512,
      height: 512,
      format: MimeTypes.JPEG,
    };

    return wmslayer.getMapUrl(getMapParams, ApiType.WMS);
  }

  createWmsLayer(layer: Layer): WmsLayer{
    return new WmsLayer({
      baseUrl: `${this.url}/${this.instantId}`,
      layerId: layer.id,
    });
  }
}
