<script setup>
import { reactive, computed } from 'vue';
import BasketTable from './components/BasketTable.vue';

const basket = reactive([
  {
    id: 1,
    name: 'Blue Flower Print Crop Top',
    color: 'Yellow',
    size: 'M',
    price: 29.0,
    quantity: 1,
    imageUrl: 'src/assets/crop-top.png',
  },
  {
    id: 2,
    name: 'Levender Hoodie',
    color: 'Levender',
    size: 'XXL',
    price: 119.0,
    quantity: 1,
    imageUrl: 'src/assets/hoodie.png',
  },
  {
    id: 3,
    name: 'Black Sweatshirt',
    color: 'Black',
    size: 'XXL',
    price: 123.0,
    quantity: 1,
    imageUrl: 'src/assets/sweatshirt.png',
  },
]);

const descreaseItemQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const increaseItemQuantity = (item) => {
  item.quantity++;
};

const removeItem = (index) => {
  basket.splice(index, 1);
};

const totalPrice = computed(() => {
  return basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const totalTax = computed(() => {
  return totalPrice.value * 0.1;
});
</script>

<template>
  <div class="container basket">
    <BasketTable
      :basket="basket"
      @decrease-quantity="descreaseItemQuantity"
      @increase-quantity="increaseItemQuantity"
      @remove-item="removeItem"
      :totalTax="totalTax"
      :totalPrice="totalPrice"
    />
  </div>
</template>

<style src="./style.css"></style>
