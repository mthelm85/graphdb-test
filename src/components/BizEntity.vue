<template lang="html">
  <v-card flat light>
    <v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              label="Legal Name"
              v-model.trim="legalName"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Address"
              v-model.trim="address"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <strong>Shareholders/Partners/Corporate Officers</strong>
        <v-layout v-for="i in numberOfPeople.array" :key="i.index" row wrap>
          <v-flex xs6>
            <v-text-field
              label="Name"
              v-model.trim="i.name">
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Address"
              v-model.trim="i.address">
            </v-text-field>
          </v-flex>
          <v-btn
            @click="newPerson"
            absolute
            dark
            fab
            bottom
            right
            color="accent">
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3>
            <v-btn @click="save" color="primary">Save</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      numberOfPeople: {
        counter: 0,
        array: [
          { name: this.name0, address: this.address0, index: 0 }
        ]
      }
    }
  },

  computed: {
    legalName: {
      get () {
        return this.$store.state.bizEntity.legalName
      },
      set (name) {
        this.$store.commit('saveLegalName', name)
      }
    },
    address: {
      get () {
        return this.$store.state.bizEntity.address
      },
      set (address) {
        this.$store.commit('saveBizEntAddress', address)
      }
    },
    name0: {
      get () {
        return this.$store.state.bizEntity.name0
      },
      set (name) {
        this.$store.commit('saveName0', name)
      }
    },
    address0: {
      get () {
        return this.$store.state.bizEntity.address0
      },
      set (address) {
        this.$store.commit('saveAddress0', address)
      }
    },
    name1: {
      get () {
        return this.$store.state.bizEntity.name1
      },
      set (name) {
        this.$store.commit('saveName1', name)
      }
    },
    address1: {
      get () {
        return this.$store.state.bizEntity.address1
      },
      set (address) {
        this.$store.commit('saveAddress1', address)
      }
    },
    name2: {
      get () {
        return this.$store.state.bizEntity.name2
      },
      set (name) {
        this.$store.commit('saveName2', name)
      }
    },
    address2: {
      get () {
        return this.$store.state.bizEntity.address2
      },
      set (address) {
        this.$store.commit('saveAddress2', address)
      }
    }
  },

  methods: {
    newPerson () {
      this.numberOfPeople.counter++
      switch (this.numberOfPeople.counter) {
        case 1:
          this.numberOfPeople.array.push({
            name: this.name1,
            address: this.address1,
            index: 1
          })
          break
        case 2:
          this.numberOfPeople.array.push({
            name: this.name2,
            address: this.address2,
            index: 2
          })
          break
        default:
          break
      }
    },
    async save () {
      const res = await this.$neo4j.run(
        `MATCH (case:Case { id: "${this.$store.state.caseInfo.caseID}" })
        -[:INCLUDES]-(estab:Establishment { trade_name: "${this.$store.state.estabInfo.tradeName}" })
        MERGE (ent:Business_Entity {
          legalName: "${this.legalName}",
          address: "${this.address}",
          shareholder0: "${this.name0}",
          address0: "${this.address0}",
          shareholder1: "${this.name1}",
          address1: "${this.address1}",
          shareholder2: "${this.name2}",
          address2: "${this.address2}"
        })
        MERGE (ent)-[:OPERATES]->(estab)
        `
      )
    }
  }
}
</script>

<style lang="css">
</style>
