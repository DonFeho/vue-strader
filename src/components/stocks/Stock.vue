<template>
  <transition name="slide" mode="out-in">
    <b-col
      class="mx-auto"
      xs="auto"
      sm="10"
      md="6"
      lg="4"
      xl="4"
      v-if="tradeMode || stock.amount > 0"
    >
      <b-card
        :title="stock.name"
        :img-src="stock.imgSrc"
        img-alt="Image"
        img-height="80px"
        img-width="80px"
        img-left
        tag="h6"
        style="max-width: auto;"
        class="p-3 mx-1 border-0 shadow text-left"
      >
        <b-card-text v-show="stock.amount">
          <h4>
            <transition name="fade" mode="out-in">
              <strong class="text-gold" :key="stock.amount">
                {{ stock.amount }}
              </strong>
            </transition>
            <small class="text-muted">
              {{ stock.amount > 1 ? "stocks" : "stock" }}
            </small>
          </h4>
        </b-card-text>

        <b-card-text>
          Today Price: $
          <transition name="fade" mode="out-in">
            <strong class="text-info" :key="stock.price">
              {{ stock.price }}
            </strong>
          </transition>
        </b-card-text>

        <b-card-text v-if="tradeDay > 1">
          Last Price: $
          <transition name="fade" mode="out-in">
            <strong class="text-muted" :key="stock.lastprice">
              {{ stock.lastprice }}
            </strong>
          </transition>
        </b-card-text>

        <b-card-text v-if="tradeDay > 1">
          <p>
            Delta Price: $
            <transition name="fade" mode="out-in">
              <strong
                :key="stock.delta"
                :class="[
                  stock.delta > 0 || stock.delta === 0
                    ? 'text-success'
                    : 'text-danger'
                ]"
              >
                {{ stock.delta }}
              </strong>
            </transition>
          </p>
        </b-card-text>
        <b-form-input
          type="number"
          class="form-control"
          placeholder="Quantity"
          v-model="quantity"
        >
        </b-form-input>
        <b-button
          v-show="tradeMode"
          class="mt-2 btn"
          :disabled="noFunds || quantity <= 0"
          @click="setOrder('buy')"
          :class="[noFunds ? 'btn-danger' : 'btn-buy']"
        >
          {{ noFunds ? "No Funds" : "BUY" }}
        </b-button>

        <b-button
          v-show="!tradeMode"
          class="mt-2 btn"
          :disabled="noStocks || quantity <= 0"
          @click="setOrder('sell')"
          :class="[noStocks ? 'btn-danger' : 'btn-sell']"
        >
          {{ noStocks ? "Not Stocks" : "SELL" }}
        </b-button>
      </b-card>
    </b-col>
  </transition>
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
    tradeDay() {
      return this.$store.getters.tradeDay;
    },
    noFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    noStocks() {
      return this.quantity > this.stock.amount;
    },
    tradeMode() {
      return this.$store.getters.tradeMode;
    }
  },

  methods: {
    setOrder(type) {
      const stockId = this.stock.id;
      const stockImgsrc = this.stock.imgSrc;
      const stockName = this.stock.name;
      const stockPrice = this.stock.price;
      const stockQuantity = this.quantity;
      const orderPrice = stockPrice * stockQuantity;
      const orderType = type;
      const order = {
        stockId: stockId,
        stockImgsrc: stockImgsrc,
        stockName: stockName,
        stockPrice: stockPrice,
        stockQuantity: Number.parseInt(stockQuantity, 0),
        orderPrice: Number.parseInt(orderPrice, 0),
        orderType: orderType
      };
      this.$store.dispatch("setOrder", order);
      if (orderType === "buy") {
        this.$store.dispatch("buyStock", order);
      } else {
        this.$store.dispatch("sellStock", order);
      }
      this.quantity = null;
    }
  }
};
</script>
