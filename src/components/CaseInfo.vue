<template lang="html">
  <v-card flat light>
    <v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs3>
            <v-text-field
              label="Search"
              prepend-inner-icon="search"
              ap
              v-model="searchInput"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-btn @click="search" color="primary" dark>Search</v-btn>
          </v-flex>
        </v-layout>
        <strong>Case Basics</strong>
        <v-layout row wrap>
          <v-flex v-for="e in caseBasics" :key="e.label" xs4>
            <v-text-field
              :label="e.label"
              v-model="e.value"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <strong>Investigation Period</strong>
        <v-layout row wrap>
          <v-flex v-for="e in invPeriod" :key="e.label" xs6>
            <DatePicker v-on:invDate="e.value = $event" :label="e.label" :value="e.value"></DatePicker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-btn @click="save" color="primary">Save</v-btn>
          </v-flex>
          <v-flex xs9>
            <v-alert
              dismissible
              :value="alerts.save"
              :type="alerts.type">
              {{ alerts.message }}
            </v-alert>
            <v-alert
              dismissible
              :value="alerts.search"
              :type="alerts.type">
              {{ alerts.message }}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      caseBasics: [
        { label: 'Case ID', value: '' },
        { label: 'Investigating Office', value: '' },
        { label: 'Investigator', value: '' }
      ],
      invPeriod: [
        { label: 'Investigation Start', value: '' },
        { label: 'Investigation End', value: '' }
      ],
      searchInput: '',
      alerts: {
        type: 'success',
        save: false,
        search: false,
        message: ''
      }
    }
  },

  components: {
    DatePicker
  },

  async created () {
    await this.$neo4j.connect('bolt', 'localhost', 11001, 'neo4j', 'supersafepass', false)
  },

  methods: {
    ...mapMutations([
      'saveCaseInfo'
    ]),
    async save () {
      const info = {
        caseID: this.caseBasics[0].value,
        invOffice: this.caseBasics[1].value,
        whiName: this.caseBasics[2].value,
        invStart: this.invPeriod[0].value,
        invEnd: this.invPeriod[1].value
      }
      this.saveCaseInfo(info)
      const res = await this.$neo4j.run(
        `
          MERGE (case:Case {
            id: "${this.caseBasics[0].value}",
            whd_office: "${this.caseBasics[1].value}",
            lead_whi: "${this.caseBasics[2].value}",
            inv_period_start: "${this.invPeriod[0].value}",
            inv_period_end: "${this.invPeriod[1].value}"
          })
          MERGE (whd_office: WHD_Office {
            name: "${this.caseBasics[1].value}"
          })
          RETURN case
        `
      ).catch((e) => {
        this.alerts.save = true
      })
      if (res) {
        this.alerts.type = 'success'
        this.alerts.message = 'Case info successfully saved to database.'
        this.alerts.save = true
      }
    },
    async search () {
      const res = await this.$neo4j.run(
        `
          MATCH (case:Case {
            id: '${this.searchInput}'
          })
          RETURN case
        `
      ).catch((e) => {
        this.alerts.search = true
      })
      console.log(res)
      if (res.records.length > 0) {
        this.caseBasics[0].value = res.records[0]._fields[0].properties.id
        this.caseBasics[1].value = res.records[0]._fields[0].properties.whd_office
        this.caseBasics[2].value = res.records[0]._fields[0].properties.lead_whi
        this.invPeriod[0].value = res.records[0]._fields[0].properties.inv_period_start
        this.invPeriod[1].value = res.records[0]._fields[0].properties.inv_period_end
        const info = {
          caseID: res.records[0]._fields[0].properties.id,
          invOffice: res.records[0]._fields[0].properties.whd_office,
          whiName: res.records[0]._fields[0].properties.lead_whi,
          invStart: res.records[0]._fields[0].properties.inv_period_start,
          invEnd: res.records[0]._fields[0].properties.inv_period_end
        }
        this.saveCaseInfo(info)
      } else if (res.records.length === 0) {
        this.alerts.type = 'error'
        this.alerts.message = 'A case with that ID was not found.'
        this.alerts.search = true
      }
    }
  }
}
</script>

<style lang="css">
</style>
