window.onload = function() {
    'use strict';

    const title = document.querySelector('.title');

    const elems = {
        days: document.querySelector('.days'),
        hours: document.querySelector('.hours'),
        minutes: document.querySelector('.minutes'),
        seconds: document.querySelector('.seconds')
    };

    const labels = {
        days: 'jours',
        hours: 'heures',
        minutes:'minutes',
        seconds:'secondes'
    };

    const targetYear = 2024;

    function remainingTime(targetDate, getOgj)
    {
        if (targetDate.year === undefined)
            return;
        if (targetDate.month === undefined)
            targetDate.month = 0;
        if (targetDate.day === undefined)
            targetDate.day = 1;

        let targetTime = new Date(targetDate.year, targetDate.month, targetDate.day);
        let diff = targetTime.getTime() - Date.now();

        if (! getOgj)
            return diff;

        getOgj = {}

        getOgj.days = Math.floor(diff / 1000 / 86400);
        getOgj.hours = Math.floor((diff / 1000 - getOgj.days * 86400) / 3600);
        getOgj.minutes = Math.floor((diff / 1000 - getOgj.days * 86400
            - getOgj.hours * 3600) / 60);
        getOgj.seconds = Math.floor((diff / 1000 - getOgj.days * 86400
            - getOgj.hours * 3600 - getOgj.minutes * 60));

        return getOgj;
    }

    function insertRemaining()
    {
        let remaining = remainingTime({year : targetYear}, true);

        elems.days.innerHTML = remaining.days;
        elems.hours.innerHTML = remaining.hours;
        elems.minutes.innerHTML = remaining.minutes;
        elems.seconds.innerHTML = remaining.seconds;

        for (const key in elems)
           document.querySelector('.label-' + key).innerHTML = labels[key];
    }

    title.innerHTML = 'On sera en ' + targetYear + ' dans';
    insertRemaining();
    setInterval(insertRemaining, 1000);
};
