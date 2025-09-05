// Static methods
BR.WTMGShared = {
    createGardenPopup({ description, id }) {
        const htmlContent = document.createElement('div');
        htmlContent.innerHTML = `
                                <div id="description"></div>
                                <a href="${BR.conf.wtmgHost}/explore/garden/${id}" target="_blank">
                                    ${i18next.t('layers.wtmg.view-garden')}
                                </a>`;
        const descriptionContainer = htmlContent.children[0];
        descriptionContainer.innerText = description;
        return htmlContent;
    },
};
