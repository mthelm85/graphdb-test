<template lang="html">
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    v-model="menu"
    :nudge-right="40"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px">
    <v-text-field
      slot="activator"
      v-model="date"
      :label="label"
      prepend-icon="event"
      readonly
    ></v-text-field>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="accent" @click="menu = false">Cancel</v-btn>
      <v-btn flat color="accent" @click="$refs.menu.save(date), $emit('invDate', date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      date: this.value,
      menu: false
    }
  },

  props: ['label', 'value'],

  watch: {
    value () {
      this.date = this.value
    }
  }
}
</script>

<style lang="css">
</style>
