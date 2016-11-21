/**
 * UX Rocket
 * jQueryUI Calendar, UX Rocket plugin wrapper
 * @author Bilal Cinarli
 * @dependency jQueryUI DatePicker
 */

(function($) {
    var ux, // local shorthand

        defaults = {
            showOtherMonths  : true,
            selectOtherMonths: true,
            changeMonth      : true,
            changeYear       : true,
            limitedDate      : false,

            // callbacks
            onReady          : false,
            onSelect         : false,
            onClose          : false,
            onRemove         : false
        },
        events = {
            click: 'click.uxCalendar'
        },
        ns = {
            rocket    : 'uxRocket',
            data      : 'uxCalendar',
            ready     : 'uxitd-calendar-ready',
            rocketWrap: 'uxitd-plugin-wrap',
            wrap      : 'uxitd-calendar-wrap',
            icon      : 'icon-calendar'
        };


    $(function() {
        $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
        $.datepicker._updateDatepicker = function(inst) {
            $.datepicker._updateDatepicker_original(inst);
            var afterShow = this._get(inst, 'afterShow');
            if (afterShow)
                afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
        };
    });

    // constructor method
    var Calendar = function(el, options, selector) {
        var $el = $(el),
            opts = $.extend({}, defaults, options, $el.data(), {'selector': selector});

        $el.data(ns.data, opts);

        setLayout($el);

        callback(opts.onReady);

        bindActions($el);
    };

    var setLayout = function($el) {
        var columns = '',
            _opts = $el.data(ns.data);

        columns = ' ' + $el.context.className.replace(ns.ready, '');

        if(_opts.selector.charAt(0) == '.') {
            columns = columns.replace(' ' + _opts.selector.substr(1), '');
        }

        if($el.parent().is('.' + ns.rocketWrap)) {
            $el.parent().addClass(ns.wrap + columns + ' group');
        }
        else {
            $el.wrap('<span class="' + ns.rocketWrap + ' ' + ns.wrap + columns + ' group"></span>');
        }

        $el.after('<i class="' + ns.icon + '"></i>');
    };

    var disableSelectValues = function($valueArray, margin) {
        $valueArray.each(function() {
            if(this.value > margin) {
                this.disabled = true;
            }
        });
    };


    var bindActions = function($el) {
        var $before,
            $after,
            _opts = $el.data(ns.data),
            onClose = _opts.onClose;

        if(_opts.calendarBefore !== undefined) {
            $before = $(_opts.calendarBefore);

            _opts.onClose = function(selectedDate) {
                $before.datepicker("option", "maxDate", selectedDate);
                if(typeof onClose == 'function') {
                    onClose();
                }
            };
        }


        if(_opts.limitedDate) {
            _opts.beforeShowDay = function(date) {
                var day = date.getDay();
                return [(day != 1 && day != 3 && day != 5 && day != 6 && day != 7 && day != 0)];
            };
        }

        if(_opts.calendarAfter !== undefined) {
            $after = $(_opts.calendarAfter);

            _opts.onClose = function(selectedDate) {
                $after.datepicker("option", "minDate", selectedDate);
                $after.focus(1);
                if(typeof onClose == 'function') {
                    onClose();
                }
            };
        }

        _opts.afterShow = function() {
            var _opts       = $el.data(ns.data),
                date        = new Date(),
                $datePicker = $('#ui-datepicker-div'),
                selectedDay = $datePicker.find('.ui-datepicker-current-day a');

            if(_opts && _opts.timeLimit && selectedDay && selectedDay.html() == date.getDate()) {
                disableSelectValues($datePicker.find(".ui_tpicker_hour_slider option"), date.getHours());
                disableSelectValues($datePicker.find(".ui_tpicker_minute_slider option"), date.getMinutes());
            }
        };

        _opts.beforeShow = function() {
            if($el.attr('readonly') || $el.attr('disabled')) {
                return false;
            }
            var _opts = $el.data(ns.data),
                date  = new Date();

            $el.datetimepicker('setDate', date);
        };

        $el.next('.' + ns.icon).on(events.click, function() {
            $el.focus();
        });

        if(_opts.time == true) {
            $el.datetimepicker(_opts);
        } else if(_opts.timeOnly) {
            $el.timepicker(_opts);
        } else {
            $el.datepicker(_opts, $.datepicker.regional['tr']);
        }
    };

    // global callback
    var callback = function(fn) {
        // if callback string is function call it directly
        if(typeof fn === 'function') {
            fn.apply(this);
        }

        // if callback defined via data-attribute, call it via new Function
        else {
            if(fn !== false) {
                return new Function('return ' + fn);
            }
        }
    };

    // jquery bindings
    ux = $.fn.calendar = $.uxcalendar = function(options) {
        var selector = this.selector;

        return this.each(function() {
            var $el = $(this),
                uxrocket = $el.data(ns.rocket) || {},
                calendar;

            if($el.hasClass(ns.ready) || $el.hasClass(ns.rocketWrap)) {
                return;
            }

            $el.addClass(ns.ready);

            uxrocket[ns.data] = {'hasWrapper': true, 'wrapper': ns.wrap, 'ready': ns.ready, 'selector': selector, 'options': options};

            $el.data(ns.rocket, uxrocket);

            calendar = new Calendar(this, options, selector);
        });
    };

    ux.remove = function(el) {
        var $el = el !== undefined ? $(el) : $("." + ns.ready);

        $el.filter('input').each(function() {
            var _this = $(this),
                _instance = _this.data(ns.data),
                _uxrocket = _this.data(ns.rocket);

            // remove ready class
            _this.removeClass(ns.ready);

            // remove plugin events
            _this.off(events.click);

            // remove icon and wrapper
            _this.next('.' + ns.icon).remove();

            if(_uxrocket[ns.data].hasWrapper) {
                if(Object.keys && Object.keys(_uxrocket).length == 1) {
                    _this.unwrap();
                }

                else {
                    _this.parent().removeClass(ns.wrap);
                }
            }

            // remove plugin data
            _this.removeData(ns.data);

            // remove uxRocket registry
            delete _uxrocket[ns.data];
            _this.data(ns.rocket, _uxrocket);

            // remove jQueryUI
            _this.datepicker('destroy');

            callback(_instance.onRemove);
        });
    };

    // version
    ux.version = "0.10.0";

    // settings
    ux.settings = defaults;
})(jQuery);