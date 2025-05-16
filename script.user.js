// ==UserScript==
// @name        google-meet-user-colors
// @namespace   https://github.com/FelikZ/google-meet-user-colors
// @description Browser userscript to toggle user-names with a color during a call
// @version     1.0
// @author      Alexey Shevchenko
// @match       https://meet.google.com/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    // Named function for the event listener
    function toggleColor(event) {
        const element = event.target;
        element.style.color = element.style.color ? '' : 'green';
    }

    // Function to add listeners to new elements
    function addListenersToNewElements() {
        const elements = document.querySelectorAll('div[jsslot=""] > div > span.notranslate');
        elements.forEach(element => {
            // Check if the element already has the listener
            if (!element.dataset.hasToggleListener) {
                element.addEventListener('click', toggleColor);
                element.dataset.hasToggleListener = 'true'; // Mark as bound
            }
        });
    }

    // Initial run
    addListenersToNewElements();

    // Poll every 1 second for new elements
    setInterval(addListenersToNewElements, 1000);

    // Store the listener for potential removal
    window.toggleColorListener = toggleColor;
})();
