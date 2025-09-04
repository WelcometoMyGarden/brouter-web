BR.WTMGIcon = L.Icon.extend({
    options: {
        iconUrl: `${BR.conf.wtmgHost}/images/markers/tent-neutral.png`,
        iconSize: [40, 40],
        // iconUrl: `${BR.conf.wtmgHost}/images/markers/tent-neutral.png`,
        // shadowUrl: `${BR.conf.wtmgHost}/images/markers/tent-neutral.png`,
        // shadowSize: [50, 64],
        // iconAnchor: [22, 94],
        // shadowAnchor: [4, 62],
        // popupAnchor: [-3, -76],
    },
    // https://leafletjs.com/examples/extending/extending-1-classes.html
    initialize(key, options) {
        L.setOptions(this, options);
        if (key) {
            this.options.iconUrl = `${BR.conf.wtmgHost}/images/markers/${key}.png`;
        }
    },
});
