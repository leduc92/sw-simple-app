require('./bootstrap');
import Vue from 'vue';

import App from './App.vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import { routes } from './routes';

import VueShopwareAdminStandalone from 'shopware-admin-vue-standalone';
import 'shopware-admin-vue-standalone/dist/shopware-admin-vue-standalone.css';

import adminDe from 'shopware-admin-vue-standalone/dist/snippet/de-DE.json';
import adminEn from 'shopware-admin-vue-standalone/dist/snippet/en-GB.json';

import boostDayDe from './snippet/de-DE.json';
import boostDayEn from './snippet/en-GB.json';

Vue.use(VueShopwareAdminStandalone);

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueAxios, axios);

const i18n = new VueI18n({
    locale: 'en-GB',
    fallbackLocale: 'en-GB',
    messages: {
        'de-DE': {...adminDe, ...boostDayDe },
        'en-GB': {...adminEn, ...boostDayEn }
    }
});

i18n.locale = document.documentElement.lang;

Vue.use(VueShopwareAdminStandalone, {
    translate: {
        t: (key, values) => i18n.t(key, values),
        tc: (key, choice, values) => i18n.tc(key, choice, values),
        te: (key, locale) => i18n.te(key, locale),
    }
});

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue({
    el: '#app',
    i18n,
    router: router,
    render: h => h(App),
});
