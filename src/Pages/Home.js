import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/productList";
function Home() {
    return ( 
        <Navbar>
            <ProductList />
        </Navbar>
     );
}

export default Home;