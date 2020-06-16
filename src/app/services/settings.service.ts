import { Injectable } from "@angular/core";
import { Mutations, Settings, ModifiedImage, OriginalImage } from "../models";
import { EncodingService } from "./encoding.service";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  originalImage: string;
  originalImages: Array<OriginalImage>;
  epoch = 0;
  generationSize = 6;
  generatedImages: Array<ModifiedImage> = [];

  mutations = {
    [Mutations.FindAndReplace.id]: {
      maxReplaceLength: 6,
    },
    [Mutations.SwapImageData.id]: {
      maxSwapLength: 6,
    },
  };

  constructor(private encoding: EncodingService) {
    this.load();
  }

  load() {
    const settings = localStorage.getItem("settings");
    if (settings) {
      const {
        originalImages = [],
        generationSize,
        generatedImages,
        epoch,
        mimeType,
        dataHeader,
      }: Settings = JSON.parse(settings);
      this.originalImages = originalImages;
      this.generationSize = generationSize;
      this.generatedImages = generatedImages;
      this.encoding.mimeType = mimeType;
      this.encoding.dataHeader = dataHeader;
      this.epoch = epoch;
    }
  }

  save() {
    const settings: Settings = {
      originalImages: this.originalImages,
      generationSize: this.generationSize,
      generatedImages: this.generatedImages,
      dataHeader: this.encoding.dataHeader,
      mimeType: this.encoding.mimeType,
      epoch: this.epoch,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
  }
}
