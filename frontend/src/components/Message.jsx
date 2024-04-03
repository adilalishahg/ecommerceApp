 
const Message = ({variant,children}) => {
    const getVariantClass = ()=>{
        switch(variant){
            case 'success':
                return 'bg-green-100 text-green-700'
            case 'error':
                return 'bg-red-100 text-red-700'
            case 'warning':
                return 'bg-yellow-100 text-yellow-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }
  return (
    <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>
  )
}

export default Message