<template>
  <input
    type="text"
    v-model="valueInput"
    class="ui-money"
    @input="onFormated($event)"
  />
</template>

<script>
import NumberModel from '@/models/NumberModel';

export default {

  name: 'UiMoney',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: +this.value ? this.onFormated(this.value) : '',
    };
  },

  methods: {
    onFormated(event) {
      event.preventDefault();
      const valueTemp = event.target.value.replace(/[^\d.,]/g, '').replace(/,/g, '.').match(/(^\d*(\.)?\d*)/g);
      if (String(valueTemp).length === 0) {
        this.valueInput = '';
        this.$emit('input', undefined);
      } else {
        this.valueInput = NumberModel.separation(valueTemp);
        this.$emit('input', +this.valueInput.replace(' ', ''));
      }
    },
  },
};
</script>
