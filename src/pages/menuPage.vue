<template>
  <q-page class="q-pa-xl q-gutter-lg">
    <q-card class="bg-grey-3">
      <q-card-section>
        <q-breadcrumbs gutter="md" class="text-h6">
          <q-breadcrumbs-el
            class="text-bold text-primary"
            label="Menu"
            to="/menu"
            :class="{ 'no-decoration': !isHovered }"
            @mouseover="isHovered = false"
            @mouseleave="isHovered = true"
          />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <div class="flex justify-left">
      <q-card class="bg-grey-4 q-mr-xl">
        <q-card-section class="flex">
          <q-card
            v-for="item in filteredData"
            :key="item.id"
            outlined
            class="q-ma-md"
            style="min-height: 150px; min-width: 200px"
          >
            <div class="">
              <q-card-section class="">
                <q-img
                  :src="`http://localhost:5005/api/v1/imgproducts/${item.image}`"
                  alt="Product Image"
                  style="max-width: 300px; max-height: 300px"
                />
              </q-card-section>

              <q-card-section class="q-gutter-md">
                <div class="text-h6">Name: {{ item.name }}</div>
                <div class="text-subtitle1">Price: ${{ item.price }}</div>
                <div class="text-subtitle1">Stock: {{ item.stock }}</div>
              </q-card-section>

              <q-card-section class="q-gutter-md flex justify-center">
                <q-btn
                  class="bg-primary text-white"
                  icon="add"
                  label="To cart"
                  @click="addToCart(item)"
                  :disable="item.quantity >= item.stock"
                ></q-btn>
              </q-card-section>
            </div>
          </q-card>
        </q-card-section>
      </q-card>

      <!-- Cart -->
      <q-card class="bg-grey-4 q-ml-xl" style="min-width: 500px">
        <q-card-section class="text-h6">
          <ul>
            <li v-for="cartItem in cart" :key="cartItem.id">
              {{ cartItem.name }} - ${{ cartItem.price }} (Quantity:
              {{ cartItem.quantity }})
              <q-btn
                rounded=""
                class="q-ml-xl"
                icon="delete"
                @click="removeFromCart(cartItem.id)"
              ></q-btn>
            </li>
          </ul>
          <div>Total Amount in Cart: ${{ calculateTotalAmount() }}</div>
          <div class="q-gutter-sm">
            <q-input v-model="customer" label="Customer"></q-input>
            <q-select
              v-model="payment"
              :options="paymentOptions"
              label="Caterogies"
            />
            <q-btn
              class="bg-primary text-white"
              label="Place Order"
              @click="placeOrder"
              :disable="cart.length === 0"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
  
<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";
import { QBtn, QSelect } from "quasar";

const router = useRouter();

const keyword = ref("");
const data = ref([]);
const filteredData = ref([]);
const cart = ref([]);
const customer = ref("");
const payment = ref("");

const isHovered = ref(true);

const paymentOptions = ["Cash", "Mobile Banking"];

const fetchProducts = async () => {
  try {
    const response = await api.get(
      `products?filter=&keyword=${keyword.value}&sortby=products.id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    data.value = response.data.data;
    filteredData.value = data.value.map((item) => ({ ...item, quantity: 0 }));
  } catch (error) {
    console.error(error);
  }
};

const addToCart = (item) => {
  const existingItem = cart.value.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    if (existingItem.quantity < item.stock) {
      existingItem.quantity += 1;
    } else {
      console.warn("Stock limit reached for this item.");
    }
  } else {
    cart.value.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  }
};

const removeFromCart = (itemId) => {
  const index = cart.value.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity -= 1;
    } else {
      cart.value.splice(index, 1);
    }
  }
};

const calculateTotalAmount = () => {
  return cart.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const placeOrder = async () => {
  try {
    // Step 1: Place the order
    const orderData = {
      customer: customer.value,
      operator: null,
      payment: payment.value,
      status: 1,
      subtotal: calculateTotalAmount(),
    };

    const orderResponse = await api.post("/orders", orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Step 2: Place order details for each item in the cart
    for (const cartItem of cart.value) {
      try {
        const detailOrderData = {
          operator: parseInt(localStorage.getItem("id"), 10),
          orderid: orderResponse.data.data.insertId,
          price: cartItem.price,
          productid: cartItem.id,
          qty: cartItem.quantity,
          remark: "Transaction",
          total: cartItem.price * cartItem.quantity,
        };

        await api.post("/detailorder", detailOrderData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.error("Error placing order details:", error);
        // Handle the error, e.g., show an error message to the user
      }
    }

    console.log("Order placed successfully:", orderResponse.data);
    resetCart();
    router.push("/success"); // Replace with your success page route
  } catch (error) {
    console.error("Error placing order:", error);
    // Handle the error, e.g., show an error message to the user
  }
};

onMounted(() => {
  fetchProducts();
});

watch(cart, () => {
  console.log(cart.value);
});
</script>
  
  <style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>
  