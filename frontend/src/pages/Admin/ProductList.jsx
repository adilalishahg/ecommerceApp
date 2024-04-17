import { useState } from "react"
import { useNavigate } from "react-router"
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import {toast} from "react-toastify"
import AdminMenu from "./AdminMenu"
 
const ProductList = () => {
  const [image,setImage] = useState('')
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')
  const [quantity,setQuantity] = useState('')
  const [brand,setBrand] = useState('')
  const [stock,setStock] = useState(0)
  const [description,setDescription] = useState('')
  const [imageUrl,setImageUrl] = useState(null)

  const navigate = useNavigate()

  const [uploadProductImage] = useUploadProductImageMutation()
  const [createProduct] = useCreateProductMutation()
  
  const {data:categories} = useFetchCategoriesQuery()

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image',e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
      setImageUrl(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="p-3 md:w-3/4">
          <div className="h-12">Create Product</div>
          {imageUrl &&(
            <div className="text-center">
              <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />

            </div>
          )}
          <div className="mb-3">
            <label className="block w-full px-4 font-bold text-center text-white border rounded-lg cursor-pointer py-11">
              {image?image.name:"Upload Image"}

              <input  type='file' name='image' className={!image?"hidden":"text-white"} accept='image/*' onChange={uploadFileHandler}/>
            </label>
            
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">
                  Name
                </label><br/>
                <input type="text" className="p-4 mb-3 lg:w-[30rem] md:w-[21rem] sm:w-[10rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={e=>setName(e.target.value)}/>

              </div>
              <div className="lg:ml-10 md:ml-10 two">
                <label htmlFor="name block">
                  Price
                </label><br/>
                <input type="text" className="p-4 mb-3 lg:w-[30rem] md:w-[21rem] sm:w-[10rem]   border rounded-lg bg-[#101011] text-white" value={price} onChange={e=>setPrice(e.target.value)}/>

              </div>
              <div className="one">
                <label htmlFor="name block">
                  Quantity
                </label><br/>
                <input type="number" className="p-4 mb-3 lg:w-[30rem] md:w-[21rem] sm:w-[10rem]  border rounded-lg bg-[#101011] text-white" value={quantity} onChange={e=>setQuantity(e.target.value)}/>

              </div>
              <div className="lg:ml-10 md:ml-10 two">
                <label htmlFor="name block">
                  Brand
                </label><br/>
                <input type="text" className="p-4 mb-3 lg:w-[30rem] md:w-[21rem] sm:w-[10rem]  border rounded-lg bg-[#101011] text-white" value={brand} onChange={e=>setBrand(e.target.value)}/>

              </div>
            </div>
            <label htmlFor="" className="my-5">Description</label>
            <textarea type='text' className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={e=>setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <div>
                <label htmlFor="name block"> Count In Stock</label>
                <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg  bg-[#101011] text-white" value={stock} onChange={e=>setStock(e.target.value)} />
              </div>
              <div>
                <label htmlFor="name block">Category</label> 
                <select placeholder="Choose Category" className="p-4 mb-3 w-[30rem] border rounded-lg  bg-[#101011] text-white" value={category} onChange={e=>setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories?.map((category)=>(
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
             className="px-10 py-4 mt-5 text-lg font-bold bg-pink-600 rounded-lg">Submit</button>
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList