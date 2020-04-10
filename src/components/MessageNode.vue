<template>
  <div>
    <li>
      {{ node.name }}: {{ node.type }}
      <ul>
        <template v-for="child in node.children">
          <li v-if="child.kind === 'basic'" :key="child.name">
            {{ child.name }}: {{ child.type }}
          </li>

          <Node
            v-if="child.kind === 'nested'"
            :node="child"
            :key="child.name"
          ></Node>

          <li v-if="child.kind === 'enum'" :key="child.name">
            {{ child.name }}: Enum {{ formatEnumValues(child.values) }}
          </li>
        </template>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: ['node'],

  methods: {
    formatEnumValues(values) {
      let output = []
      for (let key in values) {
        output.push(`${key} (${values[key]})`)
      }
      return output.join(', ')
    },
  },
}
</script>
