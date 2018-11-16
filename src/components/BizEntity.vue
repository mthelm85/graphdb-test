<template lang="html">
  <v-card flat light>
    <v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs3>
            <v-text-field
              label="Legal Name"
              v-model.trim="legalName"
            ></v-text-field>
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
    }
  }
}
</script>

<style lang="css">
</style>
