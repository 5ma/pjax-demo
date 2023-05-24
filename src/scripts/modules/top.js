import { ENTER, LEAVE } from "../";

ENTER.top = () => {
  TOP.init();
};

LEAVE.top = () => {
  TOP.destroy();
};

const TOP = {
  init() {
    console.log('TOP int');
  },
  destroy() {
    console.log('destroy');
  },
};

TOP.init();