<template>
  <b-container class="bg-fluid p-0 m-0" fluid>
    <b-container class="py-5 mt-5">
      <b-row class="text-left py-3">
        <b-col md="12" lg="12" xl="12">
          <h2 class="text-white">Vue.js Stock Trader</h2>
          <p class="lead text-info">v.2.0a</p>
          <p class="lead text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            aliquid labore, corporis praesentium ab fuga, cupiditate ducimus,
            explicabo quaerat animi recusandae officiis quisquam nam maiores?
            Quas delectus voluptatibus ratione exercitationem!
          </p>

          <br />

          <p class="text-light">
            Lorem ipsum dolor sit amet consectetur adipisuasi! Corrupti iste
            quaerat nobis provident aspernatur iure, architecto sed, consequatur
            cumque, repellendus voluptate vero assumenda quibusdam accusantium
            quam eum a voluptatibus laborum at sunt suscipit. Ab, maiores eos
            labore quo voluptatum quidem dolores quam reiciendis. Quas quae,
            vero saepe soluta, nihil totam odio dolorem fugiat unde omnis
            blanditiis voluptatum iste tempora placeat obcaecati possimus?
            Magnam ea in, sed vel provident quia fugit consectetur! Perferendis
            officia dolore nisi molestias, quasi suscipit quae saepe illo
            accusantium pariatur quaerat repellat repudiandae, corporis quisquam
            quia sit libero nam ex sapiente. Distinctio ipsam voluptas odit
            aliquid nam a accusantium facilis totam asperiores esse quo ex
            eligendi eos id iste inventore modi nihil hic fugiat velit, sequi et
            ullam officia eaque? Natus magnam suscipit sapiente. Est quae id
            iusto reprehenderit voluptate velit earum molestias aliquid itaque,
            delectus, quam quaerat amet totam rem voluptatum nulla libero ab
            nisi.
          </p>
          <b-button class="mt-2 btn btn-sell" @click="toTrade">
            To Trade
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
export default {
  methods: {
    toTrade() {
      this.$router.push("/stocks");
    }
  }
};
</script>
