import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';
  

const enterTransition = transition(':enter', [
    style({
        opacity: 0,
        transform: `translate(0px, -250px)`,
    }),
    animate('0.75s ease-in', style({
        opacity:1,
        transform: 'translate(0px, 0px)',
    }))
])

const leaveTransition = transition(':leave', [
    style({
        opacity: 1,
    }),
    animate('0.75s ease-in', style({
        opacity:0
    }))
])

const fadeIn = trigger('fadeIn', [enterTransition])
const fadeOut = trigger('fadeOut', [leaveTransition])

export {
    fadeIn, fadeOut
}
