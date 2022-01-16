<template>
  <div class="error-msg">
    <slot></slot>
    <img class="sad-face" src="https://img.icons8.com/ios/50/000000/sad.png" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.error-msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  white-space: normal;
  width: 100%;

  .sad-face {
    padding-top: 0.5em;
    max-width: 50px;
  }
}
</style>
