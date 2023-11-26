<template>
  <q-page class="q-pa-xl q-gutter-lg">
    <q-card class="bg-grey-3">
      <q-card-section>
        <q-breadcrumbs gutter="md" class="text-h6">
          <q-breadcrumbs-el
            class="text-bold"
            label="Dashboard"
            to="/dashboard"
            :class="{ 'no-decoration': !isHovered }"
            @mouseover="isHovered = false"
            @mouseleave="isHovered = true"
          />
          <q-breadcrumbs-el label="Products" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card class="bg-grey-3">
      <q-card-section class="flex justify-between">
        <q-btn
          class="bg-green text-white text-body1 text-bold"
          icon="add"
          label="Add"
          to="/addproduct"
        ></q-btn>
        <q-input
          class=""
          outlined
          dense
          v-model="keyword"
          placeholder="Searching"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-card
          v-for="item in filteredData"
          :key="item.id"
          outlined
          class="q-ma-xl"
        >
          <div class="grid justify-center">
            <q-card-section class="flex justify-center">
              <q-img
                :src="`http://localhost:5005/api/v1/imgproducts/${item.image}`"
                alt="Product Image"
                style="max-width: 300px; max-height: 300px"
              />
            </q-card-section>

            <q-card-section class="q-gutter-md flex justify-center">
              <div class="text-h6">Name: {{ item.name }}</div>
              <div class="text-subtitle1">Category: {{ item.category }}</div>
              <div class="text-subtitle1">Price: ${{ item.price }}</div>
              <div class="text-subtitle1">Stock: {{ item.stock }}</div>
            </q-card-section>

            <q-card-section class="q-gutter-md flex justify-center">
              <q-btn
                class="bg-primary text-white"
                icon="edit"
                @click="editProduct(item.id)"
              ></q-btn>
              <q-btn
                class="bg-red text-white"
                icon="delete"
                @click="deleteProduct(item.id)"
              ></q-btn>
            </q-card-section>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const isHovered = ref(true);

const keyword = ref("");
const data = ref([]);
const filteredData = ref([]);

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
    filteredData.value = data.value;
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`product/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchProducts();
  } catch (error) {
    console.error("Delete product failed", error.message);
  }
};

const editProduct = async (productId) => {
  localStorage.setItem("editId", productId);
  router.push({ name: "editproduct" });
};

onMounted(() => {
  fetchProducts();
});

watch(keyword, () => {
  fetchProducts();
});
</script>

<style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>
