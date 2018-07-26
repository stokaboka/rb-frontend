/**
 * Created by stokaboka on 03.02.2017.
 */

/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

let $RbBuilderInfo = function( options ){
	const self = this;

	self.minX = 0;
	self.minY = 130;

	self._zIndex = 0;
	self._x = 0;
	self._y = 0;

	Object.defineProperties(this, {
		/**
		 * координаты отображения окна дизайнера на рабочем столе
		 * @type {number}
		 */
		x: {
			get: function () {
				return this._x;
			},
			set: function ( val ) {
				this._x = val < self.minX ? self.minX : val;
				this.style = Object.assign( {}, this.style, { "left":  val+"px"} );
			}
		},
		y: {
			get: function () {
				return this._y;
			},
			set: function ( val ) {
				this._y = val < self.minY ? self.minY : val;
				this.style = Object.assign( {}, this.style, { "top":  val+"px"} );
			}
		},
		zIndex: {
			get: function () {
				return this._zIndex;
			},
			set: function ( val ) {
				this._zIndex = val;
				this.style = Object.assign( {}, this.style, { "z-index":  val} );
			}
		}
	});

	/**
	 * ститль отображения окна
	 * @type {{top: string, left: string}}
	 */
	self.style = {};


	Object.assign(
		self,
		{
			/**
			 * включен в модель
			 * @type {boolean}
			 */
			included: false,

			/**
			 * развернуто или свернуто окно
			 * @type {boolean}
			 */
			expanded: true,

			/**
			 * отображать окно свойств элемента на рабочем столе
			 * @type {boolean}
			 */
			display: true,

			/**
			 * опции модального окна редактора свойств
			 * @type {{visible: boolean, changed: boolean, statusIcon: string, onOffIcon: string}}
			 */
			editor: {
				visible: false,
				changed: false,
				statusIcon: '',
				onOffIcon: 'chevron_right'
			},

			relations: {
				source: false,
				target: false
			}

		},
		options
	);
};

export default $RbBuilderInfo;
