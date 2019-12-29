<template>
  <div>
    <div class="InstitutionalExpensesAdd">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row_3">
          <el-form-item label="供应商">
            <el-select v-model="form.supplierName" placeholder="供应商简称">
              <el-option v-for="(item, index) in supplierName" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-button" label="产品名称">
            <el-select v-model="form.productName" placeholder="请选择">
              <el-option v-for="(item, index) in productName" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品代码">
            <el-input v-model="form.productID" placeholder="请输入产品代码"></el-input>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="渠道政策">
            <el-select v-model="form.channel_policy" placeholder="请选择">
              <el-option v-for="(item, index) in channel_policy" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用对象">
            <el-input v-model="form.applicable_objects" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="请选择" v-model="form.startTime"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
        <div class="row_3">
          <el-form-item label="合同结束时间">
            <el-date-picker type="date" placeholder="请选择" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="费用类型">
            <el-select v-model="form.cost_type" placeholder="请选择">
              <el-option v-for="(item, index) in cost_type" :label="item" :key="index" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销量统计方式">
            <el-select v-model="form.sales_statistics" placeholder="请选择">
              <el-option v-for="(item, index) in sales_statistics" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-tabs v-model="form.card_num" type="card" @tab-click="handleClick">
          <el-tab-pane label="模版一">
            <div class="mobanyi_button">
              <el-form-item label="添加奖励">
                <el-input v-model="reward_input"></el-input>
                <el-button type="primary" @click="addReward">确定</el-button>
              </el-form-item>
              <el-tag v-for="(tag, index) in tags" :key="index" closable :type="tag" @close="handleClose(tag)">
                {{tag}}
              </el-tag>
            </div>
            <div class="reward_table">
              <div class="reward_table_th">
                <div>交费期间</div>
                <div>第一年度佣金</div>
                <div>第二年度佣金</div>
                <div>第三年度佣金</div>
                <div>第四年度佣金</div>
                <div>第五年度佣金</div>
                <div>第六年度以上佣金</div>
                <div v-for="(item, index) in tags" :key="index">{{item}}</div>
              </div>
              <div v-for="(item, index) in form.mobanyi_table1" class="reward_table_th" :key="index">
                <div>{{item.during_period_fee}}</div>
                <div><input type="text" v-model="form.mobanyi_table1[index].first"/>%</div>
                <div><input type="text" v-model="form.mobanyi_table1[index].second"/>%</div>
                <div><input type="text" v-model="form.mobanyi_table1[index].third"/>%</div>
                <div><input type="text" v-model="form.mobanyi_table1[index].fourth"/>%</div>
                <div><input type="text" v-model="form.mobanyi_table1[index].fifth"/>%</div>
                <div><input type="text" v-model="form.mobanyi_table1[index].sixth"/>%</div>

                <div v-for="(item, index) in tags" :key="index"><input type="text"/>%</div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="模版二">
            <div class="moban2_param">
              <el-form-item label="行数">
                <el-input v-model="moban2_hang"></el-input>
                <el-button type="primary" @click="createMoBan2_hang">确定</el-button>
              </el-form-item>
              <el-form-item label="奖励方式">
                <el-select v-model="form.reward_way">
                  <el-option v-for="(item, index) in reward_way" :label="item" :value="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="moban2_table">
              <div class="moban2_th">
                <div>继续率R</div>
                <div>继续月奖金率R13</div>
                <div>继续月奖金率R25</div>
                <div>继续月奖金率R37</div>
                <div>继续月奖金率R49</div>
              </div>
              <div class="moban2_th" v-for="(item, index) in moban2_hang_array" :key="index">
                <div><input type="text" />%大于等于p小于 <input type="text" />%</div>
                <div><input type="text" />元</div>
                <div><input type="text" />元</div>
                <div><input type="text" />元</div>
                <div><input type="text" />元</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模版三">
            <div class="moban2_param">
              <el-form-item label="行数">
                <el-input v-model="moban2_hang"></el-input>
                <el-button type="primary" @click="createMoBan2_hang">确定</el-button>
              </el-form-item>
              <el-form-item label="奖励方式">
                <el-select v-model="form.reward_way">
                  <el-option v-for="(item, index) in reward_way" :label="item" :value="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="moban2_table">
              <div class="moban2_th">
                <div>承保业绩p(元)</div>
                <div>继续月奖金率R13</div>
                <div>继续月奖金率R25</div>
                <div>继续月奖金率R37</div>
                <div>继续月奖金率R49</div>
              </div>
              <div class="moban2_th" v-for="(item, index) in moban2_hang_array" :key="index">
                <div><input type="text" />大于等于p小于 <input type="text" /></div>
                <div><input type="text" />%</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模版四">
            <div class="moban2_param">
              <el-form-item label="行数">
                <el-input v-model="moban2_hang"></el-input>
                <el-button type="primary" @click="createMoBan2_hang">确定</el-button>
              </el-form-item>
              <el-form-item label="奖励方式">
                <el-select v-model="form.reward_way">
                  <el-option v-for="(item, index) in reward_way" :label="item" :value="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="moban2_table">
              <div class="moban2_th">
                <div>承保业绩p(元)</div>
                <div>比例</div>
              </div>
              <div class="moban2_th" v-for="(item, index) in moban2_hang_array" :key="index">
                <div><input type="text" />大于等于p小于 <input type="text" /></div>
                <div><input type="text" />%</div>
              </div>
            </div>
          </el-tab-pane>
          <div class="search">
            <el-form-item label="机构类型">
              <el-select v-model="form_table.body_type" placeholder="请选择">
                <el-option v-for="(item, index) in body_type" :label="item" :value="item" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input v-model="form_table.body_name"></el-input>
            </el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </div>
          <div class="DownstreamFoldingAdd_table">
            <el-table :data="add_data" style="width: 100%">
              <el-table-column prop="id" label="序号"></el-table-column>
              <el-table-column prop="body_type" label="机构类型"></el-table-column>
              <el-table-column prop="body_type" label="机构名称"></el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="deleteInstitutions(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tabs>
        <el-form-item class="InstitutionalExpensesAdd_buttom">
          <el-button type="primary" @click="saveData">保存/提交</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {
        apiInstitutionalExpensesParam,
        apiInstitutionalExpensesSave,
        apiInstitutionsQuery,
        apiInstitutionsDelete,
    } from "../../../request/api";

    export default {
        name: "InstitutionalExpensesAdd",
        data() {
            return {
                form: {
                    reward_way: '',
                    supplierName: '',
                    productName: '',
                    productID: '',
                    channel_policy: '',
                    applicable_objects: '',
                    startTime: '',
                    endTime: '',
                    cost_type: '',
                    sales_statistics: '',
                    mobanyi_table1: [
                        {
                            'during_period_fee': '泵交',
                            'first': '',
                            'second': '',
                            'third': '',
                            'fourth': '',
                            'fifth': '',
                            'sixth': ''
                        },
                        {
                            'during_period_fee': '3年交',
                            'first': '',
                            'second': '',
                            'third': '',
                            'fourth': '',
                            'fifth': '',
                            'sixth': ''
                        },
                        {
                            'during_period_fee': '5年交',
                            'first': '',
                            'second': '',
                            'third': '',
                            'fourth': '',
                            'fifth': '',
                            'sixth': ''
                        },
                        {
                            'during_period_fee': '10年交',
                            'first': '',
                            'second': '',
                            'third': '',
                            'fourth': '',
                            'fifth': '',
                            'sixth': ''
                        },
                        {
                            'during_period_fee': '15年交',
                            'first': '',
                            'second': '',
                            'third': '',
                            'fourth': '',
                            'fifth': '',
                            'sixth': ''
                        },
                        {
                            'during_period_fee': '20年交',
                            'first': '',
                            'second': '',
                            'third': '',
                            'fourth': '',
                            'fifth': '',
                            'sixth': ''
                        },
                    ],
                },
                form_table: {
                    'body_type': '',
                    'body_name': ''
                },
                table1Data: ['0', '1', '2'],
                showAddAgency: false,
                add_data: [],

                card_num:'moban1',
                moban2_hang: 0,
                moban2_hang_array: [],
                supplierName: [],
                productName: [],
                channel_policy: [],
                cost_type: [],
                sales_statistics: [],
                reward_input: '',//添加奖励的input
                tags: [],//添加奖励的存储数组
                body_type: [],//机构类型
                reward_way: [],//奖励方式
            }
        },
        methods: {
            handleClick(val) {
                this.card_num  =val;
                // window.console.log(val.label)
            },
            createMoBan2_hang() {
                this.moban2_hang_array = [];
                for (let i=1; i<=this.moban2_hang; i++){
                    this.moban2_hang_array.push('');
                }
            },
            deleteInstitutions(row) {
                apiInstitutionsDelete(this.form_table).then(res => {
                    if (res.StatusCode === 200) {
                        alert('删除成功')
                    }
                });
                window.console.log(row)
            },
            queryData() {
                apiInstitutionsQuery(this.form_table).then(res => {
                    this.add_data = res.Data;
                    window.console.log(res);
                })
            },
            saveData() {
                apiInstitutionalExpensesSave(this.form).then(res => {
                    if (res.StatusCode === 200) {
                        alert('您的数据已被保存')
                    }
                    window.console.log(res);
                })
            },
            handleClose(tag) {
                let tagIndex = 0;
                this.tags.forEach((item, index) => {
                    if (item === tag) {
                        tagIndex = index;
                    }
                });
                this.tags.splice(tagIndex, 1);
                this.form.mobanyi_table1.forEach((item, index) => {
                    delete this.form.mobanyi_table1[index][tag];
                });
            },
            addReward() {//添加奖励
                let isExist = false;
                for (let i = 0; i < this.tags.length; i++) {
                    if (this.reward_input === this.tags[i]) {
                        isExist = true;
                    }
                }
                if (!isExist) {
                    this.tags.push(this.reward_input);
                    this.form.mobanyi_table1.forEach((item, index) => {
                        this.form.mobanyi_table1[index][this.reward_input] = '';
                    });
                    this.reward_input = '';
                }
            },
            hideAddAgency() {
                this.showAddAgency = false;
            }
        },
        created() {
            apiInstitutionalExpensesParam().then(res => {
                this.supplierName = res.Data.supplierName;
                let product_name = res.Data.product_name;
                product_name.forEach(item => {
                    this.productName.push(item.productName);
                });
                this.channel_policy = res.Data.channel_policy;
                this.cost_type = res.Data.cost_type;
                this.sales_statistics = res.Data.sales_statistics;
                this.body_type = res.Data.body_type;
                this.reward_way  =res.Data.reward_way;
                window.console.log(res);
            })
        }
    }
