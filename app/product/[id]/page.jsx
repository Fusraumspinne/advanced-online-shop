import Product from "@/components/Product"

function page({params}) {
  return (
    <div>
        <Product params={params}/>
    </div>
  )
}

export default page