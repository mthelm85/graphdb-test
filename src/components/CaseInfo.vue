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
          <v-flex xs6>
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
        <strong>Case Basics</strong>
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
              label="Case ID"
              v-model.trim="caseID"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              label="Investigating Office"
              v-model.trim="invOffice"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              label="Investigator"
              v-model.trim="whiName"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <strong>Investigation Period</strong>
        <v-layout row wrap>
          <v-flex xs6>
            <DatePicker v-on:invDate="invStart = $event" label="Investigation Start" :value="invStart"></DatePicker>
          </v-flex>
          <v-flex xs6>
            <DatePicker v-on:invDate="invEnd = $event" label="Investigation End" :value="invEnd"></DatePicker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-btn @click="save" color="primary">Save</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import DatePicker from '@/components/DatePicker'

export default {
  data () {
    return {
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

  computed: {
    caseID: {
      get () {
        return this.$store.state.caseInfo.caseID
      },
      set (id) {
        this.$store.commit('saveCaseID', id)
      }
    },
    invOffice: {
      get () {
        return this.$store.state.caseInfo.invOffice
      },
      set (office) {
        this.$store.commit('saveInvOffice', office)
      }
    },
    whiName: {
      get () {
        return this.$store.state.caseInfo.whiName
      },
      set (name) {
        this.$store.commit('saveWhiName', name)
      }
    },
    invStart: {
      get () {
        return this.$store.state.caseInfo.invStart
      },
      set (date) {
        this.$store.commit('saveInvStart', date)
      }
    },
    invEnd: {
      get () {
        return this.$store.state.caseInfo.invEnd
      },
      set (date) {
        this.$store.commit('saveInvEnd', date)
      }
    }
  },

  async created () {
    await this.$neo4j.connect('bolt', 'localhost', 11001, 'neo4j', 'supersafepass', false)
  },

  methods: {
    async save () {
      const res = await this.$neo4j.run(
        `
          MERGE (case:Case {
            id: "${this.caseID}",
            whd_office: "${this.invOffice}",
            lead_whi: "${this.whiName}",
            inv_period_start: "${this.invStart}",
            inv_period_end: "${this.invEnd}"
          })
          MERGE (whd_office: WHD_Office {
            name: "${this.invOffice}"
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
          })-[INCLUDES]-(estab:Establishment)
          RETURN case, estab
        `
      ).catch((e) => {
        this.alerts.search = true
      })
      console.log(res)
      if (res.records.length > 0) {
        this.$store.commit('saveCaseID', res.records[0]._fields[0].properties.id)
        this.$store.commit('saveInvOffice', res.records[0]._fields[0].properties.whd_office)
        this.$store.commit('saveWhiName', res.records[0]._fields[0].properties.lead_whi)
        this.$store.commit('saveInvStart', res.records[0]._fields[0].properties.inv_period_start)
        this.$store.commit('saveInvEnd', res.records[0]._fields[0].properties.inv_period_end)
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
