// @ts-ignore
import {BaseStyle, Widget, WidgetStyle} from "../types";
import {Module} from "vuex";
import {RootState} from "../types";
// import {WidgetList} from "../widgets";

export interface EditorState {
  widgets: Widget[];
  activeWidgetId: string;
  canvasRect: DOMRect | null;
}

const editor: Module<EditorState, RootState> = {
  namespaced: true,
  state: {
    widgets: [],
    activeWidgetId: '',
    canvasRect: null
  },
  mutations: {
    setCanvasRect(state, canvasRect: DOMRect) {
      state.canvasRect = canvasRect;
    },
    setActivateWidgetId(state, id: string) {
      state.activeWidgetId = id;
    },
    addWidget(state, widget: Widget) {
      state.widgets.push(widget);
    },
    setLabel(state, newWidget: { id: string; label: string}) {
      const target = state.widgets.find(item => item.id === newWidget.id);
      if (target) {
        target.label = newWidget.label;
      }
    },
    setWidgetStyle(state, newWidget: { id: string; value: WidgetStyle }) {
      const target = state.widgets.find(item => item.id === newWidget.id);
      if (target) {
        target.widgetStyle = { ...target.widgetStyle, ...newWidget.value };
      }
    },
    setWidgetBaseStyle(state, newWidget: { id: string, value: BaseStyle }) {
      const target = state.widgets.find(item => item.id === newWidget.id);
      if (target) {
        target.style = { ...target.style, ...newWidget.value };
      }
    },
    setWidgetProps(state, newWidget: { id: string, props: any }) {
      const target = state.widgets.find(item => item.id === newWidget.id);
      if (target) {
        target.props = { ...target.props, ...newWidget.props };
      }
    }
  }
}

export default editor;
