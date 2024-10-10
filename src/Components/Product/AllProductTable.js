import React, { useEffect, useState, useContext } from "react"; // useState ve useEffect'i ekledik
import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import Loader from "../CommonComponent/Loader";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import { placeHolderImage } from "../../Data/CommonPath";
import AccountContext from "../../Helper/AccountContext";
import { getAllProducts } from "../../services/ProductService"; 

const AllProductTable = ({ ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const { role, setRole } = useContext(AccountContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rolü yerel depodan alıp ayarlıyoruz
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }

    // Firebase'den ürün verilerini çekiyoruz
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts(); // Firebase'den ürünleri alıyoruz
        setProductData(products); // Ürünleri state'e yerleştiriyoruz
        setLoading(false); // Yükleme tamamlandı
      } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setRole]);

  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    noEdit: edit ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Image", apiKey: "product_thumbnail", type: 'image', placeHolderImage: placeHolderImage },
      { title: "Name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "Price", apiKey: "sale_price", sorting: true, sortBy: "desc", type: 'price' },
      { title: "Stock", apiKey: "stock_status", type: 'stock_status' },
      { title: "StoreName", apiKey: "store", subKey: ["store_name"] },
      { title: "Approved", apiKey: "is_approved", type: 'switch', url: `/api/approve` }, // Bu alanın mantığını kontrol edin
      { title: "Status", apiKey: "status", type: 'switch' }
    ],
    data: productData || [] // Firebase'den çekilen verileri buraya bağlıyoruz
  };

  headerObj.data.map((element) => element.sale_price = element?.sale_price);

  let pro = headerObj?.column?.filter((elem) => {
    return role === 'vendor' ? elem.title !== 'Approved' : elem;
  });
  headerObj.column = headerObj ? pro : [];

  if (loading) return <Loader />; // Yüklenirken loader gösteriyoruz

  return (
    <>
      <ShowTable {...props} headerData={headerObj} />
    </>
  );
};

export default TableWarper(AllProductTable);