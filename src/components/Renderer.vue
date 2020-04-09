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

    rootNode() {
      let message = this.messages[this.messageName]
      return {
        name: message.name,
        children: this.getChildren(message),
      }
    },
  },

  methods: {
    loadNewProto() {
      this.$emit('newProto')
    },

    getChildren(message) {
      let enums = []
      if (typeof message.nested !== 'undefined') {
        for (let key in message.nested) {
          enums.push({
            name: key,
            type: 'enum',
            values: Object.keys(message.nested[key].values),
          })
        }
      }

      let fields = []
      if (typeof message.fields !== 'undefined') {
        for (let fieldName in message.fields) {
          let field = message.fields[fieldName]
          console.log(field.name)
          if (field.type.syntaxType === 'BaseType') {
            // Simple field
            fields.push({
              name: field.name,
              type: 'field',
              children: [],
            })
          } else {
            // Field references another message
            console.log(field.type.value)
            let referencedMessage = this.messages[field.type.value]
            console.log(referencedMessage)
            fields.push({
              name: field.name,
              type: 'field',
              children: this.getChildren(referencedMessage),
            })
          }
        }
      }

      // Collect fields
      let result = [...enums, ...fields]

      // Sort fields. No sort = keeps position
      if (this.sortType === this.sortTypes.NAME) {
        result = result.sort((a, b) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        )
      }

      // Return results
      return result
    },
  },
}
</script>
