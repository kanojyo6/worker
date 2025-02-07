export interface recommendResponseModel {
	code: number
	orders: recommendModel[]
}

export interface recommendModel {
	orderId: number		// 订单id
	orderTitle: string		// 订单标题
	orderSalary: number		// 薪资
	orderTime: string		// 持续时间
	orderImgUrl: string		// 图片url
	orderDescription: string	//订单备注
	orderStatus: number		//订单状态（申请中 | 可申请）
	orderCategory: string	//订单类型
}