</script>

<style scoped>
  .moban2_table{
    width: 100%;
    min-height: 300px;
    border: 1px solid #999;
  }
  .moban2_th{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
  }
  .moban2_th div{
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #999;
  }
  .moban2_param{
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .moban2_param .el-form-item{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .moban2_param .el-form-item >>> .el-form-item__content{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .reward_table {
    width: 100%;
    min-height: 300px;
    border: 1px solid #999;
  }

  .reward_table_th {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .reward_table_th div {
    width: 100%;
    font-size: 14px;
    color: #999999;
  }

  .mobanyi_button {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /*background-color: red;*/
    padding-left: 30px;
    box-sizing: border-box;
    margin: 20px 0 40px;
  }

  .mobanyi_button .el-tag {
    margin-left: 30px;
  }

  .mobanyi_button >>> .el-form-item {
    display: flex;
    justify-content: flex-start;
  }

  .mobanyi_button >>> .el-form-item .el-form-item__content {
    display: flex;
    justify-content: flex-start;
  }

  .InstitutionalExpensesAdd {
    width: 100%;
    min-height: 300px;
    /*background-color: red;*/
  }

  .row_3 {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .row_3 .el-form-item {
    width: 33.33%;
  }

  .row_3 .el-form-item .el-form-item__content {
    width: 100%;
  }

  .row_3 .el-form-item .el-form-item__content .el-select,
  .row_3 .el-form-item .el-form-item__content .el-input {
    width: 100%;
  }

  .search {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin: 20px 0 30px;
  }

  .DownstreamFoldingAdd_table {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .InstitutionalExpensesAdd_buttom {
    width: 100%;
    height: 409px;
    margin-top: 40px;
    margin-bottom: 50px;
  }
</style>