<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>

    <div class="data-table__main content">
      <div class="data-table__header">
        <div
          v-for="field in columns"
          :key=field.prop
          :style="'width:' + field.width"
          class="data-table__col-header"
        >
          {{ field.label }}
        </div>
      </div>
      <div
        v-for="item in dataPaginated"
        :key=item.id
      >
        <div class="data-table__row">
          <div class="data-table__col-row" :style="'width:' + widthCol('id')">
            <div class="data-table__col-name-row">ID</div>
            {{ item.id }}
          </div>
          <div class="data-table__col-row" :style="'width:' + widthCol('date')">
            <div class="data-table__col-name-row">Date</div>
            {{ formationDate(item.date) }}
          </div>
          <div class="data-table__col-row" :style="'width:' + widthCol('name')">
            <div class="data-table__col-name-row">Name</div>
            {{ item.name }}
          </div>
          <div class="data-table__col-row" :style="'width:' + widthCol('money')">
            <div class="data-table__col-name-row">Money</div>
            {{ formationMoney(item.money) }}
          </div>
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import DateModel from '@/models/DateModel';
import NumberModel from '@/models/NumberModel';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: undefined,
  }),

  computed: {
    dataFilter() {
      return +this.moneyFilter >= 0 ? this.rows.filter((item) => +item.money <= +this.moneyFilter) : this.rows;
    },
    dataPaginated() {
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.dataFilter.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.dataFilter.length / this.pageSize);
    },
  },
  methods: {
    formationDate(value) {
      return DateModel.formationDate(value);
    },
    formationMoney(value) {
      return NumberModel.separation(value);
    },
    widthCol(nameProp) {
      return this.columns.find((column) => column.prop === nameProp)?.width || 0;
    },
  },
};
</script>
