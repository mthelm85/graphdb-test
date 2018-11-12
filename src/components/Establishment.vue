<template lang="html">
  <v-card flat light>
    <v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="e in estabInfo" :key="e.label" xs4>
            <v-text-field
              :label="e.label"
              v-model="e.value"
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
      estabInfo: [
        { label: 'Trade Name', value: '' },
        { label: 'Address', value: '' },
        { label: 'No. of Employees', value: '' }
      ]
    }
  },
  methods: {
    save () {
      console.log('TBD')
    }
  }
}
</script>

<style lang="css">
</style>
