<template>
  <transition name="slide" mode="out-in">
    <b-col
      class="mx-auto"      
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
        class="m-3 border-0 text-left text-white stock-card"
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
                @click="pushOrder('buy')"
                :disabled="noFunds || quantity <= 0"
                :class="[noFunds ? 'btn-danger' : 'btn-buy']"
              >
                {{ noFunds ? "To much" : "BUY" }}
              </b-button>
              <b-button
                v-show="!tradeMode"
                class="btn"
                @click="pushOrder('sell')"
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
import { mapActions, mapState } from "vuex"; 
export default {
  props: ["stock"],
  data() {
    return {
      quantity: null
    };
  },
  computed: {
    ...mapState({
      funds: state => state.stocks.funds,
      tradeMode: state => state.stocks.tradeMode,
      tradeDay: state => state.stocks.tradeDay
    }), 
    noFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    noStocks() {
      return this.quantity > this.stock.amount;
    }  
  },
  methods: {
    ...mapActions(['setOrder', 'changeStock']),
    pushOrder(type) {        
      const order = {
        stockId: this.stock.id,
        stockImgsrc: this.stock.imgSrc,
        stockName: this.stock.name,
        stockPrice: this.stock.price,
        stockQuantity: Number.parseInt(this.quantity, 0),
        orderPrice: Number.parseInt(this.stock.price * this.quantity, 0),
        orderType: type
      };
      this.setOrder(order);    
      this.changeStock(order);    
      this.quantity = null;
    }
  }
};
</script>
