<template>
  <div>
    <li>
      <span
        class="proto-field-name"
        :class="{ mark: searched && node.searchMatch }"
      >
        {{ node.name }}</span
      >{{ node.required ? '*' : '' }}: {{ node.repeated ? '[]' : ''
      }}{{ node.type }}
      <ul>
        <template v-for="child in node.children">
          <li v-if="child.kind === 'basic'" :key="child.name">
            <span
              class="proto-field-name"
              :class="{ mark: searched && child.searchMatch }"
              >{{ child.name }}</span
            >{{ child.required ? '*' : '' }}: {{ child.repeated ? '[]' : ''
            }}{{ child.type }}
          </li>

          <Node
            v-if="child.kind === 'nested'"
            :node="child"
            :searched="searched"
            :key="child.name"
          ></Node>

          <li v-if="child.kind === 'enum'" :key="child.name">
            <span
              class="proto-field-name"
              :class="{ mark: searched && child.searchMatch }"
              >{{ child.name }}</span
            >{{ child.required ? '*' : '' }}:
            {{ child.repeated ? '[]' : '' }}Enum
            {{ formatEnumValues(child.values) }}
          </li>
        </template>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: ['node', 'searched'],

  methods: {
    formatEnumValues(values) {
      let output = []
      for (let key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          // Only show properties which were not inherited from prototype
          output.push(`${key} (${values[key]})`)
        }
      }
      return output.join(', ')
    },
  },
}
</script>

<style scoped>
.proto-field-name {
  font-weight: bold;
}
</style>
