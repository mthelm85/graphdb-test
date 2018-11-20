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
          <v-flex xs2>
            <v-text-field
              label="# of Employees"
              v-model.trim="numberEmployees"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-text-field
              label="NAICS"
              v-model.trim="naics"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <strong>203(d) Employer</strong>
        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field
              label="Name"
              v-model.trim="name3d"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              label="Title"
              v-model.trim="title3d"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              label="Address"
              v-model.trim="address3d"
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
    },
    naics: {
      get () {
        return this.$store.state.estabInfo.naics
      },
      set (naics) {
        this.$store.commit('saveNaics', naics)
      }
    },
    name3d: {
      get () {
        return this.$store.state.estabInfo.name3d
      },
      set (name) {
        this.$store.commit('saveName3d', name)
      }
    },
    title3d: {
      get () {
        return this.$store.state.estabInfo.title3d
      },
      set (title) {
        this.$store.commit('saveTitle3d', title)
      }
    },
    address3d: {
      get () {
        return this.$store.state.estabInfo.address3d
      },
      set (address) {
        this.$store.commit('saveAddress3d', address)
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
            number_employees: "${this.numberEmployees}",
            naics: "${this.naics}"
          })
          MERGE (naics:Naics { code: "${this.naics}" })
          MERGE (employer:Employer3d {
            name: "${this.name3d}",
            title: "${this.title3d}",
            address: "${this.address3d}"
          })-[q:CONTROLS]->(estab)
          MERGE (case)-[r:INCLUDES]->(estab)
          MERGE (estab)-[s:LOCATED_IN_JURISDICTION_OF]->(whd)
          MERGE (estab)-[t:OPERATES_IN]->(naics)
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
