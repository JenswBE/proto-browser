<template>
  <div>
    <li>
      {{ node.name }}
      <ul>
        <Node
          v-for="field in node.fields"
          :node="field"
          :key="field.name"
        ></Node>
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
