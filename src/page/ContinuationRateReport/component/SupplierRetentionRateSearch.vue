<template>
  <div>
    <div class="SupplierRetentionRate">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="月继续率" name="first">
          <div class="first">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-select v-model="form.region" placeholder="机构">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker type="date" placeholder="年度" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.region" placeholder="月份">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">计算</el-button>
              </el-form-item>
            </el-form>

          </div>
          <div class="first_table">
            <el-table :data="tableData_1" style="width: 100%">
              <el-table-column prop="premiums_receivable" label="应收保费" width="180"></el-table-column>
              <el-table-column prop="premiums_receivable_shi" label="实收保费" width="180"></el-table-column>
              <el-table-column prop="continue_rate" label="继续率"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="季继续率" name="second">
          <div class="first">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-select v-model="form.region" placeholder="机构">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker type="date" placeholder="年度" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.region" placeholder="月份">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">计算</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="first_table">
            <el-table :data="tableData_1" style="width: 100%">
              <el-table-column prop="premiums_receivable" label="应收保费" width="180"></el-table-column>
              <el-table-column prop="premiums_receivable_shi" label="实收保费" width="180"></el-table-column>
              <el-table-column prop="continue_rate" label="继续率"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="年继续率" name="third">
          <div class="first">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <el-select v-model="form.region" placeholder="机构">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker type="date" placeholder="年度" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.region" placeholder="月份">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">计算</el-button>
              </el-form-item>
            </el-form>

          </div>
          <div class="first_table">
            <el-table :data="tableData_1" style="width: 100%">
              <el-table-column prop="premiums_receivable" label="应收保费" width="180"></el-table-column>
              <el-table-column prop="premiums_receivable_shi" label="实收保费" width="180"></el-table-column>
              <el-table-column prop="continue_rate" label="继续率"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!--        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import {apiCompanyRetentionRateSearch} from "../../../request/api";
    export default {
        name: "SupplierRetentionRateSearch",
        data() {
            return{
                activeName: '',
                form: {
                    name: '',
                    date1: ''
                },
                tableData_1: [],

            }
        },
        created() {
            apiCompanyRetentionRateSearch().then(res => {
                this.tableData_1 = res.Data;
            })
        }
    }
</script>

<style scoped>
.SupplierRetentionRate{
  width: 100%;
  min-height: 300px;
  /*background-color: red;*/
}
.first >>> .el-form{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  /*background-color: red;*/
}
.first_table{
  margin-top: 50px;
}
</style>