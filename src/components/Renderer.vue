<template>
  <div>
    <h1>Renderer</h1>
    <b-button variant="primary" @click="loadNewProto">
      Load other
    </b-button>
  </div>
</template>

<script>
export default {
  methods: {
    loadNewProto() {
      this.$emit('newProto')
    },
  },
}
</script>
