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
        <v-layout v-for="i in numberOfPeople.array" :key="i.array.name" row wrap>
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
          { name: this.name0, address: this.address0 }
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
      this.numberOfPeople.array.push({
        name: `this.name${this.numberOfPeople.counter}`,
        address: `this.address${this.numberOfPeople.counter}`
      })
    }
  }
}
</script>

<style lang="css">
</style>
