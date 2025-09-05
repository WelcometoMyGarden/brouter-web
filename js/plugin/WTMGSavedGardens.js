BR.WTMGSavedGardens = L.Control.extend({
    initialize(map, layersControl, options) {
        L.setOptions(this, options);
        this._gardenMarkersLayer = L.featureGroup();
        this._gardenMarkersLayer.id = 'saved-gardens';
        this._layersControl = layersControl;
        this._layersControl.addOverlay(this._gardenMarkersLayer, i18next.t('sidebar.layers.saved-gardens'));
    },
    _wtmgListener(e) {
        if (!window.wtmg) {
            console.debug('WTMG data not loaded yet');
        }
        if (!window.wtmg.member) {
            console.warn('Not loading saved gardens, not a member');
            return;
        }
        const { gardens, savedGardens } = window.wtmg;
        this._gardenMarkersLayer.clearLayers();
        for (const g of gardens) {
            if (savedGardens.includes(g.id)) {
                this._gardenMarkersLayer.addLayer(
                    L.marker([g.location.latitude, g.location.longitude], {
                        icon: new BR.WTMGIcon('tent-yellow'),
                    }).bindPopup(BR.WTMGShared.createGardenPopup(g))
                );
            }
        }
    },
    // onRemove(map) is optional for cleanup
    onAdd(map) {
        // see https://leafletjs.com/reference.html#evented
        map.on(
            'overlayadd',
            function (evt) {
                console.log(evt);
                if (evt.layer === this._gardenMarkersLayer) {
                    map.on('wtmg:data', this._wtmgListener, this);
                    if (window.wtmg) {
                        this._wtmgListener(window.wtmg);
                    }
                }
            },
            this
        );
        map.on(
            'overlayremove',
            function (evt) {
                if (evt.layer === this._gardenMarkersLayer) {
                    map.off('wtmg:data', this._wtmgListener, this);
                    this._gardenMarkersLayer.clearLayers();
                }
            },
            this
        );

        return new L.DomUtil.create('div');
    },
});
