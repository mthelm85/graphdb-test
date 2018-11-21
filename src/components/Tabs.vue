<template lang="html">
  <v-flex xs12>
    <v-tabs
      v-model="active"
      color="primary"
      dark
      slider-color="accent">
      <v-tab
        v-for="tab in tabs"
        :key="tab.index"
        @click="search(tab.search)"
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
          index: 0,
          search: 'caseInfo'
        },
        {
          title: 'Establishment',
          component: 'Establishment',
          index: 1,
          search: 'estab'
        },
        {
          title: 'Business Entity',
          component: 'BizEntity',
          index: 2,
          search: 'bizEntity'
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
    async search (tab) {
      if (tab === 'estab') {
        const res = await this.$neo4j.run(
          `MATCH(case:Case {
            id: "${this.$store.state.caseInfo.caseID}"
          })-[:INCLUDES]->(estab:Establishment)
          WITH estab
          MATCH (er:Employer3d)-[:CONTROLS]->(estab)
          RETURN collect(estab), er
          `
        ).catch((e) => {
          console.log(e)
        })
        console.log(res.records)
        if (res.records.length > 0) {
          this.$store.commit('saveTradeName', res.records[0]._fields[0][0].properties.trade_name)
          this.$store.commit('saveAddress', res.records[0]._fields[0][0].properties.address)
          this.$store.commit('saveNumberEmployees', res.records[0]._fields[0][0].properties.number_employees)
          this.$store.commit('saveNaics', res.records[0]._fields[0][0].properties.naics)
          this.$store.commit('saveName3d', res.records[0]._fields[1].properties.name)
          this.$store.commit('saveTitle3d', res.records[0]._fields[1].properties.title)
          this.$store.commit('saveAddress3d', res.records[0]._fields[1].properties.address)
        }
      } else if (tab === 'bizEntity') {
        console.log('bizEntity')
      }
    }
  }
}
</script>

<style lang="css">
</style>
