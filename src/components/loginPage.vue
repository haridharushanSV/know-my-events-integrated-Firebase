<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter(); // Initialize Vue Router

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('User logged in:', userCredential.user);

    // Navigate to HelloWorld.vue after successful login
    router.push('/hello'); 
  } catch (error: any) {
    errorMessage.value = error.message;
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="px-8 pt-8 pb-6 bg-gradient-to-r from-indigo-600 to-blue-500">
          <h1 class="text-3xl font-bold text-white text-center mb-2">Welcome Back</h1>
          <p class="text-blue-100 text-center">Please sign in to your account</p>
        </div>

        <!-- Form -->
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
          
         
    <!-- Email Field -->
    <v-text-field
      v-model="email"
      label="Email"
      prepend-inner-icon="mdi-email"
      type="email"
      required
      variant="solo-filled"
      class="rounded-lg custom-input"
      :disabled="loading"
      :error="!!errorMessage"
      color="primary"
    ></v-text-field>

    <!-- Password Field -->
    <v-text-field
      v-model="password"
      label="Password"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      required
      variant="solo-filled"
      class="rounded-lg custom-input"
      @click:append-inner="showPassword = !showPassword"
      :disabled="loading"
      :error="!!errorMessage"
      color="primary"
    ></v-text-field>

            <!-- Error Message -->
            <div v-if="errorMessage" 
                 class="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {{ errorMessage }}
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                hide-details
                class="mt-0"
                :disabled="loading"
              ></v-checkbox>
              <v-btn
                variant="text"
                color="primary"
                class="text-sm font-semibold"
                @click="() => {}"
                :disabled="loading"
              >
                Forgot password?
              </v-btn>
            </div>

            <!-- Sign In Button -->
            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              class="rounded-lg text-lg font-semibold"
              :loading="loading"
              :disabled="loading"
            >
              {{ loading ? 'Signing In...' : 'Sign In' }}
            </v-btn>

            <!-- Sign Up Link -->
            <div class="text-center pt-4">
              <span class="text-gray-600">Don't have an account? </span>
              <v-btn
                variant="text"
                color="primary"
                class="text-sm font-semibold"
                @click="() => {}"
                :disabled="loading"
              >
                Sign up
              </v-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-input :deep(.v-field) {
  border-radius: 10px;
}

.custom-input :deep(.v-field__outline) {
  border-radius: 10px;
}

.custom-input :deep(.v-input__control) {
  background-color: #f5f5f5;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-input :deep(.v-input__control:hover) {
  background-color: #e8e8e8;
}

.custom-input :deep(.v-input__control:focus-within) {
  background-color: white;
  border: 2px solid #3f51b5;
}

.v-btn {
  text-transform: none;
}
</style>

