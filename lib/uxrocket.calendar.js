/**
 * UX Rocket
 * jQueryUI Calendar, UX Rocket plugin wrapper
 * @author Bilal Cinarli
 * @dependency jQueryUI DatePicker
 */

;
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
            onClose          : false
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


    var bindActions = function($el) {
        var $before,
            $after,
            _opts = $el.data(ns.data),
            onClose = _opts.onClose;

        if(_opts.calendarBefore != undefined) {
            $before = $(_opts.calendarBefore);

            _opts.onClose = function(selectedDate) {
                $before.datepicker("option", "maxDate", selectedDate);
                if(typeof onClose == 'function') {
                    onClose();
                }
            }
        }


        if(_opts.limitedDate) {
            _opts.beforeShowDay = function(date) {
                var day = date.getDay();
                return [(day != 1 && day != 3 && day != 5 && day != 6 && day != 7 && day != 0)];
            }
        }

        if(_opts.calendarAfter != undefined) {
            $after = $(_opts.calendarAfter);

            _opts.onClose = function(selectedDate) {
                $after.datepicker("option", "minDate", selectedDate);
                $after.datepicker('show');
                if(typeof onClose == 'function') {
                    onClose();
                }
            }
        }

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

    // version
    ux.version = "0.8.1";

    // settings
    ux.settings = defaults;
})(jQuery);