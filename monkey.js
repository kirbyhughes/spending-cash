// ==UserScript==
// @name        Spending Cash Available
// @namespace   http://89vx.net
// @version     1
// @match https://home.personalcapital.com/*
// @run-at document-idle
// ==/UserScript==

console.log ("Hi there!");
setTimeout( function () {
if(window.location.href.indexOf("page/login/app#/dashboard") > 0) {
        let cashloc = document.querySelectorAll('[data-hj-masked=""].account__group-value.qa-account-group-value.tabular-numbers')[0];
        let cashtext = cashloc.textContent;
        let cardstext = document.querySelectorAll('[data-hj-masked=""].account__group-value.qa-account-group-value.tabular-numbers')[2].textContent;
        cash = parseFloat(cashtext.replace(/[^\d.-]/g, ''));
        cardstext = cardstext.replace('-', '');
        cards = parseFloat(cardstext.replace(/[^\d.-]/g, ''));
        const result = cash - cards;
        const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
        });

        const currentA = document.querySelector(".menu__action.menu__action--referral-gift-box");
        //cashloc.innerHTML = cashtext + "&nbsp &nbsp &nbsp &nbsp" + formatter.format(result);
        cashloc.innerHTML = cashtext + " - " + cardstext + " = " + formatter.format(result);
        currentA.innerHTML = formatter.format(result);
}}, 3000);

