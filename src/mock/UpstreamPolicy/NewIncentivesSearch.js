const newIncentives=[
    {'id':1,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'aj',
        'cost_type':'月度绩效','cost_name':'买东西','cost_policy':[
            {'contract_performance':'50000<= 承保业绩P <100000','proportion':'5%'}
        ],
        'startTime':'2019-08-12','endTime':'2019-12-31','moban_type':'模版一','sales_statistics':'规模保费','scale_base':'保费'},
    {'id':2,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'aj',
        'cost_type':'月度绩效','cost_name':'买东西','cost_policy':[
            {'contract_performance':'50000<= 承保业绩P <100000','proportion':'5%'}
        ],
        'startTime':'2019-08-12','endTime':'2019-12-31','moban_type':'模版二','sales_statistics':'规模保费','scale_base':'保费'},
    {'id':3,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'aj',
        'cost_type':'月度绩效','cost_name':'买东西','cost_policy':[
            {'contract_performance':'50000<= 承保业绩P <100000','proportion':'5%'}
        ],
        'startTime':'2019-08-12','endTime':'2019-12-31','moban_type':'模版三','sales_statistics':'规模保费','scale_base':'保费'},
    {'id':4,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'aj',
        'cost_type':'月度绩效','cost_name':'买东西','cost_policy':[
            {'contract_performance':'50000<= 承保业绩P <100000','proportion':'5%'}
        ],
        'startTime':'2019-08-12','endTime':'2019-12-31','moban_type':'模版一','sales_statistics':'规模保费','scale_base':'保费'},
    {'id':5,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'aj',
        'cost_type':'月度绩效','cost_name':'买东西','cost_policy':[
            {'contract_performance':'50000<= 承保业绩P <100000','proportion':'5%'}
        ],
        'startTime':'2019-08-12','endTime':'2019-12-31','moban_type':'模版一','sales_statistics':'规模保费','scale_base':'保费'},
]
const newIncentivesSearch = {
    'suplierName':['瑞泰人寿','泰康人寿','光大永明','阳光人寿','国华人寿'],
    'productName': [
        {'id':1,'productName':'光大永明海外专项就医综合医疗保险（2018版）','operation':true},
        {'id':2,'productName':'光大永明百万安康（2019版）医疗保险','operation':true},
        {'id':3,'productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险','operation':true},
        {'id':4,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':5,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':6,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':7,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':8,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':9,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':10,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':11,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':12,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':13,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':14,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':15,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':16,'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
    ],
    'procurement_type':['总对总','分对分','总对分','分对总'],
    'cost_type':['开门红季度特别推动','销售奖金（浮动）','月度特别推动','月度绩效','年终奖金','年度补充'],
    'moban_type':['模板一','模板二','模板三'],
    'protocol_type':['框架协议','政策协议','阶段协议'],
    'sales_statistics':['规模保费','标准保费','佣金'],
    'scale_base':['保费','标保','佣金+奖金'],
    'reward_way':['固定金额','固定比例']
}

export default {
    newIncentives,
    newIncentivesSearch
};