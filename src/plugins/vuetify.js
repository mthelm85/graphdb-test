import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#1A237E',
    secondary: '#9FA8DA',
    accent: '#E64A19',
    error: '#f44336',
    warning: '#FFC107',
    info: '#42A5F5',
    success: '#43A047'
  }
})
