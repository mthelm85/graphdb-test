<template lang="html">
<v-flex xs12>
  <v-form ma-4>
    <v-text-field
      v-model="actor"
      label="Actor">
    </v-text-field>
    <v-btn color="success" @click="testQuery">Search</v-btn>
  </v-form>
</v-flex>
</template>

<script>
import Secret from '@/secret.js'
export default {
  data () {
    return {
      protocol: 'bolt',
      host: 'localhost',
      port: 11011,
      username: 'neo4j',
      password: Secret.pass,
      actor: ''
    }
  },

  async created () {
    let res = await this.connect()
    console.log(res)
  },

  methods: {
    connect () {
      return this.$neo4j.connect(this.protocol, this.host, this.port, this.username, this.password, false)
    },
    driver () {
      return this.$neo4j.getDriver()
    },
    async testQuery () {
      let session = this.$neo4j.getSession()
      let res = await session.run(`MATCH (n:Person { name: "${this.actor}" }) RETURN n LIMIT 25`)
      console.log(res.records)
      session.close()
    }
  }
}
</script>

<style lang="css">
</style>
