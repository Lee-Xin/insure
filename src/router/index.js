import Vue from "vue";
import Router from "vue-router";
// import store from '../store'
// import store from "../store";

// import Login from '@/page/login'
import Index from "@/page/index";
//  供应商管理   SupplierManagerment
import ProductList from "@/page/SupplierManagement/ProductList";
import SupplierList from "@/page/SupplierManagement/SupplierList";
import NewSupplier from "@/page/SupplierManagement/page/NewSupplier";
import newProduct from "@/page/SupplierManagement/page/NewProduct";
//  员工管理    WorkerManagement
import DeskList from "@/page/WorkerManagement/DeskList";
import InsuranceMarketer from "@/page/WorkerManagement/InsuranceMarketer";
import MarketerList from "@/page/WorkerManagement/MarketerList";
import MarketingStaffRank from "@/page/WorkerManagement/MarketingStaffRank";
import OrganisationalStructure from "@/page/WorkerManagement/OrganisationalStructure";
//  机构管理    OrganizationManagement
import OrganizationList from "@/page/OrganizationManagement/OrganizationList";
import OrganizatonNew from "@/page/OrganizationManagement/page/NewOrganization";
import OrganizationClassif from "@/page/OrganizationManagement/OrganizationClassif";
//  上游政策    UpstreamPolicy
import ContinuationRateBonus from "@/page/UpstreamPolicy/ContinuationRateBonus";
import NewIncentives from "@/page/UpstreamPolicy/NewIncentives";
import QuarterlyPromotionAward from "@/page/UpstreamPolicy/QuarterlyPromotionAward";
import RenewalOfServiceAllowance from "@/page/UpstreamPolicy/RenewalOfServiceAllowance";
import UpstreamFolding from "@/page/UpstreamPolicy/UpstreamFolding";
//  下游政策    DownstreamPolicy
import AgentFees from "@/page/DownstreamPolicy/AgentFees";
import DownstreamFolding from "@/page/DownstreamPolicy/DownstreamFolding";
import InstitutionalExpenses from "@/page/DownstreamPolicy/InstitutionalExpenses";
import SalesExpenses from "@/page/DownstreamPolicy/SalesExpenses";
//  报单中心    PolicyCenter
import DeclarationList from "@/page/PolicyCenter/DeclarationList";
//  基本法管理   BasicLawAdministration',
import AttendanceManagement from "@/page/BasicLawAdministration/AttendanceManagement";
import BasicLawAdministration from "@/page/BasicLawAdministration/BasicLawAdministration";
import Deduction from "@/page/BasicLawAdministration/Deduction";
import NewBasicLaw from "@/page/BasicLawAdministration/NewBasicLaw";
import PromotionAssessment from "@/page/BasicLawAdministration/PromotionAssessment";
import RenewalData from "@/page/BasicLawAdministration/RenewalData";
import SalarySettlement from "@/page/BasicLawAdministration/SalarySettlement";
//  继续率报表   ContinuationRateReport
import CompanyRetentionRate from "@/page/ContinuationRateReport/CompanyRetentionRate";
import InstitutionContinuationRate from "@/page/ContinuationRateReport/InstitutionContinuationRate";
import PersonalContinuationRate from "@/page/ContinuationRateReport/PersonalContinuationRate";
import SupplierRetentionRate from "@/page/ContinuationRateReport/SupplierRetentionRate";
import TeamRetentionRate from "@/page/ContinuationRateReport/TeamRetentionRate";
//  统计管理    StatisticalManagement
import AgencyPremium from "@/page/StatisticalManagement/AgencyPremium";
import BusinessStatement from "@/page/StatisticalManagement/BusinessStatement";
import CapacityStatement from "@/page/StatisticalManagement/CapacityStatement";
import DirectTeamReport from "@/page/StatisticalManagement/DirectTeamReport";
import LifelineReport from "@/page/StatisticalManagement/LifelineReport";
import ManpowerReport from "@/page/StatisticalManagement/ManpowerReport";
import NumberReport from "@/page/StatisticalManagement/NumberReport";
import PersonalAdditionStatement from "@/page/StatisticalManagement/PersonalAdditionStatement";
import PremiumStatement from "@/page/StatisticalManagement/PremiumStatement";
import ProductStructureReport from "@/page/StatisticalManagement/ProductStructureReport";
import SupplierPremium from "@/page/StatisticalManagement/SupplierPremium";
import TargetConfiguration from "@/page/StatisticalManagement/TargetConfiguration";
import TargetProgressTracking from "@/page/StatisticalManagement/TargetProgressTracking";
import TeamGrowthReport from "@/page/StatisticalManagement/TeamGrowthReport";
//   课堂管理   ClassManagement
import HeadlineNews from "@/page/ClassManagement/HeadlineNews";
import MyCollege from "@/page/ClassManagement/MyCollege";
//   理赔管理   ClaimsManagement
import ClaimsKnowledge from "@/page/ClaimsManagement/ClaimsKnowledge";
import ClaimsList from "@/page/ClaimsManagement/ClaimsList";
import ClaimsTool from "@/page/ClaimsManagement/ClaimsTool";
import ClassificationOfKnowledge from "@/page/ClaimsManagement/ClassificationOfKnowledge";
import ContinuousClaims from "@/page/ClaimsManagement/ContinuousClaims";
//   APP首页管理 APPIndexManagment
import APPHomepageModule from "@/page/APPIndexManagment/APPHomepageModule";
import APPConfig from "@/page/APPIndexManagment/AppConfig";
import AutoguardHomepageModule from "@/page/APPIndexManagment/AutoguardHomepageModule";
import ExhibitionTools from "@/page/APPIndexManagment/ExhibitionTools";
import MyMessage from "@/page/APPIndexManagment/MyMessage";
import NewProductRecommendation from "@/page/APPIndexManagment/NewProductRecommendation";
import RecommendedProducts from "@/page/APPIndexManagment/RecommendedProducts";
import RecommendedProductsDetail from "@/page/APPIndexManagment/RecommendedProductsDetail";
import TopRecommendations from "@/page/APPIndexManagment/TopRecommendations";
//   账户管理   AccountManagement
import InsideStaffAccount from "@/page/AccountManagement/InsideStaffAccount";
import InstitutionalAccount from "@/page/AccountManagement/InstitutionalAccount";
import PermissionList from "@/page/AccountManagement/PermissionList";
//   账号设置   AccountIDManagement
import AccountDetails from "@/page/AccountIDManagement/AccountDetails";
import HeadSet from "@/page/AccountIDManagement/HeadSet";
import PasswordReset from "@/page/AccountIDManagement/PasswordReset";
import addHeadlineNews from "@/page/ClassManagement/addHeadlineNews.vue";
import editHeadlineNews from "@/page/ClassManagement/editHeadlineNews.vue";
import addMyCollege from "@/page/ClassManagement/addMyCollege.vue";
import editMyCollege from "@/page/ClassManagement/editMyCollege.vue";
import addClaims from "@/page/ClaimsManagement/addClaims.vue";
import addClaimsKnowledge from "@/page/ClaimsManagement/addClaimsKnowledge.vue";
import addContinuousClaims from "@/page/ClaimsManagement/addContinuousClaims.vue";
import editClaims from "@/page/ClaimsManagement/editClaims.vue";
import editClaimsKnowledge from "@/page/ClaimsManagement/editClaimsKnowledge.vue";
import editContinuousClaims from "@/page/ClaimsManagement/editContinuousClaims.vue";
import addPermissionList from "@/page/AccountManagement/addPermissionList.vue";
import editPermissionList from "@/page/AccountManagement/editPermissionList.vue";
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/", //进入默认路由
            redirect: "/Index" //默认路由
        },
        {
            path: "/Index",
            name: "Index",
            component: Index,
            meta: {
                title: "承保业绩统计"
            }
        },
        //  供应商管理
        {
            path: "/product_list",
            name: "product_list",
            component: ProductList,
            meta: {
                title: "产品列表",
                subTitle: "这是产品列表页面"
            }
        },
        {
            path: "/supplier_list",
            name: "supplier_list",
            component: SupplierList,
            meta: {
                title: "供应商一览表",
                subTitle: "Insurance Supplier List"
            }
        },
        {
            path: "/new_supplier",
            name: "new_supplier",
            component: NewSupplier,
            meta: {
                title: "供应商管理",
                subTitle: "这是供应商管理页面"
            }
        },
        {
            path: "/new_product",
            name: "new_product",
            component: newProduct,
            meta: {
                title: "产品添加",
                subTitle: "这是产品添加页面"
            }
        },
        //  员工管理
        {
            path: "/desk_list",
            name: "desk_list",
            component: DeskList
        },
        {
            path: "/insurance_marketer",
            name: "insurance_marketer",
            component: InsuranceMarketer
        },
        {
            path: "/marketer_list",
            name: "marketer_list",
            component: MarketerList
        },
        {
            path: "/marketing_staff_rank",
            name: "marketing_staff_rank",
            component: MarketingStaffRank
        },
        {
            path: "/organisational_structure",
            name: "organisational_structure",
            component: OrganisationalStructure
        },
        //  机构管理    OrganizationManagement
        {
            path: "/organization_list",
            name: "organization_list",
            component: OrganizationList,
            meta: {
                title: "机构管理",
                subTitle: "欢迎您使用机构管理页面"
            }
        },
        {
            path: "/organization_list/new",
            name: "oranization_new",
            component: OrganizatonNew,
            meta: {
                title: "机构管理",
                subTitle: "欢迎您使用新增机构页面"
            }
        },
        {
            path: "/organization_classif",
            name: "organization_classif",
            component: OrganizationClassif,
            meta: {
                title: "机构分类",
                subTitle: "欢迎您使用机构分类页面"
            }
        },
        //  上游政策    UpstreamPolicy
        {
            path: "/continuation_rate_bonus",
            name: "continuation_rate_bonus",
            component: ContinuationRateBonus,
            meta: {
                title: '继续率奖金',
                subTitle: '这是继续率奖金页面'
            }
        },
        {
            path: "/new_incentives",
            name: "new_incentives",
            component: NewIncentives,
            meta: {
                title: '新增奖励',
                subTitle: '这是新增奖励页面'
            }
        },
        {
            path: "/quarterly_promotion_award",
            name: "quarterly_promotion_award",
            component: QuarterlyPromotionAward
        },
        {
            path: "/renewal_of_service_allowance",
            name: "renewal_of_service_allowance",
            component: RenewalOfServiceAllowance
        },
        {
            path: "/upstream_folding",
            name: "upstream_folding",
            component: UpstreamFolding,
            meta: {
                title: "上游折标",
                subTitle: "这是上游折标页面"
            }
        },
        //  下游政策    DownstreamPolicy
        {
            path: "/agent_fees",
            name: "agent_fees",
            component: AgentFees
        },
        {
            path: "/downstream_folding",
            name: "downstream_folding",
            component: DownstreamFolding
        },
        {
            path: "/institutional_expenses",
            name: "institutional_expenses",
            component: InstitutionalExpenses
        },
        {
            path: "/sales_expenses",
            name: "sales_expenses",
            component: SalesExpenses
        },
        //  报单中心    PolicyCenter
        {
            path: "/declaration_list",
            name: "declaration_list",
            component: DeclarationList
        },
        //  基本法管理   BasicLawAdministration
        {
            path: "/attendance_management",
            name: "attendance_management",
            component: AttendanceManagement
        },
        {
            path: "/basic_law_administration",
            name: "basic_law_administration",
            component: BasicLawAdministration
        },
        {
            path: "/deduction",
            name: "deduction",
            component: Deduction
        },
        {
            path: "/new_basic_law",
            name: "new_basic_law",
            component: NewBasicLaw
        },
        {
            path: "/promotion_assessment",
            name: "promotion_assessment",
            component: PromotionAssessment
        },
        {
            path: "/renewal_data",
            name: "renewal_data",
            component: RenewalData
        },
        {
            path: "/salary_settlement",
            name: "salary_settlement",
            component: SalarySettlement
        },
        //  继续率报表   ContinuationRateReport
        {
            path: "/company_retention_rate",
            name: "company_retention_rate",
            component: CompanyRetentionRate
        },
        {
            path: "/institution_continuation_rate",
            name: "institution_continuation_rate",
            component: InstitutionContinuationRate
        },
        {
            path: "/personal_continuation_rate",
            name: "personal_continuation_rate",
            component: PersonalContinuationRate
        },
        {
            path: "/supplier_retention_rate",
            name: "supplier_retention_rate",
            component: SupplierRetentionRate
        },
        {
            path: "/team_retention_rate",
            name: "team_retention_rate",
            component: TeamRetentionRate
        },
        //  统计管理    StatisticalManagement
        {
            path: "/agency_premium",
            name: "agency_premium",
            component: AgencyPremium,
            meta: {
                title: "机构保费",
                subTitle: "这是机构保费页面"
            }
        },
        {
            path: "/business_statement",
            name: "business_statement",
            component: BusinessStatement,
            meta: {
                title: "业务报表",
                subTitle: "这是业务报表页面"
            }
        },
        {
            path: "/capacity_statement",
            name: "capacity_statement",
            component: CapacityStatement,
            meta: {
                title: "产能报表",
                subTitle: "这是产能报表页面"
            }
        },
        {
            path: "/direct_team_report",
            name: "direct_team_report",
            component: DirectTeamReport,
            meta: {
                title: "直辖团队报表",
                subTitle: "这是直辖团队报表页面"
            }
        },
        {
            path: "/lifeline_report",
            name: "lifeline_report",
            component: LifelineReport,
            meta: {
                title: "生命线报表",
                subTitle: "这是生命线报表页面"
            }
        },
        {
            path: "/manpower_report",
            name: "manpower_report",
            component: ManpowerReport,
            meta: {
                title: "人力报表",
                subTitle: "这是人力报表页面"
            }
        },
        {
            path: "/number_report",
            name: "number_report",
            component: NumberReport,
            meta: {
                title: "件数报表",
                subTitle: "这是件数报表页面"
            }
        },
        {
            path: "/personal_addition_statement",
            name: "personal_addition_statement",
            component: PersonalAdditionStatement,
            meta: {
                title: "个人增员报表",
                subTitle: "这是个人增员报表页面"
            }
        },
        {
            path: "/premium_statement",
            name: "premium_statement",
            component: PremiumStatement,
            meta: {
                title: "保费报表",
                subTitle: "这是保费报表页面"
            }
        },
        {
            path: "/product_structure_report",
            name: "product_structure_report",
            component: ProductStructureReport,
            meta: {
                title: "产品结构报表",
                subTitle: "这是产品结构报表页面"
            }
        },
        {
            path: "/supplier_premium",
            name: "supplier_premium",
            component: SupplierPremium,
            meta: {
                title: "供应商保费",
                subTitle: "这是供应商保费页面"
            }
        },
        {
            path: "/target_configuration",
            name: "target_configuration",
            component: TargetConfiguration,
            meta: {
                title: "目标配置",
                subTitle: "这是目标配置页面"
            }
        },
        {
            path: "/target_progress_tracking",
            name: "target_progress_tracking",
            component: TargetProgressTracking,
            meta: {
                title: "目标进度追踪",
                subTitle: "这是目标进度追踪页面"
            }
        },
        {
            path: "/team_growth_report",
            name: "team_growth_report",
            component: TeamGrowthReport,
            meta: {
                title: "团队增员报表",
                subTitle: "这是团队增员报表页面"
            }
        },
        //   课堂管理   ClassManagement
        {
            path: "/headline_news",
            name: "headline_news",
            component: HeadlineNews,
            meta: {
                title: "头条管理",
                subTitle: "这是头条管理页面"
            }
        },
        {
            path: "/add_headline_news",
            name: "add_headline_news",
            component: addHeadlineNews,
            meta: {
                title: "新增头条",
                subTitle: "这是新增头条页面"
            }
        },
        {
            path: "/edit_headline_news",
            name: "edit_headline_news",
            component: editHeadlineNews,
            meta: {
                title: "编辑头条",
                subTitle: "这是编辑头条页面"
            }
        },
        {
            path: "/my_college",
            name: "my_college",
            component: MyCollege,
            meta: {
                title: "课堂管理",
                subTitle: "这是课堂管理页面"
            }
        },
        {
            path: "/add_my_college",
            name: "add_my_college",
            component: addMyCollege,
            meta: {
                title: "新增课堂",
                subTitle: "这是新增课堂页面"
            }
        },
        {
            path: "/edit_my_college",
            name: "edit_my_college",
            component: editMyCollege,
            meta: {
                title: "编辑课堂",
                subTitle: "这是编辑课堂页面"
            }
        },
        //   理赔管理   ClaimsManagement
        {
            path: "/claims_knowledge",
            name: "claims_knowledge",
            component: ClaimsKnowledge,
            meta: {
                title: "理赔管理",
                subTitle: "这是理赔管理页面"
            }
        },
        {
            path: "/add_claims_knowledge",
            name: "add_claims_knowledge",
            component: addClaimsKnowledge,
            meta: {
                title: "新增理赔",
                subTitle: "这是新增理赔页面"
            }
        },
        {
            path: "/edit_claims_knowledge",
            name: "edit_claims_knowledge",
            component: editClaimsKnowledge,
            meta: {
                title: "编辑理赔",
                subTitle: "这是编辑理赔页面"
            }
        },
        {
            path: "/claims_list",
            name: "claims_list",
            component: ClaimsList,
            meta: {
                title: "理赔列表",
                subTitle: "这是理赔列表页面"
            }
        },
        {
            path: "/add_claims",
            name: "add_claims",
            component: addClaims,
            meta: {
                title: "新增理赔",
                subTitle: "这是新增理赔页面"
            }
        },
        {
            path: "/edit_claims",
            name: "edit_claims",
            component: editClaims,
            meta: {
                title: "编辑理赔",
                subTitle: "这是编辑理赔页面"
            }
        },
        {
            path: "/claims_tool",
            name: "claims_tool",
            component: ClaimsTool,
            meta: {
                title: "理赔工具",
                subTitle: "这是理赔工具页面"
            }
        },
        {
            path: "/classification_of_knowledge",
            name: "classification_of_knowledge",
            component: ClassificationOfKnowledge,
            meta: {
                title: "理赔分类",
                subTitle: "这是理赔分类页面"
            }
        },
        {
            path: "/continuous_claims",
            name: "continuous_claims",
            component: ContinuousClaims,
            meta: {
                title: "连接理赔",
                subTitle: "这是连接理赔页面"
            }
        },
        {
            path: "/add_continuous_claims",
            name: "add_continuous_claims",
            component: addContinuousClaims,
            meta: {
                title: "新增连接理赔",
                subTitle: "这是新增连接理赔页面"
            }
        },
        {
            path: "/edit_continuous_claims",
            name: "edit_continuous_claims",
            component: editContinuousClaims,
            meta: {
                title: "编辑连接理赔",
                subTitle: "这是编辑连接理赔页面"
            }
        },
        //   APP首页管理 APPIndexManagment
        {
            path: "/app_homepage_module",
            name: "app_homepage_module",
            component: APPHomepageModule,
            meta: {
                title: "app首页管理",
                subTitle: "这是app首页管理页面"
            }
        },
        {
            path: "/autoguard_homepage_module",
            name: "autoguard_homepage_module",
            component: AutoguardHomepageModule,
            meta: {
                title: "快保首页管理",
                subTitle: "这是快保首页管理页面"
            }
        },
        {
            path: "/app_homepage_config",
            name: "app_homepage_config",
            component: APPConfig,
            meta: {
                title: "app首页配置",
                subTitle: "这是app首页配置页面"
            }
        },
        {
            path: "/exhibition_tools",
            name: "exhibition_tools",
            component: ExhibitionTools
        },
        {
            path: "/my_message",
            name: "my_message",
            component: MyMessage,
            meta: {
                title: "我的消息",
                subTitle: "这是我的消息页面"
            }
        },
        {
            path: "/new_product_recommendation",
            name: "new_product_recommendation",
            component: NewProductRecommendation
        },
        {
            path: "/recommended_products",
            name: "recommended_products",
            component: RecommendedProducts,
            meta: {
                title: "保库管理",
                subTitle: "这是保库管理页面"
            }
        },
        {
            path: "/recommended_products_detail",
            name: "recommended_products_detail",
            component: RecommendedProductsDetail,
            meta: {
                title: "产品特色管理",
                subTitle: "这是产品特色管理页面"
            }
        },
        {
            path: "/top_recommendations",
            name: "top_recommendations",
            component: TopRecommendations
        },
        //   账户管理   AccountManagement
        {
            path: "/inside_staff_account",
            name: "inside_staff_account",
            component: InsideStaffAccount,
            meta: {
                title: "内勤人员账号",
                subTitle: "这是内勤人员账号页面"
            }
        },
        {
            path: "/institutional_account",
            name: "institutional_account",
            component: InstitutionalAccount,
            meta: {
                title: "机构账号",
                subTitle: "这是机构账号页面"
            }
        },
        {
            path: "/permission_list",
            name: "permission_list",
            component: PermissionList,
            meta: {
                title: "策略组设置",
                subTitle: "这是策略组设置页面"
            }
        },
        {
            path: "/add_permission_list",
            name: "add_permission_list",
            component: addPermissionList,
            meta: {
                title: "添加策略组",
                subTitle: "这是添加策略组页面"
            }
        },
        {
            path: "/edit_permission_list",
            name: "edit_permission_list",
            component: editPermissionList,
            meta: {
                title: "编辑策略组",
                subTitle: "这是编辑策略组页面"
            }
        },
        //   账号设置   AccountIDManagement
        {
            path: "/account_details",
            name: "account_details",
            component: AccountDetails,
            meta: {
                title: "账号详情",
                subTitle: "这是账号详情页面"
            }
        },
        {
            path: "/head_set",
            name: "head_set",
            component: HeadSet,
            meta: {
                title: "账户设置",
                subTitle: "这是账户设置页面"
            }
        },
        {
            path: "/password_reset",
            name: "password_reset",
            component: PasswordReset,
            meta: {
                title: "修改密码",
                subTitle: "这是修改密码页面"
            }
        },
        // 404时跳转到Index页面
        {
            path: "/404",
            redirect: "/"
        }
    ]
});
// router.beforeEach((to, from, next) => {
//     const nextRoute = ['Login'];
//
//     let isLogin = store.getters.IS_TOKEN || false;
//
//     window.console.log('isLogin=',isLogin);
//     if (nextRoute.indexOf(to.name) < 0) {
//         if (!isLogin) {
//             window.console.log('跳转到 login');
//             router.push('/Login');
//         }
//     }
//     if (to.name === 'Login') {
//         if (isLogin) {
//             router.push({ name: '/Index' });
//         }
//     }
//     next();
// })

export default router;
