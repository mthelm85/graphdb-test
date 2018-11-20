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
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              label="Name"
              v-model.trim="name1">
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Address"
              v-model.trim="address1">
            </v-text-field>
          </v-flex>
        </v-layout>
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
    }
  }
}
</script>

<style lang="css">
</style>
