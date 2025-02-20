<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        class="form-textfield"
        label="Email"
        type="email"
        required
        solo
        :rules="emailRules"
      >
        <template #prepend-inner>
          <v-icon class="form-textfield-icon"> mdi-email-outline </v-icon>
          <v-divider vertical class="form-textfield-divider"></v-divider>
        </template>
      </v-text-field>
      <v-text-field
        v-model="password"
        class="form-textfield"
        label="Password"
        required
        solo
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        :counter="8"
        @click:append="showPassword = !showPassword"
      >
        <template #prepend-inner>
          <v-icon class="form-textfield-icon"> mdi-lock-outline </v-icon>
          <v-divider vertical class="form-textfield-divider"></v-divider>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: true,
        password: '',
        showPassword: false,
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) =>
            (v && v.length >= 8) || 'Name must be greater than 8 characters',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) =>
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
              v
            ) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      async submit() {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          try {
            const { data } = await this.$axios.post('/api/auth/signin', {
              email: this.email,
              password: this.password,
            })
            this.$emit('success', data)
          } catch (error) {
            let emittableError
            if (error.isAxiosError) {
              const errorResp = error.response.data
              if (typeof errorResp === 'string') {
                emittableError = { message: errorResp }
              } else {
                emittableError = errorResp
              }
            } else {
              emittableError = error
            }
            this.$emit('error', { statusCode: 500, ...emittableError })
          }
        }
      },
      clear() {
        this.$refs.form.reset()
      },
    },
  }
</script>

<style scoped>
  .form-textfield {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 0.7em;
  }

  .form-textfield-icon {
    padding: 0 0.35em;
  }

  .form-textfield-divider {
    background-color: gray;
    margin: 0.1em 0;
    margin-right: 1em;
  }
</style>
