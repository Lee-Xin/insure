const upstreamFolding = [
    {'supplierName':'光大永明','productName':'光大永明海外专项就医综合医疗保险（2018版）','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[
            {'id':1,'payment_time':'4年交', 'fold_coefficient':'40%'},
            {'id':2,'payment_time':'4年交', 'fold_coefficient':'40%'},
            {'id':3,'payment_time':'4年交', 'fold_coefficient':'40%'},
            {'id':4,'payment_time':'4年交', 'fold_coefficient':'40%'},
            {'id':5,'payment_time':'4年交', 'fold_coefficient':'40%'},
            {'id':6,'payment_time':'4年交', 'fold_coefficient':'40%'},
            ],
        'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'全部', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'光大永明百万安康（2019版）医疗保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'是', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'光大永明吉瑞宝（多倍版）重大疾病保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'否', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'百年附加康睿保意外伤害保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'全部', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'百年附加康佑保意外伤害医疗保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'全部', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'百年医惠通费用补偿医疗保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'是', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'百年康盛保终身重大疾病保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'否', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'泰康泰享健康终身恶性肿瘤疾病保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'全部', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'泰康投保人豁免保险费重大疾病保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'全部', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'},
    {'supplierName':'光大永明','productName':'百年附加高诊无忧费用补偿医疗保险','productID':'10001','procurement_type':'总对总',
        'foldCoefficient':[{'id':1,'payment_time':'4年交','fold_coefficient':'40%'}],'startTime':'2017-08-21','endTime':'2018-5-31', 'aboutAge':'是', 'channel_name':'1111','protocol_type':'框架协议','reward_way':'固定金额'}
];
const upstream_floding_search = {
    'supplierName': ['光大永明','百年人寿','泰康养老'],
    'product_name': [
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
    'aboutAge': ['全部','否','是'],
    'procurement_type':['总对总','分对分','总对分','分对总'],
    'protocol_type': ['框架协议','政策协议','政策协议','阶段协议'],
    'reward_way':['固定比例','固定金额']
}

export default {
    upstreamFolding,
    upstream_floding_search
};