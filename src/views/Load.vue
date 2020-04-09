<template>
  <div>
    <b-jumbotron
      v-if="currentMode == modes.LOAD"
      header="Proto Browser"
      header-level="4"
      style="padding: 2rem 2rem;"
    ></b-jumbotron>

    <b-container>
      <template v-if="currentMode == modes.LOAD">
        <b-form>
          <b-form-group
            id="input-group-proto-text-url"
            label="Protobuf URL:"
            label-for="input-proto-text-url"
          >
            <b-form-input
              id="input-proto-text-url"
              v-model="ioProtoTextURL"
              placeholder="E.g. https://raw.githubusercontent.com/..."
            >
            </b-form-input>
            <b-button
              variant="primary"
              class="mt-3"
              :disabled="!ioProtoTextURL"
              @click="fetchProtoText"
            >
              Load</b-button
            >
          </b-form-group>
        </b-form>

        <p class="pt-5 pb-5">OR</p>

        <b-form>
          <b-form-group
            id="input-group-proto-file"
            label="Protobuf JSON file:"
            label-for="input-proto-file"
          >
            <b-form-file
              id="input-proto-file"
              v-model="ioProtoJSONFile"
              :state="Boolean(ioProtoJSONFile)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              @input="parseProtoJSON"
            ></b-form-file>
            <template v-slot:description>
              <code>
                sudo npm install --global protobufjs<br />
                pbjs -t json bookings.proto > bookings.proto.json
              </code>
            </template>
          </b-form-group>
        </b-form>
      </template>
    </b-container>
  </div>
</template>

<script>
import * as parser from 'proto-parser'

export default {
  name: 'Load',
  data: function() {
    return {
      modes: {
        LOAD: 'load',
        RENDER: 'render',
      },
      currentMode: 'load',
      ioProtoJSONFile: null,
      ioProtoTextURL: '',
      namespace: null,
      messagesList: [],
      messageName: 'Bookings',
      sortTypes: {
        POSITION: 'POSITION',
        NAME: 'NAME',
      },
      sortTypesList: [
        { value: 'POSITION', text: 'Position' },
        { value: 'NAME', text: 'Name' },
      ],
      sortType: 'POSITION',
      searchText: '',
      node: {},
    }
  },
  methods: {
    fetchProtoText() {
      // // Capture current context
      // let vm = this
      // // Load Protobuf from remote URL
      // protobuf.load(this.ioProtoTextURL, (error, root) => {
      //   if (error) alert(error)
      //   vm.namespace = root.nestedArray[0]
      //   // Trigger message extraction
      //   vm.getMessagesFromProto()
      // })
    },

    parseProtoJSON() {
      // let vm = this
      let reader = new FileReader()
      reader.onload = () => {
        console.log(parser.parse(reader.result))
        // Parse JSON text to Protobuf object
        // let protoJSON = JSON.parse(reader.result)
        // let root = protobuf.Root.fromJSON(protoJSON)
        // vm.namespace = root.nestedArray[0]

        // // Trigger message extraction
        // vm.getMessagesFromProto()
      }
      reader.readAsText(this.ioProtoJSONFile)
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
      this.ioProtoJSONFile = null
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
