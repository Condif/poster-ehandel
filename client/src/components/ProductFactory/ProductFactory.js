import React from "react";

import {
	MainCard,
	// CartCard,
	// CheckoutCard,
	// ProductPageCard,
} from "./ProductCards";


const ProductFactory = (props)  => {
	const { path } = props;
		if(props.case != null) {
			switch (props.case) {
				case "main":
					return (
						<MainCard product={props.product} path={`/product/${path}`}/>
					);
			// 	case "cart":
			// 		return <CartCard product={props.product}/>;
			// 	case "checkout":
			// 		return <CheckoutCard product={props.product} />;
			// 	case "productPage":
			// 		return <ProductPageCard product={props.product}/>;
			default:
			}
		}
}

export default ProductFactory