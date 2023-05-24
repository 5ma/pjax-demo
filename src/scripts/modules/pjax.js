import barba from '@barba/core';
import { ENTER, LEAVE } from '../';

const body = document.body;
const container = document.querySelector('.l-container');
let PAGE = document.querySelector('[data-barba="container"]').getAttribute('data-barba-namespace');

const ChangePage = (area) => {
  PAGE = area;
  container.setAttribute('data-page', area);
};

const JS = {
  set(page) {
    if(ENTER[page] !== undefined) ENTER[page]();
  },
  reset(page) {
    if(LEAVE[page] !== undefined) LEAVE[page]();
  }
};

export const Pjax = {
  set() {
    barba.init({
      debug: true,
      timeout: 1000 * 6,
      preventRunning: true, // トランジション実行中にリンクを押しても強制再読み込みさせない
      prevent: ({
        href,
        el,
      }) => {
        return href === location.pathname
          || !el.classList.contains('link-pjax')
          || el.classList.contains('no-pjax')
          || el.classList.contains('no-barba');
      },
      transitions: [
        {
          name: 'transition',
          sync: false,
          before() {
            body.classList.add('pjax-leave');
          },
          enter(data) {
            console.log('pjax enter');
            ChangePage(data.next.namespace);
          },
          leave(data) {
            console.log('pjax leave');
            JS.reset(data.current.namespace);

            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 600);
            });
          },
          afterEnter(data) {
            console.log('afterenter');
            body.classList.remove('pjax-leave');

            if (typeof dataLayer !== 'undefined') {
              dataLayer.push({
                'newPageUrl': location.pathname + location.search,
                event: 'pageLoaded',
              });
            }
          }
        },
      ],
    });
  }
};
