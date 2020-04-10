<template>
  <div id="app">
    <Loader v-if="currentMode == modes.LOAD" @loaded="protoLoaded" />
    <Renderer
      v-else
      :pkg="protoPackage"
      :messages="protoMessages"
      @newProto="loadNewProto"
    />
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Renderer from '@/components/Renderer'

export default {
  components: {
    Loader,
    Renderer,
  },

  data: function() {
    return {
      modes: {
        LOAD: 'load',
        RENDER: 'render',
      },
      currentMode: 'load',
      protoPackage: '',
      protoMessages: [],
    }
  },

  methods: {
    protoLoaded(proto) {
      this.protoPackage = proto.package
      this.protoMessages = proto.root.nested[proto.package].nested
      this.currentMode = this.modes.RENDER
      console.log(this.protoMessages)
    },

    loadNewProto() {
      this.proto = {}
      this.currentMode = this.modes.LOAD
    },
  },
}
</script>

<style>
body {
  overflow-y: scroll;
}
</style>
