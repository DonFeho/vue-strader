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
        :class="[stock.amount > 0 ? 'card-cutted' : 'card-cutted-reverse']"
 
        style="max-width: auto; color: white;"
        class="m-3 border-0 text-left stock-card"
      >
        <b-card-text v-show="stock.amount">
          <transition name="fade" mode="out-in">
            <span class="text-stock" :key="stock.amount">
              <strong> {{ stock.amount }} </strong>
            </span>
          </transition>
          <span class="text-gold">
            {{ stock.amount > 1 ? "stocks" : "stock" }}
          </span>
        </b-card-text>

        <b-card-text>
          Today Price: 
          <transition name="fade" mode="out-in">
            <strong class="text-stock" :key="stock.price">
              $ {{ stock.price }}
            </strong>
          </transition>
        </b-card-text>

        <b-card-text v-if="tradeDay > 1">
          Last Price: $
          <transition name="fade" mode="out-in">
            <strong class="" :key="stock.lastprice">
              {{ stock.lastprice }}
            </strong>
          </transition>
        </b-card-text>

        <b-card-text v-if="tradeDay > 1">
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
        </b-card-text>
        <b-form-group>
          <b-form-row>
            <b-col>
              <b-form-input
                type="number"
                class="form-control"
                placeholder="Quantity"
                v-model="quantity"
              >
              </b-form-input>
            </b-col>
            <b-col>
              <b-button
                v-show="tradeMode"
                class="btn"
                @click="setOrder('buy')"
                :disabled="noFunds || quantity <= 0"
                :class="[noFunds ? 'btn-danger' : 'btn-buy']"
              >
                {{ noFunds ? "To much" : "BUY" }}
              </b-button>
              <b-button
                v-show="!tradeMode"
                class="btn"
                @click="setOrder('sell')"
                :disabled="noStocks || quantity <= 0"
                :class="[noStocks ? 'btn-danger' : 'btn-sell']"
              >
                {{ noStocks ? "To much" : "SELL" }}
              </b-button>
            </b-col>
          </b-form-row>
        </b-form-group>
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
      this.$store.dispatch("changeStock", order);
      this.quantity = null;
    }
  }
};
</script>
