<template lang="html">
  <v-card flat light>
    <v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
              label="Trade Name"
              v-model.trim="tradeName"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              label="Address"
              v-model.trim="address"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              label="No. of Employees"
              v-model.trim="numberEmployees"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn @click="save" color="primary">Save</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  computed: {
    tradeName: {
      get () {
        return this.$store.state.estabInfo.tradeName
      },
      set (name) {
        this.$store.commit('saveTradeName', name)
      }
    },
    address: {
      get () {
        return this.$store.state.estabInfo.address
      },
      set (address) {
        this.$store.commit('saveAddress', address)
      }
    },
    numberEmployees: {
      get () {
        return this.$store.state.estabInfo.numberEmployees
      },
      set (num) {
        this.$store.commit('saveNumberEmployees', num)
      }
    }
  },

  methods: {
    async save () {
      const res = await this.$neo4j.run(
        `
          MATCH (case:Case { id: "${this.$store.state.caseInfo.caseID}" })
          MATCH (whd:WHD_Office { name: "${this.$store.state.caseInfo.invOffice}" })
          WITH case, whd
          MERGE (estab:Establishment {
            trade_name: "${this.tradeName}",
            address: "${this.address}",
            number_employees: "${this.numberEmployees}"
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
