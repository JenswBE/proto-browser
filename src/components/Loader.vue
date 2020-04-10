<template>
  <div>
    <b-jumbotron
      header="Proto Browser"
      header-level="4"
      style="padding: 2rem 2rem;"
    ></b-jumbotron>

    <b-container>
      <b-card>
        <b-form>
          <b-form-group
            id="input-group-proto-file"
            label="Protobuf .proto file:"
            label-for="input-proto-file"
          >
            <b-form-file
              id="input-proto-file"
              v-model="ioProtoFile"
              :state="Boolean(ioProtoFile)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              @input="parseProtoFile"
            ></b-form-file>
          </b-form-group>
        </b-form>
      </b-card>

      <p class="pt-5 pb-5 text-center">OR</p>

      <b-card>
        <b-form>
          <b-form-group
            id="input-group-proto-text-url"
            label="Protobuf URL:"
            label-for="input-proto-text-url"
          >
            <b-form-input
              id="input-proto-text-url"
              v-model="ioProtoURL"
              placeholder="E.g. https://raw.githubusercontent.com/..."
            >
            </b-form-input>
            <b-button
              variant="primary"
              class="mt-3"
              :disabled="ioProtoURL === ''"
              @click="fetchProtoFromURL"
            >
              Load
            </b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import * as parser from 'proto-parser'

export default {
  data: function() {
    return {
      ioProtoFile: null,
      ioProtoURL: '',
      ioProtoContents: '',
      proto: {},
    }
  },
  methods: {
    fetchProtoFromURL() {
      axios
        .get(this.ioProtoURL.trim())
        .then((res) => {
          this.ioProtoContents = res.data
          this.parseProtoContents()
        })
        .catch((err) => {
          alert(err)
        })
    },

    parseProtoFile() {
      let vm = this
      let reader = new FileReader()
      reader.onload = () => {
        vm.ioProtoContents = reader.result
        vm.parseProtoContents()
      }
      reader.readAsText(this.ioProtoFile)
    },

    parseProtoContents() {
      let proto = parser.parse(this.ioProtoContents)
      this.$emit('loaded', proto)
    },
  },
}
</script>
