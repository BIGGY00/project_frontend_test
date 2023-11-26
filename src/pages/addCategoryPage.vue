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
          <q-breadcrumbs-el
            class="text-bold"
            label="Categories"
            to="/categories"
            :class="{ 'no-decoration': !isHovered1 }"
            @mouseover="isHovered1 = false"
            @mouseleave="isHovered1 = true"
          />
          <q-breadcrumbs-el label="Add Category" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card flat>
      <div class="text-h5 text-bold">Form New Category</div>
      <q-input
        v-model="name"
        label="Name"
        placeholder="Inseart Category name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Name category required']"
      />

      <div class="flex justify-between q-mt-md">
        <q-btn
          class="bg-orange text-white text-bold"
          icon="cancel"
          label="cancel"
          to="/categories"
        />
        <q-btn
          class="bg-green text-white text-bold"
          label="SUBMIT"
          icon="check"
          @click="addCategory"
        ></q-btn>
      </div>
    </q-card>
  </q-page>
</template> 
  
  <script setup>
import { ref, watch, onMounted } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");

const isHovered = ref(true);
const isHovered1 = ref(true);

const addCategory = async () => {
  try {
    const response = await api.post(
      `category`,
      {
        name: name.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    router.push({ name: "categories" });
  } catch (error) {
    console.error("Add category failed", error);
  }
};
</script>
  
<style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>