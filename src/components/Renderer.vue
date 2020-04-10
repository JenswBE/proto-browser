<template>
  <b-container fluid class="pt-3">
    <b-row class="text-center">
      <b-col cols="2">
        <p class="h1">{{ pkg }}</p>
      </b-col>
      <b-col cols="4">
        <b-form-group
          id="input-group-message"
          label="Message: "
          label-for="input-message"
          label-cols="2"
        >
          <b-form-select
            v-model="messageName"
            id="input-message"
            :options="messageList"
          >
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="4">
        <b-form-group
          id="input-group-sort"
          label="Sort by: "
          label-for="input-sort"
          label-cols="2"
        >
          <b-form-select
            v-model="sortType"
            id="input-sort"
            :options="sortTypesList"
          >
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="2">
        <b-button variant="primary" @click="loadNewProto">
          Load new proto
        </b-button>
      </b-col>
    </b-row>

    <hr />

    <MessageNode :node="rootNode" />
  </b-container>
</template>

<script>
import MessageNode from './MessageNode'

export default {
  components: {
    MessageNode,
  },

  props: {
    pkg: {
      type: String,
      required: true,
    },
    messages: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentMessageName: '',
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
    }
  },

  computed: {
    messageList() {
      // Get values for select
      return Object.keys(this.messages)
        .map((message) => this.messages[message].name)
        .sort()
    },

    messageName: {
      get() {
        if (this.currentMessageName) {
          // Return current message name is set
          return this.currentMessageName
        } else {
          if (
            this.pkg === 'bookings' &&
            this.messageList.indexOf('Bookings') > -1
          ) {
            return 'Bookings'
          } else {
            return this.messageList[0]
          }
        }
      },
      set(value) {
        this.currentMessageName = value
      },
    },

    typeMap() {
      let result = {}
      for (let key in this.messages) {
        // Extract message
        let message = this.messages[key]

        // Store current message in map
        let type = message.fullName
        result[this.convertToDollarKey(type)] = message

        // Get nested types and store in map
        let types = this.getNestedTypes(message)
        Object.assign(result, types)
      }

      return result
    },

    rootNode() {
      let message = this.messages[this.messageName]
      return {
        name: message.name,
        kind: 'nested',
        type: message.name,
        children: this.getChildren(message),
      }
    },
  },

  methods: {
    loadNewProto() {
      this.$emit('newProto')
    },

    getNestedTypes(message) {
      let result = {}
      if (typeof message.nested !== 'undefined') {
        for (let key in message.nested) {
          // Extract nested type
          let nestedType = message.nested[key]

          // Store current type in map
          let type = nestedType.fullName
          result[this.convertToDollarKey(type)] = nestedType

          // Get nested types and store in map
          let types = this.getNestedTypes(nestedType)
          Object.assign(result, types)
        }
      }
      return result
    },

    convertToDollarKey(key) {
      return key.replace(/\./g, '$')
    },

    getChildren(message) {
      let fields = []
      if (typeof message.fields !== 'undefined') {
        for (let fieldName in message.fields) {
          let field = message.fields[fieldName]
          if (field.type.syntaxType === 'BaseType') {
            // Simple field
            fields.push({
              name: field.name,
              kind: 'basic',
              repeated: field.repeated,
              required: field.required,
              type: field.type.value,
            })
          } else {
            // Field references another message or enum
            let key = this.convertToDollarKey(field.type.resolvedValue)
            let referencedType = this.typeMap[key]

            if (referencedType.syntaxType === 'EnumDefinition') {
              // Type is Enum
              console.log(referencedType.values)
              fields.push({
                name: field.name,
                kind: 'enum',
                repeated: field.repeated,
                required: field.required,
                values: referencedType.values,
              })
            } else {
              // Type is message
              fields.push({
                name: field.name,
                kind: 'nested',
                repeated: field.repeated,
                required: field.required,
                type: field.type.value,
                children: this.getChildren(referencedType),
              })
            }
          }
        }
      }

      // Sort fields. No sort = keeps position
      if (this.sortType === this.sortTypes.NAME) {
        fields = fields.sort((a, b) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        )
      }

      // Return results
      return fields
    },
  },
}
</script>
