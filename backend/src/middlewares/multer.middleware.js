import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename:  (req, file, cb)=> {
   
        cb(null, file.originalname)

}
  
})
  
  export const upload = multer({ storage })

  
//Multer as Middleware: Multer is used to handle and temporarily store the file, often on disk or in memory.
// Cloudinary Upload: After Multer processes the file, you upload it to Cloudinary using their SDK.
// Temporary Storage: Multer can save files locally or in memory, and then the files are transferred to Cloudinary as needed.