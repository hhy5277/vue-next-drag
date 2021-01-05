import {WidgetStyle} from "../../store/types";
import {Direct, DotMouseDownInfo, MoveStartInfo} from "./types";
import {getPoint, getRotatedPoint, sin} from "../../utils";

export interface MoveDiff {
  diffX: number;
  diffY: number;
}

function limitMinNum(num: number, limit: number): number {
  return Math.max(num, limit);
}

function stretchN(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize, width, top, left, rotate } = widgetStyle;
  const { center, sPoint, handlePoint } = dotMousedownInfo;
  // console.log('handlePoint', handlePoint, currentPosition);

  // step2：求currentPosition已handlePoint为中心，反向旋转rotate后的坐标
  const rotatedCurrentPosition = getRotatedPoint(currentPosition, handlePoint, -widgetStyle.rotate);
  // console.log('rotatedCurrentPosition', rotatedCurrentPosition);

  // step3: 无旋转拉伸后的handlePoint以原handlePoint为中心，旋转rotate后的坐标
  const rotatedTopMiddlePoint = getRotatedPoint({
    x: handlePoint.x,
    y: rotatedCurrentPosition.y
  }, handlePoint, widgetStyle.rotate);
  // console.log('rotatedTopMiddlePoint', rotatedTopMiddlePoint);

  // 勾股定理
  const newHeight = Math.sqrt(Math.pow(rotatedTopMiddlePoint.x - sPoint.x, 2) + Math.pow(rotatedTopMiddlePoint.y - sPoint.y, 2));
  // console.log('newHeight', newHeight);

  if (newHeight > minSize.height) {
    const newCenter = {
      x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - sPoint.x) / 2,
      y: rotatedTopMiddlePoint.y + (sPoint.y - rotatedTopMiddlePoint.y) / 2
    }
    root.style.height = newHeight + 'px';
    root.style.top = newCenter.y - (newHeight / 2) + 'px';
    root.style.left = newCenter.x - (width / 2) + 'px';
    callback();
  }
}

function stretchE(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width } = widgetStyle;
  const newWidth = limitMinNum(width + diff.diffX, minSize.width);
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    callback();
  }
}


function stretchS(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, height } = widgetStyle;
  const newHeight = limitMinNum(height + diff.diffY, minSize.height);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    callback();
  }
}


function stretchW(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, left } = widgetStyle;
  const newWidth = limitMinNum(width - diff.diffX, minSize.width);
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    root.style.left = (left + diff.diffX) + 'px';
    callback();
  }
}

function stretchNW(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, left, top } = widgetStyle;

  const newHeight = limitMinNum(height - diff.diffY, minSize.height);
  const newWidth = limitMinNum(width - diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    root.style.top = (top + diff.diffY) + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    root.style.left = (left + diff.diffX) + 'px';
  }
  callback();
}

function stretchNE(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, top } = widgetStyle;

  const newHeight = limitMinNum(height - diff.diffY, minSize.height);
  const newWidth = limitMinNum(width + diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    root.style.top = (top + diff.diffY) + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
  }
  callback();
}


function stretchSE(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, top } = widgetStyle;

  const newHeight = limitMinNum(height + diff.diffY, minSize.height);
  const newWidth = limitMinNum(width + diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
  }
  callback();
}



function stretchSW(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, left } = widgetStyle;

  const newHeight = limitMinNum(height + diff.diffY, minSize.height);
  const newWidth = limitMinNum(width - diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    root.style.left = (left + diff.diffX) + 'px';
  }
  callback();
}
// @ts-ignore
export const stretchStrategy: { [key: string]: (dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) => void } = {
  n: stretchN,
  // e: stretchE,
  // s: stretchS,
  // w: stretchW,
  // nw: stretchNW,
  // ne: stretchNE,
  // se: stretchSE,
  // sw: stretchSW
}