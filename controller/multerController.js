let uploadStorage = multer.diskStorage({
    destination: function(req, file, cb ){
      cb(null, './upload')},
      filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
      }
  })
  
  const upload = multer({storage: uploadStorage})
  
  
  
  
  
    export {upload};