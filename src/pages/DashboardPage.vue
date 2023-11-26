<template>
  <q-page class="q-pa-xl">
    <div class="row items-center justify-center q-gutter-md self-center">
      <q-card text-center>
        <q-card-section
          class="q-pt-md q-pb-md"
          style="min-width: 300px; cursor: pointer"
          @click="$router.push({ name: 'products' })"
        >
          <div
            class="text-h5 text-bold text-blue"
            :class="{ 'no-decoration': !isHovered }"
            @mouseover="isHovered = false"
            @mouseleave="isHovered = true"
          >
            Products
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex justify-center items-center">
          <div class="text-h6 flex justify-between q-gutter-xl">
            <div class="on-left">Total Products</div>
            <div class="on-right">{{ productsTotal || "loading" }}</div>
          </div>
        </q-card-actions>
      </q-card>

      <q-card>
        <q-card-section
          class="q-pt-md q-pb-md"
          style="min-width: 300px; cursor: pointer"
          @click="$router.push({ name: 'categories' })"
        >
          <div
            class="text-h5 text-bold text-blue"
            :class="{ 'no-decoration': !isHovered1 }"
            @mouseover="isHovered1 = false"
            @mouseleave="isHovered1 = true"
          >
            Categories
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex justify-center items-center">
          <div class="text-h6 flex justify-between q-gutter-xl">
            <div class="on-left">Total Categories</div>
            <div class="on-right">{{ categoriesTotal || "loading" }}</div>
          </div>
        </q-card-actions>
      </q-card>

      <q-card>
        <q-card-section
          class="q-pt-md q-pb-md"
          style="min-width: 300px; cursor: pointer"
          @click="$router.push({ name: 'stocks' })"
        >
          <div
            class="text-h5 text-bold text-blue"
            :class="{ 'no-decoration': !isHovered2 }"
            @mouseover="isHovered2 = false"
            @mouseleave="isHovered2 = true"
          >
            Stocks
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex justify-center items-center">
          <div class="text-h6 flex justify-between q-gutter-xl">
            <div class="on-left">Total Stocks</div>
            <div class="on-right">{{ stocksTotal || "loading" }}</div>
          </div>
        </q-card-actions>
      </q-card>

      <q-card>
        <q-card-section
          class="q-pt-md q-pb-md"
          style="min-width: 300px; cursor: pointer"
          @click="$router.push({ name: 'reports' })"
        >
          <div
            class="text-h5 text-bold text-blue"
            :class="{ 'no-decoration': !isHovered3 }"
            @mouseover="isHovered3 = false"
            @mouseleave="isHovered3 = true"
          >
            Reports
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="flex justify-center items-center">
          <div class="text-h6 flex justify-between q-gutter-xl">
            <div class="on-left">Total Reports</div>
            <div class="on-right">{{ reportsTotal || "loading" }}</div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../boot/axios";
const isHovered = ref(true);
const isHovered1 = ref(true);
const isHovered2 = ref(true);
const isHovered3 = ref(true);

const productsTotal = ref("");
const categoriesTotal = ref("");
const stocksTotal = ref("");
const reportsTotal = ref("");

const fetchProducts = async () => {
  try {
    const response = await api.get(
      `products?filter=&keyword=&sortby=products.id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    productsTotal.value = response.data.pagination.total;
  } catch (error) {
    console.error(error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.get(
      `categories?filter=&keyword=&sortby=id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    categoriesTotal.value = response.data.pagination.total;
  } catch (error) {
    console.error(error);
  }
};

const fetchStocks = async () => {
  try {
    const response = await api.get(
      `stocks?filter=&keyword=&sortby=id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    stocksTotal.value = response.data.pagination.total;
  } catch (error) {
    console.error(error);
  }
};

const fetchReports = async () => {
  try {
    const response = await api.get(
      `orders?filter=&keyword=&sortby=id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    reportsTotal.value = response.data.pagination.total;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchProducts(), fetchCategories(), fetchStocks(), fetchReports();
});
</script>

<style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>
