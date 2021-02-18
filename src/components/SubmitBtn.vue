<template>
    <button :class="classBtn" type="submit">
        <div class="btn-area">
            <font-awesome-icon :icon="faicon" v-if="faicon && faiconposition == 'left' && !processloading" />
            <span v-text="textbutton" v-if="textbutton" class="text"></span>
            <font-awesome-icon :icon="faicon" v-if="faicon && faiconposition == 'right' && !processloading" />
        </div>
    </button>
</template>
<script>
export default {
  name: 'SubmitBtn',
  props: {
    processloading: { type: Boolean },
    textbutton: { type: String, default: null },
    stylebutton: { type: String, default: 'submit_btn' },
    faicon: { type: String, default: null },
    faiconposition: { type: String, default: 'right' }
  },
  computed: {
    classBtn () {
      return this.processloading !== false ? 'btn-loading  button ' + this.stylebutton
        : 'button  ' + this.stylebutton
    }
  }
}
</script>
<style scoped>
  @import url("../../src/css/components/submit_btn.css");
</style>
