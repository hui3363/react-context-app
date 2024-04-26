import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Options from './Options';
import Products from './Products';

const Type = ({ orderType }) => {

	const [items, setItems] = useState([]);

	useEffect(() => {
		loadItems(orderType);
	}, [orderType])

	const loadItems = async (orderType) => {
		try {
			const response = await axios.get(`http://localhost:4000/${orderType}`)
			setItems(response.data);
		} catch (error){
			console.log(error);
		}
	}

	const ItemComponent = orderType === "products" ? Products : Options;
	const optionItems = items.map(item => (
		<ItemComponent 
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	))

	return (
		<div>
			<div>주문 종류</div>
			<p>하나의 가격</p>
			<p>총 가격:</p>
			<div
				style={{
					display: 'flex',
					flexDirection: orderType === "options" ? "column" : "row"
				}}
			>
				{optionItems}
			</div>
		</div>
	)
}

export default Type