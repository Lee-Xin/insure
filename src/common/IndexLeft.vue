<template>
  <div id="left">
    <el-row class="left_box">
      <el-col :span="12" class="left_box">
        <h5><router-link to="/">首页</router-link></h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <el-submenu :index="index" v-for="(item, index) in nums" :key="index" class="left_box_ul">
            <template slot="title">
              <span>{{index}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="left_box_li"
                v-for="(it, ind) in item"
                :key="ind"
              >
                <router-link class="left_box_link"
                           v-for="(cont, i) in it"
                           :key="i" :to="'/'+cont">
                  {{i}}
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'IndexLeft',
        data() {
            return {
                isCollapse:1,
                nums: {
                    '供应商管理': [{'供应商列表': 'supplier_list'}, {'产品列表': 'product_list'}],
                    '机构管理': [{'机构列表': 'organization_list'}, {'机构分类': 'organization_classif'}],
                    '上游政策': [{'上游折标': 'upstream_folding'}, {'继续率奖金': 'continuation_rate_bonus'}, {'新增奖励': 'new_incentives'},
                        {'续期服务津贴': 'renewal_of_service_allowance'}, {'季度推动奖': 'quarterly_promotion_award'}],
                    '下游政策': [{'下游折标': 'downstream_folding'}, {'机构费用': 'institutional_expenses'}, {'销售费用': 'sales_expenses'},
                        {'代理人费用': 'agent_fees'}],
                    '员工管理': [{'内勤列表': 'desk_list'}, {'营销员列表': 'marketer_list'}, {'营销员职级': 'marketing_staff_rank'},
                        {'组织架构': 'organisational_structure'}, {'应参保营销员': 'insurance_marketer'}],
                    '报单中心': [{'报单列表': 'declaration_list'}],
                    '基本法管理': [{'新增基本法': 'new_basic_law'}, {'基本法管理': "basic_law_administration"},
                        {'续期数据': 'renewal_data'}, {'薪资结算': 'salary_settlement'}, {'晋升考核': 'promotion_assessment'},
                        {'考勤管理': 'attendance_management'}, {'加扣款项': 'deduction'}],
                    '继续率报表': [{'公司继续率': 'company_retention_rate'}, {'机构继续率': 'institution_continuation_rate'},
                        {'供应商继续率': 'supplier_retention_rate'}, {'个人继续率': 'personal_continuation_rate'},
                        {'团队继续率': 'team_retention_rate'}],
                    '统计管理': [{'供应商保费': 'supplier_premium'}, {'机构保费': 'agency_premium'}, {'目标配置': 'target_configuration'},
                        {'人力报表': 'manpower_report'}, {'产能报表': 'capacity_statement'}, {'业务报表': 'business_statement'},
                        {'目标进度追踪': 'target_progress_tracking'}, {'产品结构报表': 'product_structure_report'},
                        {'生命线报表': 'lifeline_report'}, {'件数报表': 'number_report'}, {'保费报表': 'premium_statement'},
                        {'直辖团队报表': 'direct_team_report'}, {'个人增员报表': 'personal_addition_statement'},
                        {'团队增员报表': 'team_growth_report'}],
                    '课堂管理': [{'头条资讯': 'headline_news'}, {'我的学院': 'my_college'}],
                    '理赔管理': [{'理赔知识': 'claims_knowledge'}, {'知识分类': 'classification_of_knowledge'},
                        {'连续理赔': 'continuous_claims'}, {'理赔工具': 'claims_tool'}, {'理赔列表': 'claims_list'}],
                    'APP首页管理': [{'APP首页模块': 'APP_homepage_module'}, {'快保首页模块': 'autoguard_homepage_module'},
                        {'推荐产品': 'recommended_products'}, {'热门推荐': 'top_recommendations'},
                        {'新品推荐': 'new_product_recommendation'}, {'展业工具': 'exhibition_tools'}, {'我的消息': 'my_message'}],
                    '账户管理': [{'权限列表': 'permission_list'}, {'机构账户': 'institutional_account'}, {'内勤人员账户': 'inside_staff_account'}],
                    '账号设置': [{'头像设置': 'head_set'}, {'密码重置': 'password_reset'}, {'账户详情': 'account_details'}]
                },
            }
        }
    }
</script>

<style scoped>
  #left {
    width: 182px;
    height: auto;
    min-height: 1000px;
  }

  .left_box {
    width: 100%;
    color: #fff;
    background-color: #4074e1;
  }

  .left_box_ul {
    font-weight: bold;
    color: #333333;
  }

  .left_box_li {
    color: #999;
  }

  .left_box_link {
    width: 100%;
    height: inherit;
    display: block;
  }

</style>