const productList = [
    {'id':1,'supplier_name':'安盛天平财产保险股份有限公司1','productName':'光大永明海外专项就医综合医疗保险（2018版）','product_niceName':'','supplier_niceName':'光大永明','main_risks_attached':'全部',
    'type': '/全部/全部','product_code':'','pay_way':'','zhonganCode':'','nature_product':'','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'不限'},
    {'id':2,'supplier_name':'安盛天平财产保险股份有限公司2','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/全部/定期寿险','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
    {'id':3,'supplier_name':'安盛天平财产保险股份有限公司3','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'泰康养老','main_risks_attached':'全部',
        'type': '/寿险/全部','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'停售'},
    {'id':4,'supplier_name':'安盛天平财产保险股份有限公司4','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/寿险/定期寿险','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
    {'id':5,'supplier_name':'安盛天平财产保险股份有限公司5','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'百年人寿','main_risks_attached':'全部',
        'type': '/','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'不限'},
    {'id':6,'supplier_name':'安盛天平财产保险股份有限公司6','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
    {'id':7,'supplier_name':'安盛天平财产保险股份有限公司7','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
    {'id':8,'supplier_name':'安盛天平财产保险股份有限公司8','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
    {'id':9,'supplier_name':'安盛天平财产保险股份有限公司9','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
    {'id':10,'supplier_name':'安盛天平财产保险股份有限公司10','productName':'光大永明海外专项就医综合医疗保险（2018版）','supplier_niceName':'光大永明','main_risks_attached':'全部',
        'type': '/','insured_age':'0-60岁','During_period_fee':'1年交','during_period_insurance':'1年','sales_status':'在售'},
];
const productListSearch = {
    'supplier_name': ['泰康人寿保险有限责任公司','光大永明人寿保险有限公司','阳光人寿保险股份有限公司','国华人寿保险股份有限公司'],
    'product_name': [
        {'id':1, 'productName':'泰康康逸人生两全保险','operation':true},
        {'id':2, 'productName':'泰康全能保B款两全保险','operation':true},
        {'id':3, 'productName':'泰康健康人生终身寿险（分红型）','operation':true},
        {'id':4, 'productName':'泰康全能保C款两全保险','operation':true},
        {'id':5, 'productName':'泰康老年恶性肿瘤疾病保险','operation':true},
        {'id':6, 'productName':'泰康如意宝（2014）意外伤害保险','operation':true},
        {'id':7, 'productName':'泰康康悦人生两全保险（分红型）','operation':true},
        {'id':8, 'productName':'泰康吉祥相伴定期寿险','operation':true},
    ],
    'supplier_niceName': ['光大永明','泰康养老','百年人寿'],
    'main_risks_attached': ['全部','主险','附险','附加险','组合险'],
    'type': {'first_type':
            ['全部','寿险'],
        'second_type':
            ['全部','定期寿险']},
    'sales_status': ['不限','在售','停售'],
    'nature_product': ['单列产品','正常产品'],
    'product_type': [{
        id: 1,
        name: '寿险',
        children: [{
            id: 4,
            name: '-------- 新寿险'
        }]
    }, {
        id: 2,
        name: '寿险2',
        children: [
            {
                id: 3,
                name: '-------- 新寿险2'
            }
        ]
    }],
    'product_type_data': [
        {
            label: '寿险 --------- 新寿险',
            value: 0
        },
        {
            label: '寿险2 --------- 新寿险2',
            value: 1
        }
    ]
}
export default {
    productList,
    productListSearch
}
