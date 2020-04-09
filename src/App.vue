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

    getMessagesFromProto() {
      // Log namespace for debugging
      console.log('Namespace', this.namespace)

      // Build select list and set default
      this.messagesList = this.namespace.nestedArray
        .map((message) => message.name)
        .sort()
      if (this.namespace.name === 'bookings') {
        this.messageName = 'Bookings'
      } else {
        this.messageName = this.namespace.nestedArray[0].name
      }

      // Start render mode
      this.currentMode = this.modes.RENDER

      // Force first render
      this.renderProto()
    },

    renderProto() {
      console.log('Render of Protobuf: Started')
      let message = this.namespace.lookup(this.messageName)
      this.node = {
        name: message.name,
        fields: this.getFields(message),
      }
      console.log('Render of Protobuf: Finished')
    },

    getFields(message) {
      let fields = message.fieldsArray

      if (fields) {
        let plainFields = fields
          .filter((field) => !this.isUppercase(field.type[0]))
          .map((field) => ({ name: this.getName(field) }))

        let messages = fields
          .filter((field) => this.isUppercase(field.type[0]))
          .reduce((result, field) => {
            // Lookup message
            let childMessage = this.namespace.lookup(field.type)
            if (childMessage !== null) {
              // Valid message found => Add to result
              result.push({
                name: this.getName(field),
                fields: this.getFields(childMessage),
              })
              return result
            }
          }, [])

        // Collect fields
        let result = plainFields.concat(messages)

        // Sort fields. No sort = keeps position
        if (this.sortType === this.sortTypes.NAME) {
          result = result.sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          )
        }

        // Return results
        return result
      }

      return []
    },

    getName(field) {
      let repeated = field.repeated ? '[]' : ''
      return `${field.name}: ${repeated}${field.type}`
    },

    isUppercase(str) {
      return str === str.toUpperCase()
    },

    startLoadMode() {
      // Clean up
      this.ioProtoFile = null
      this.namespace = null
      this.messagesList = []
      this.node = {}

      // Set mode to load
      this.currentMode = this.modes.LOAD
    },

    resetSearch() {
      // Reset search and force rerender
      this.searchText = ''
      this.renderProto()
    },
  },
}
</script>
