// ==UserScript==
// @name        Spending Cash Available
// @namespace   http://89vx.net
// @version     1
// @match https://home.personalcapital.com/*
// @run-at document-idle
// ==/UserScript==

function printit() {
        let cashloc =   document.querySelectorAll('[data-hj-masked=""].account__group-value.qa-account-group-value.tabular-numbers')[0];
        let cashtext = cashloc.textContent;
        let cardstext = document.querySelectorAll('[data-hj-masked=""].account__group-value.qa-account-group-value.tabular-numbers')[2].textContent;
        cash = parseFloat(cashtext.replace(/[^\d.-]/g, ''));
        cardstext = cardstext.replace('-', '');
        cards = parseFloat(cardstext.replace(/[^\d.-]/g, ''));
        const spend = cash - cards;
        const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
        });
        const assetstext = document.querySelectorAll('.net-worth-bar__value.js-net-worth-bar-value.tabular-numbers')[0].textContent;
        const assets = parseFloat(assetstext.replace(/[^\d.-]/g, ''));
        const liabstext = document.querySelectorAll('.net-worth-bar__value.js-net-worth-bar-value.tabular-numbers')[1].textContent;
        const liabs = parseFloat(liabstext.replace(/[^\d.-]/g, ''));
        const networth = assets - liabs;

        const networthloc = document.querySelector('.sidebar__networth-amount.qa-sidebar_networth_amount.js-sidebar-networth-amount');
        const totalDiv = document.querySelectorAll('.menu__action.menu__action--referral-gift-box')[0];
        const totalDivformat = formatter.format(spend);
        const networthformat = formatter.format(networth);

        titleloc = document.querySelector('.sidebar__networth-link.sidebar__networth-link.qa-sidebar-networth-link');
        titleloc.innerHTML = "NET WORTH / SPEND";

        networthloc.innerHTML = networthformat + " / " + totalDivformat;


}

setTimeout( function () {
if(window.location.href.indexOf("page/login/app#") > 0) {

        printit();
        function mutationCallback(mutationsList, observer) {
        for (const mutation of mutationsList) {
                console.log('infinite loop?');
                if (mutation.type === 'childList') {
                        printit();
                } else if (mutation.type === 'attributes') {
                } else {
                }
        }}
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(mutationCallback);
        // What to observe
        const mutationConfig = { attributes: true, childList: true, subtree: true, characterData: true };
        const commandlineDiv = document.querySelector('.sidebar-accounts.js-accounts-list.expanded');
        observer.observe(commandlineDiv, mutationConfig);
}
}, 3000);
