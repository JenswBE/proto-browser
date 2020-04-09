<template>
  <div>
    <li>
      {{ node.name }}
      <ul>
        <template v-for="child in node.children">
          <Node
            v-if="child.type === 'field'"
            :node="child"
            :key="child.name"
          ></Node>

          <li v-if="child.type === 'enum'" :key="child.name">
            {{ child.values.join(', ') }}
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
}
</script>
