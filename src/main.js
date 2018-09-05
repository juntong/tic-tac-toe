import Vue from 'vue';
import VueFire from 'vuefire';
import swal from 'sweetalert2';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App.vue';

import Square from './components/Square.vue';
import router from './router';

Vue.use(VueFire);
Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyB-_reJrMyU-Wx5ZrYAov9AFG3GjCaUUu0',
  authDomain: 'vasit-4ee41.firebaseapp.com',
  databaseURL: 'https://vasit-4ee41.firebaseio.com',
  projectId: 'vasit-4ee41',
  storageBucket: 'vasit-4ee41.appspot.com',
  messagingSenderId: '916618825122',
};

firebase.initializeApp(config);

window.firebase = firebase;
window.db = firebase.firestore();
window.db.settings({ timestampsInSnapshots: true });
window.swal = swal;

Vue.component('Square', Square);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
