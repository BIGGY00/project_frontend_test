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
            label="Caterogies"
            to="/categories"
            :class="{ 'no-decoration': !isHovered1 }"
            @mouseover="isHovered1 = false"
            @mouseleave="isHovered1 = true"
          />
          <q-breadcrumbs-el label="Edit Caterogy: id ">
            {{ id }}
          </q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card flat>
      <div class="text-h5 text-bold">Form Edit Product id {{ id }}</div>
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
          @click="back"
        />
        <q-btn
          class="bg-green text-white text-bold"
          label="EDIT"
          icon="check"
          @click="editCategory"
        ></q-btn>
      </div>
    </q-card>
  </q-page>
</template> 
    
  <script setup>
import { ref, watch, onMounted } from "vue";
import { uniqueId } from "lodash";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const id = localStorage.getItem("editId");

const name = ref("");

const isHovered = ref(true);
const isHovered1 = ref(true);

const detailCategory = async () => {
  try {
    const response = await api.get(`category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    name.value = response.data.data[0].name;
  } catch (error) {
    console.error("Get detail category failed", error);
  }
};

const editCategory = async () => {
  try {
    const response = await api.patch(
      `category/${id}`,
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
    localStorage.removeItem("editId");
  } catch (error) {
    console.error("Edit category failed", error);
  }
};

const back = () => {
  localStorage.removeItem("editId");
  router.push({ name: "categories" });
};

onMounted(() => {
  detailCategory();
});
</script>
  
    
    <style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>