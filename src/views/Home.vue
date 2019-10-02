<template>
  <div class="home">
    <div class="container py-5 text-left">
      <h3>Trade or View your stocks Portfolio</h3>
      <hr />
      <p class="lead">You able to Save / Load your Data</p>
      <p class="lead">Click 'End Day' to begin new Traiding Day!</p>
      <div class="row py-3">
        <div class="col-md-4">
          <div class="card bg-success text-light text-left">
            <div class="card-body">
              <h2>Your Funds: {{ funds | currency }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  height: 350px;
  width: 350px;
  text-align: center;
}
</style>
