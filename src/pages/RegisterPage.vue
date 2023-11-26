<template>
  <q-page>
    <q-form @submit="register">
      <div class="q-pa-xl">
        <div class="q-gutter-md fixed-center text-center">
          <div class="text-h4">Register</div>
          <div class="text-h6">Welcome to our store</div>
          <!-- Username section -->
          <q-input
            label="Username"
            v-model="username"
            class="text-body1"
            outlined
            clearable
            style="width: 450px"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please do not let it empty!!',
            ]"
          >
          </q-input>
          <!-- Phone section -->
          <q-input
            label="Phone"
            v-model="phone"
            class="text-body1"
            outlined
            clearable
            style="width: 450px"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please do not let it empty!!',
            ]"
          >
          </q-input>
          <!-- Email section -->
          <q-input
            label="Email"
            v-model="email"
            class="text-body1"
            outlined
            clearable
            style="width: 450px"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please do not let it empty!!',
            ]"
          >
          </q-input>
          <!-- Password section -->
          <q-input
            label="Password"
            v-model="password"
            class="text-body1"
            outlined
            clearable
            style="width: 450px"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please do not let it empty!!',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-ml-xs"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- Dropdown access -->
          <q-select
            v-model="access"
            :options="options"
            label="Type of user"
            outlined
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please do not let it empty!!',
            ]"
          ></q-select>
          <!-- Checking status -->
          <q-checkbox
            class="left"
            v-model="status"
            label="Please click confirm"
          ></q-checkbox>
          <!-- Button section -->
          <q-btn type="submit" style="width: 300px">register</q-btn>
          <div class="text-body1">
            You have the account?
            <div class="cursor-pointer text-blue text-bold" @click="direct">
              --- Login ---
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { api } from "../boot/axios";

name: "register";

const router = useRouter();

const username = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const isPwd = ref(true);

const access = ref("");
const access_use = ref("");
const options = ["Cashier", "Customer"];

const status = ref(false);
const status_use = ref("");

const register = async () => {
  try {
    const response = await api.post(`register`, {
      username: username.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      status: status_use.value,
      access: access_use.value,
    });
    console.log("Register successed");
    const result = await api.post(`login`, {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("id", result.data.data[0].id);
    localStorage.setItem("access", result.data.data[0].access);
    localStorage.setItem("token", result.data.data[0].token);
    router.push({ name: "dashboard" });
    username.value = "";
    phone.value = "";
    email.value = "";
    password.value = "";
    status.value = "";
    access.value = "";
  } catch (error) {
    console.error("Register failed", error.response.data.message);
    username.value = "";
    phone.value = "";
    email.value = "";
    password.value = "";
    status.value = "";
    access.value = "";
  }
};

const direct = async () => {
  router.push({ name: "login" });
};

watch(access, () => {
  if (access.value == "Cashier") {
    access_use.value = "1";
    // console.log(access_use);
  } else if (access.value == "Customer") {
    access_use.value = "2";
    // console.log(access_use);
  }
});

watch(status, () => {
  console.log(status);
  console.log(status_use);
  if (status.value == 1) {
    status_use.value = "1";
    // console.log(access_use);
  } else if (status.value == 0) {
    status_use.value = "0";
    // console.log(access_use);
  }
});
</script>
