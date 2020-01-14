<template>
  <div>
    <div class="TargetConfigurationSearch">
      <el-form ref="form" :model="form" class="search_from">
        <el-form-item>
          <div class="cell_before">有效人力</div>
          <el-input v-model="form.people" placeholder="标准保费大于此值"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">绩优人力</div>
          <el-input v-model="form.goodPeople" placeholder="标准保费大于此值"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="cell_before">季度有效人力</div>
          <el-input v-model="form.quarterPeople" placeholder="季度内标准保费大于此值"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveData">保存</el-button>
        </el-form-item>
      </el-form>
      <div class="TargetConfigurationSearch_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="name_institution" label="机构名称"></el-table-column>
          <el-table-column prop="organization_classif_level" label="机构分类级别">
            <template slot-scope="scope">
              <el-select v-model="scope.row.organization_classif_level" filterable>
                <el-option
                  v-for="item in jigouList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="monthly_goals" label="月度目标">
            <template slot-scope="scope">
              <el-input v-model="scope.row.monthly_goals"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lifeline_target" label="生命线目标">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lifeline_target"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiTargetConfigurationSearch,
  apiTargetConfigurationSave,
  getjigoujibie
} from "@/mock/api";
export default {
  name: "TargetConfigurationSearch",
  data() {
    return {
      form: { people: null, goodPeople: null, quarterPeople: null },
      tableData: [],
      jigouList: []
    };
  },
  created() {
    this.getjigoujibieList();
    this.getList();
  },
  methods: {
    getjigoujibieList() {
      getjigoujibie().then(res => {
        this.jigouList = res.Data;
      });
    },
    getList() {
      apiTargetConfigurationSearch(this.form).then(res => {
        this.tableData = res.Data;
      });
    },
    saveData() {
      apiTargetConfigurationSearch({ list: this.tableData }).then(res => {
        this.$message.info(res.Msg);
      });
    }
  }
};
</script>

<style scoped>
.TargetConfigurationSearch {
  width: 100%;
  min-height: 300px;
}
</style>