import {Widget} from "./types";

export const elBtn: Widget = {
  component: 'el-button',
  name: '按钮',
  label: '按钮',
  icon: 'el-icon-thumb',
  widgetStyle: {
    minSize: {
      width: 42,
      height: 26
    },
    left: 0,
    top: 0,
    width: 70,
    height: 40,
    rotate: 0,
    opacity: 1
  },
  style: {
    borderRadius: '0px',
    width: '100%',
    height: '100%'
  },
  props: {
    type: 'primary'
  },
  specialPanel: 'button-property',
  animateClass: {
    animate: 'tada',
    speed: 'fast'
  }
}

export const WidgetList: Widget[] = [elBtn];
