BR.WTMGRadiusSlider = L.Class.extend({
    options: {
        id: '',
        reversed: false,
        orientation: 'horizontal',
        defaultValue: BR.conf.defaultOpacity,
        title: '',
        min: 0.25,
        max: 20,
        step: 0.25,
        callback(opacity) {},
    },

    initialize(options) {
        L.setOptions(this, options);

        var input = (this.input = $('<input id="slider-' + this.options.id + '" type="text"/>'));
        var value = BR.Util.localStorageAvailable() ? localStorage['wtmgRadiusValue'] : null;
        var minValue = this.options.min;

        if (value < minValue) {
            value = minValue;
        }

        // https://github.com/seiyria/bootstrap-slider
        input
            .slider({
                id: this.options.id,
                min: this.options.min,
                max: this.options.max,
                step: this.options.step,
                value,
                orientation: this.options.orientation,
                reversed: this.options.reversed,
                selection: this.options.reversed ? 'before' : 'after', // inverted, serves as track style, see css
                tooltip: 'hide',
            })
            .on('slide slideStop', { self: this }, function (evt) {
                evt.data.self.options.callback(evt.value);
            })
            .on('slideStop', { self: this }, function (evt) {
                if (BR.Util.localStorageAvailable()) {
                    localStorage['wtmgRadiusValue'] = evt.value;
                }
            });

        this.getElement().title = this.options.title;

        this.options.callback(value / 100);

        if (this.options.muteKeyCode) {
            L.DomEvent.addListener(document, 'keydown', this._keydownListener, this);
            L.DomEvent.addListener(document, 'keyup', this._keyupListener, this);
        }
    },

    _keydownListener(e) {
        if (BR.Util.keyboardShortcutsAllowed(e) && e.keyCode === this.options.muteKeyCode) {
            this.options.callback(0);
        }
    },

    _keyupListener(e) {
        if (BR.Util.keyboardShortcutsAllowed(e) && e.keyCode === this.options.muteKeyCode) {
            this.options.callback(this.input.val() / 100);
        }
    },

    getElement() {
        return this.input.slider('getElement');
    },

    setValue(val) {
        this.input.slider('setValue', val);
        if (BR.Util.localStorageAvailable()) {
            localStorage['wtmgRadiusValue'] = val;
        }
    },
});
