L.Control.Button = L.Control.extend({
    options: {
        position: 'bottomright',
        icon: 'fa fa-bullhorn', // any FA4 icon class
        text: 'Feedback',
        title: 'Share your feedback',
        className: '', // extra button classes
        onClick: null,
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
        const wrap = document.createElement('div');
        wrap.className = 'leaflet-control leaflet-bar';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `leaflet-bar-part leaflet-button-control ${this.options.className}`.trim();
        btn.setAttribute('aria-label', this.options.title || this.options.text);
        btn.title = this.options.title || this.options.text;

        // Add FA icon
        if (this.options.icon) {
            const icon = document.createElement('i');
            icon.className = this.options.icon;
            btn.appendChild(icon);
        }

        // Add text label
        if (this.options.text) {
            const label = document.createElement('span');
            label.className = 'leaflet-button-label';
            label.textContent = this.options.text;
            btn.appendChild(label);
        }

        wrap.appendChild(btn);

        // Prevent map interactions while clicking
        L.DomEvent.disableClickPropagation(wrap);
        L.DomEvent.on(btn, 'click', (e) => {
            e.preventDefault();
            if (typeof this.options.onClick === 'function') {
                this.options.onClick(map, e);
            }
            //
            // Default behavior
            let formId = i18next.t('feedback-formid');
            if (typeof formId !== 'string') {
                console.error('Failed to get i18n form ID value');
                return;
            }
            console.log('Opening Tally');
            let npsSurveySubmitted = false;
            window.Tally.openPopup(formId, {
                // width: { fr: 570, nl: 550, en: 550 }[coerceToMainLanguage($locale)],
                // this blows up the 1-10 size responsively
                width: 580,
                hideTitle: true,
                // For now!
                // showOnce: true,
                // doNotShowAfterSubmit: true,
                onClose: () => {
                    if (!npsSurveySubmitted) {
                        plausible('close-feedback');
                    }
                },
                // onOpen: () => trackEvent(PlausibleEvent.SHOW_NPS_SURVEY),
                // tracked through class names
                onSubmit: () => {
                    npsSurveySubmitted = true;
                },
            });
        });

        return wrap;
    },

    onRemove: function () {},
});

// Factory
L.control.button = function (opts) {
    return new L.Control.Button(opts);
};
