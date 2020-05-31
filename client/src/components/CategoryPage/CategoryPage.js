import { renderProducts } from '../Main';

const CategoryPage = (props) => {
    const products = getProducts(props);
    return renderProducts("main", products, props.createSlug);
}

/**
 * Get list of products in category
 * @param {Object} props
 * @param {string} props.category
 * @param {{}} props.products
 * @return {[{}]} list of products in category
 */
const getProducts = ({ category, products }) => {
    const categoryProducts = [];
    products.map((product) => {
        if (product.category === category) {
            categoryProducts.push(product);
        }
    })
    return categoryProducts;
}

export default CategoryPage;