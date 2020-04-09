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
        fields: this.getFields(message),
      }
    },
  },

  methods: {
    loadNewProto() {
      this.$emit('newProto')
    },

    getFields() {
      return []
    },
  },
}
</script>
