import Cockpit from '@/Cockpit';

document.addEventListener('DOMContentLoaded', () => {
  let cockpit = new Cockpit().$mount();
  document.getElementById('app').appendChild(cockpit.$el);
});
