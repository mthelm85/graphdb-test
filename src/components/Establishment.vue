<template lang="html">
  <v-card flat light>
    <v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="e in estabInfo" :key="e.label" xs4>
            <v-text-field
              :label="e.label"
              v-model.trim="e.value"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn @click="save" color="primary">Save</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      estabInfo: [
        { label: 'Trade Name', value: '' },
        { label: 'Address', value: '' },
        { label: 'No. of Employees', value: '' }
      ]
    }
  },

  computed: {
    caseInfo () {
      return this.$store.state.caseInfo
    }
  },

  methods: {
    ...mapMutations([
      'saveEstabInfo'
    ]),
    async save () {
      const info = {
        tradeName: this.estabInfo[0].value,
        address: this.estabInfo[1].value,
        numberEmployees: this.estabInfo[2].value
      }
      this.saveEstabInfo(info)
      const res = await this.$neo4j.run(
        `
          MATCH (case:Case { id: "${this.caseInfo.caseID}" })
          MATCH (whd:WHD_Office { name: "${this.caseInfo.invOffice}" })
          WITH case, whd
          MERGE (estab:Establishment {
            trade_name: "${this.estabInfo[0].value}",
            address: "${this.estabInfo[1].value}",
            number_employees: "${this.estabInfo[2].value}"
          })
          MERGE (case)-[r:INCLUDES]->(estab)
          MERGE (estab)-[s:LOCATED_IN_JURISDICTION_OF]->(whd)
          RETURN (estab)
        `
      ).catch(e => console.log(e))
      console.log(res)
    }
  }
}
</script>

<style lang="css">
</style>
