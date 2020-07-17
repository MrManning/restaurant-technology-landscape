<template>
  <v-app class="layout">
    <v-container>
      <header class="header">
        <g-link class="heading-link" :to="{ name: 'home' }">
          <component :is="titleTag" class="heading">{{ $static.metadata.siteName }}</component>
        </g-link>
      </header>
    </v-container>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  computed: {
    titleTag () {
      return this.$route.name === 'home' ? 'h1' : 'h6'
    }
  }
}
</script>
