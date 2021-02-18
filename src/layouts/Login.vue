<template>
    <div>
        <section class="hero is-fullheight" >
            <div class="hero-body" >
                <div class="container">
                    <transition  name="fade" mode="out-in">
                      <router-view />
                    </transition>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>

</style>
