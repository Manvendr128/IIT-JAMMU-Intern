const  multer = require("multer");
const path = require("path");

//where and how to store files on disk

const storage = multer.diskStorage({
  // callback function=cb
  destination:(req,file,cb)=>{
    cb(null,"public/uploads") // folder to save into
  },
  filename:(req,file,cb)=>{
    //make a unique name fieldname-timestamps.ext
    const ext = path.extname(file.originalname)
    const unique = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null,unique)
  }
})

//filters = only allow image file

const filefilter = (req,file,cb)=>{
  const allowed = /jpeg|jpg|png|webp/; // ye extension dene hunge particular allowance ke liye
  const okExt = allowed.test(path.extname(file.originalname).toLowerCase());

  const okMime = allowed.test(file.mimetype)
  if(okExt && okMime){
    cb(null,true);
  }
  else{
    cb(new Error("only image files are allowed"),false);
  }
}

const upload = multer({
  storage,
  filefilter,
  limits:{fileSize : 8*1024*1024}
})

module.exports = upload;