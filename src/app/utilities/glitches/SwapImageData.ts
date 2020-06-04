import { SwapMutation } from "src/app/models";

export class SwapImageData {
  constructor() {}

  static seed(imageData: string, maxSwapLength: number): SwapMutation {
    const swapLength = Math.floor(Math.random() * maxSwapLength) || 1;
    const aIndex = Math.floor((Math.random() * imageData.length) / 2);
    const bIndex =
      Math.floor((Math.random() * imageData.length) / 2) + imageData.length;
    return {
      aIndex,
      bIndex,
      swapLength,
    };
  }

  static exec(imageData: string, { aIndex, bIndex, swapLength }: SwapMutation) {
    const head = imageData.slice(0, aIndex);
    const a = imageData.slice(aIndex, aIndex + swapLength);
    const middle = imageData.slice(aIndex + swapLength, bIndex);
    const b = imageData.slice(bIndex, bIndex + swapLength);
    const tail = imageData.slice(bIndex + swapLength);
    return `${head}${b}${middle}${a}${tail}`;
  }
}
