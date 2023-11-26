<template>
  <q-page>
    <q-form @submit="login">
      <div class="q-pa-xl">
        <div class="q-gutter-md fixed-center text-center">
          <div class="text-h4">Login to System</div>
          <div class="text-h6">Welcome to our store</div>
          <!-- Email section -->
          <q-input
            label="Email"
            v-model="email"
            class="text-body1"
            outlined
            clearable
            style="width: 450px"
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-xs" name="person" />
            </template>
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
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-xs" name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-ml-xs"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- Button section -->
          <q-btn style="width: 300px" type="submit">Login</q-btn>
          <div class="text-body1">
            You don't have the account yet?
            <div
              class="cursor-pointer text-blue text-bold"
              to="/register"
              @click="direct"
            >
              --- Register ---
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useQuasar } from "quasar";
import { api } from "../boot/axios";

name: "login";

const email = ref("admin@gmail.com");
const password = ref("passworD_1");

const router = useRouter();

const isPwd = ref(true);

const login = async () => {
  try {
    const response = await api.post(`login`, {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("id", response.data.data[0].id);
    localStorage.setItem("access", response.data.data[0].access);
    localStorage.setItem("token", response.data.data[0].token);
    email.value = "";
    password.value = "";
    router.push({ name: "Patient" });
  } catch (error) {
    console.error(error);
    email.value = "";
    password.value = "";
  }
};

const direct = async () => {
  router.push({ name: "register" });
};
</script>