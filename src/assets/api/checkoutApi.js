/*
 * @Author: 黄灿民
 * @Date: 2020-12-29 20:14:36
 * @LastEditTime: 2020-12-29 20:49:41
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\assets\api\checkoutApi.js
 */
export default {
    "__v": 0,
    "id": 154687,
    "delivery_reach_time": "21:49",
    "sig": "122054",
    "_id": "5feb1a30ee71012471682729",
    "is_support_ninja": 1,
    "is_support_coupon": false,
    "deliver_times_v2": [],
    "deliver_times": [],
    "payments": [{
        "description": "（商家不支持货到付款）",
        "disabled_reason": "商家仅支持在线支付",
        "id": 2,
        "name": "货到付款",
        "select_state": -1,
        "_id": "5feb1a30ee7101247168272b",
        "promotion": [],
        "is_online_payment": false
    }, {
        "description": "（商家仅支持在线支付）",
        "disabled_reason": "",
        "id": 1,
        "name": "在线支付",
        "select_state": 1,
        "_id": "5feb1a30ee7101247168272a",
        "promotion": [],
        "is_online_payment": true
    }],
    "invoice": {
        "status_text": "不需要开发票",
        "is_available": true
    },
    "cart": {
        "id": 154687,
        "deliver_amount": 4,
        "is_deliver_by_fengniao": true,
        "original_total": 1003,
        "phone": "13437850035",
        "restaurant_id": 1,
        "restaurant_info": {
            "_id": "5a5859a19c2bc57d52df30b0",
            "name": "效果演示",
            "address": "广东省广州市越秀区中山五路219号华联购物中心F1",
            "id": 1,
            "latitude": 23.12497,
            "longitude": 113.26308,
            "location": [113.26308, 23.12497],
            "phone": "13437850035",
            "category": "快餐便当/简餐",
            "__v": 0,
            "supports": [{
                "description": "已加入“外卖保”计划，食品安全有保障",
                "icon_color": "999999",
                "icon_name": "保",
                "id": 7,
                "name": "外卖保",
                "_id": "5a5859a19c2bc57d52df30b3"
            }, {
                "description": "准时必达，超时秒赔",
                "icon_color": "57A9FF",
                "icon_name": "准",
                "id": 9,
                "name": "准时达",
                "_id": "5a5859a19c2bc57d52df30b2"
            }, {
                "description": "该商家支持开发票，请在下单时填写好发票抬头",
                "icon_color": "999999",
                "icon_name": "票",
                "id": 4,
                "name": "开发票",
                "_id": "5a5859a19c2bc57d52df30b1"
            }],
            "status": 1,
            "recent_order_num": 106,
            "rating_count": 961,
            "rating": 4.7,
            "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
            "piecewise_agent_fee": {
                "tips": "配送费约¥5"
            },
            "opening_hours": ["8:30/20:30"],
            "license": {
                "catering_service_license_image": "160e91e17fa2164.png",
                "business_license_image": "160e91e0a9f2163.png"
            },
            "is_new": true,
            "is_premium": true,
            "image_path": "164ad0b6a3917599.jpg",
            "identification": {
                "registered_number": "",
                "registered_address": "",
                "operation_period": "",
                "licenses_scope": "",
                "licenses_number": "",
                "licenses_date": "",
                "legal_person": "",
                "identificate_date": null,
                "identificate_agency": "",
                "company_name": ""
            },
            "float_minimum_order_amount": 20,
            "float_delivery_fee": 5,
            "distance": "",
            "order_lead_time": "",
            "description": "sad",
            "delivery_mode": {
                "color": "57A9FF",
                "id": 1,
                "is_solid": true,
                "text": "蜂鸟专送"
            },
            "activities": []
        },
        "restaurant_minimum_order_amount": 20,
        "total": 1003,
        "service_fee_explanation": 0,
        "restaurant_status": 1,
        "promise_delivery_time": 0,
        "ontime_status": 0,
        "must_pay_online": 0,
        "must_new_user": 0,
        "is_ontime_available": 0,
        "is_online_paid": 1,
        "is_address_too_far": false,
        "extra": [{
            "description": "",
            "_id": "5feb1a30ee7101247168272c",
            "type": 0,
            "quantity": 1,
            "price": 959,
            "name": "餐盒"
        }],
        "groups": [
            [{
                    "id": 23725,
                    "name": "ew1",
                    "packing_fee": 0,
                    "price": 20,
                    "quantity": 1,
                    "sku_id": 23698,
                    "stock": 1000,
                    "_id": "5feb1a30ee7101247168272e",
                    "specs": [""],
                    "new_specs": [],
                    "extra": [null],
                    "attrs": []
                },
                {
                    "id": 23729,
                    "name": "ee",
                    "packing_fee": 0,
                    "price": 20,
                    "quantity": 1,
                    "sku_id": 23702,
                    "stock": 1000,
                    "_id": "5feb1a30ee7101247168272d",
                    "specs": [""],
                    "new_specs": [],
                    "extra": [null],
                    "attrs": []
                }
            ]
        ]
    }
}