<template lang="html">
  <v-flex xs12>
    <v-tabs
      v-model="active"
      color="primary"
      dark
      slider-color="yellow">
      <v-tab
        v-for="tab in tabs"
        :key="tab.index"
        ripple>
        {{ tab.title }}
      </v-tab>
      <v-tab-item
        v-for="tab in tabs"
        :key="tab.index">
        <component :is="tab.component"></component>
      </v-tab-item>
    </v-tabs>
  </v-flex>
</template>

<script>
import BizEntity from '@/components/BizEntity'
import CaseInfo from '@/components/CaseInfo'
import Establishment from '@/components/Establishment'
export default {
  data () {
    return {
      active: null,
      tabs: [
        {
          title: 'Case Info',
          component: 'CaseInfo',
          index: 0
        },
        {
          title: 'Establishment',
          component: 'Establishment',
          index: 1
        },
        {
          title: 'Business Entity',
          component: 'BizEntity',
          index: 2
        }
      ]
    }
  },

  components: {
    BizEntity,
    CaseInfo,
    Establishment
  },

  methods: {

  }
}
</script>

<style lang="css">
</style>
