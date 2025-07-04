export const uploadToCloudinary = async(pics:any)=>{
  const cloud_name="do5khwojd"
  const upload_preset="add_product_img"
  if(pics){
    const data = new FormData()
    data.append("file",pics)
    data.append("upload_preset",upload_preset)
    data.append("cloud_name",cloud_name)

    const res = await fetch("https://api.cloudinary.com/v1_1/do5khwojd/image/upload",{
      method:"POST",
      body:data
    })

    const fileData = await res.json()
    return fileData.url;
  }
  else{
    console.log("error : pics not found")
  }
}