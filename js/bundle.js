/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  //<--------tabs-------->
  var tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(function (item) {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(function (item) {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach(function (item, i) {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); //<--------timer-------->

  var deadline = '2022-10-05';

  function getTimeRemaining(endtime) {
    var now = new Date();
    var t = Date.parse(endtime) - Date.parse(now),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24) + now.getTimezoneOffset() / 60,
        minutes = Math.floor(t / 1000 / 60 % 60),
        seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      var t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); // <------Modal------>

  var modalTriggers = document.querySelectorAll('[data-modal]'),
      modalCloseBtn = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal');

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  ;

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  ;
  modalTriggers.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  var showModalByScroll = function showModalByScroll() {
    if (window.pageYOffset + (document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight) {
      openModal();
    }

    window.removeEventListener('scroll', showModalByScroll);
  };

  var modalTimerId = setTimeout(openModal, 3000);
  window.addEventListener('scroll', showModalByScroll); // <--------классы для карточек------->

  var MenuCard = /*#__PURE__*/function () {
    function MenuCard(src, alt, title, descr, price, parentSelector) {
      _classCallCheck(this, MenuCard);

      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.transfer = 27;
      this.changeToUAH();
    }

    _createClass(MenuCard, [{
      key: "changeToUAH",
      value: function changeToUAH() {
        this.price = this.price * this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var element = document.createElement('div');

        if (this.classes.length === 0) {
          this.classes = "menu__item";
          element.classList.add(this.classes);
        } else {
          this.classes.forEach(function (className) {
            return element.classList.add(className);
          });
        }

        ;
        element.innerHTML = "\n            <img src=".concat(this.src, " alt=").concat(this.alt, ">\n            <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n            <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n            <div class=\"menu__item-divider\"></div>\n            <div class=\"menu__item-price\">\n                <div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>\n                <div class=\"menu__item-total\"><span>").concat(this.price, "</span> \u0433\u0440\u043D/\u0434\u0435\u043D\u044C</div>\n            </div>\n         ");
        this.parent.append(element);
      }
    }]);

    return MenuCard;
  }();

  var r = new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, '.menu .container').render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 18, '.menu .container', 'menu__item').render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 19, '.menu .container', 'menu__item').render(); //Forms

  var forms = document.querySelectorAll('form');
  var message = {
    loading: 'Загрузка',
    success: 'Спасибо, мы скоро свяжемся с вами',
    failure: 'что-то пошло не так'
  };
  forms.forEach(function (item) {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      var request = new XMLHttpRequest();
      request.open('POST', 'server.php'); //  request.setRequestHeader('Content-type', 'multipart/form-data');

      var formData = new FormData(form); // всегда проверйте формы н а наличие атрибута name

      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      request.send(json);
      request.addEventListener('load', function () {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(function () {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map