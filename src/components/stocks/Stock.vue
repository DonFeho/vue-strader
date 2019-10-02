<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-title bg-buy">
        <h3>
          {{ stock.name }}
          <small> Price: {{ stock.price }} </small>
        </h3>
      </div>
      <div class="card-body bg-light">
        <div class="form-group form-row">
          <div class="col-md-6">
            <input
              type="number"
              class="form-control"
              placeholder="Quantity"
              v-model="quantity"
              
              :class="{ danger: lessFunds }"
            />
          </div>
          <div class="col-md-6">
            <button
              class="btn btn-success"
              @click="buyStock"
              :disabled="
                lessFunds || quantity <= 0 || Number.isInteger(quantity)
              "
            >
              {{ lessFunds ? "Less Funds" : "Buy" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: null
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    lessFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped lang="scss">
.danger {
  border: 3px solid red;
}
.card {
  margin: 1rem;
  padding: 0;
  height: auto;
  border: none;
  box-shadow: 1px 1px 5px 1px rgba(22, 8, 26, 0.781);
  .card-title {
    margin: 0;
    padding: 7px 0;
    color: rgb(236, 178, 69);
  }
  .card-body {
    border: none;
  }
}
</style>
