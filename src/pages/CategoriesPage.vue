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
          <q-breadcrumbs-el label="Categories" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card class="bg-grey-3">
      <q-card-section class="flex justify-between">
        <q-btn
          class="bg-green text-white text-body1 text-bold"
          icon="add"
          label="Add"
          to="/addcategory"
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
            <q-card-section class="q-gutter-md flex justify-center">
              <div class="text-h6">Name: {{ item.name }}</div>
              <div class="text-h6 text-grey-5">
                Created At: {{ item.created }}
              </div>
              <div class="text-h6 text-grey-5">
                Updated At: ${{ item.updated }}
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md flex justify-center">
              <q-btn
                class="bg-primary text-white"
                icon="edit"
                @click="editCategory(item.id)"
              ></q-btn>
              <q-btn
                class="bg-red text-white"
                icon="delete"
                @click="deleteCategory(item.id)"
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

const fetchCategories = async () => {
  try {
    const response = await api.get(
      `categories?filter=&keyword=${keyword.value}&sortby=id&orderby=desc&page=1&limit=20`,
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

const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchCategories();
  } catch (error) {
    console.error("Delete category failed", error.message);
  }
};

const editCategory = async (productId) => {
  localStorage.setItem("editId", productId);
  router.push({ name: "editcategory" });
};

onMounted(() => {
  fetchCategories();
});

watch(keyword, () => {
  fetchCategories();
});
</script>
