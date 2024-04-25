import { useState } from "react"
import { Link } from "react-router-dom"
import Ratings from "./Ratings"
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import SmallProduct from "./SmallProduct"
import Loader from "../../components/Loader"



const ProductTabs = ({ loadingProductReview,
    useInfo ,
    submitHandler ,
    rating,
    setRating,
    comment,setComment,
    product}) => {

    const {data,isLoading} = useGetTopProductsQuery()

    const [activeTab,setActiveTab] = useState(1)

    if(isLoading){return <Loader/>}

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }
    return (
        <div className="flex flex-col md:flex-row">
            <section className="mr-[5rem]">
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab===1?"font-bold":""}`} 
                    onClick={()=>handleTabClick(1)}
                >Write Your Review</div>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab===2?"font-bold":""}`} 
                    onClick={()=>handleTabClick(2)}
                >All Reviews</div>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab===3?"font-bold":""}`} 
                    onClick={()=>handleTabClick(3)}
                >Related Products</div>
            </section>

            {/* Second Part */}
            {activeTab === 1&&(
                <div className="mt-4">
                    {useInfo ?(
                        <form onSubmit={submitHandler}>
                            <div className="my-2">
                                <label htmlFor='rating' className="block mb-2 text-xl">
                                    Ratings
                                </label>
                                <select
                                    id="rating"
                                    required
                                    value={rating}
                                    onChange={(e)=>setRating(e.target.value)}
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                >
                                    <option value="">Select...</option>
                                    <option value="1">Inferior</option>
                                    <option value="2">Decent</option>
                                    <option value="3">Great</option>
                                    <option value="4">Excellent</option>
                                    <option value="5"></option>
                                </select>
                            </div>
                            <div className="my-2">
                                <label htmlFor='comment' className="block mb-2 text-xl"> 
                                    Comment
                                </label>
                                <textarea id='comment' rows='3' required value={comment}
                                    onChange={e=>setComment(e.target.value)} 
                                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                ></textarea>
                                 
                            </div>
                            <button type="submit" disabled={loadingProductReview}
                                className="px-4 py-2 text-white bg-pink-600 rounded-lg"
                            >Submit</button>
                        </form>
                    ):(
                        <p>Please <Link to='/login'>sign in</Link> to write a review</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductTabs