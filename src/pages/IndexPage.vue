<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../boot/axios";

name: "IndexPage";

const fetchProducts = async () => {
  try {
    const response = api.get(`product`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

onMounted: {
  fetchProducts();
}
</script>
