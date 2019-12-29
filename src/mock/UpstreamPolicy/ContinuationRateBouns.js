const tableData = [
    {'id':1,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
    'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':2,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':3,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':4,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':5,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':6,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':7,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':8,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':9,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':10,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':11,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'},
    {'id':12,'suplierName':'光大永明','productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险',
        'productId':'AWR-i9','procurement_type':'分对分','protocol_type':'政策协议','channel_name':'团购',
        'renewal_rates':'固定比例','startTime':'2019-08-12','endTime':'2019-12-31'}
]
const ContinuationRateBounsSearch = {
    'suplierName':['光大永明','瑞泰人寿','全部','阳光人寿','国华人寿'],
    'productName':[
        {'id':1, 'productName':'光大永明海外专项就医综合医疗保险（2018版）','operation':true},
        {'id':2, 'productName':'光大永明百万安康（2019版）医疗保险','operation':true},
        {'id':3, 'productName':'光大永明附加投保人豁免保险费（加强版）重大疾病保险','operation':true},
        {'id':4, 'productName':'光大永明吉瑞宝（多倍版）重大疾病保险','operation':true},
        {'id':5, 'productName':'光大永明安鑫禧年金保险','operation':true},
        {'id':6, 'productName':'光大永明永葆健康（全佑版）终身重大疾病保险','operation':true},
        {'id':7, 'productName':'光大永明至爱家传终身寿险','operation':true},
    ],
    'procurement_type':['全部','总对总','分对分','总对分','分对总'],
    'protocol_type':['全部','框架协议','政策协议','阶段协议'],
    'renewal_rates': ['固定比例','固定金额']
}


export default {
    tableData,
    ContinuationRateBounsSearch
};