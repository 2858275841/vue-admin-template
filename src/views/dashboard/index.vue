<template>
  <div>
    <Card />
    <Sale />
    <ObServe />
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Card/Sale'
import ObServe from './Card/ObServe'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    ObServe
  }
}
</script>

<style scoped></style>
