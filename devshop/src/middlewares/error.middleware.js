// 404 handler - runs when no route matched

const notfound = (req,res,next)=>{
  res.status(404).json({
    success : false,
    message : "route not found"
  })
}

//eroorhandler

const errorhandler = (err,req,res,next)=>{
  console.error(err.stack);

//mongoose bad objectid
if(err.name === "CastError"){
  return res.status(400).json({
    succes:false,
    message:"invalid id format"
  });
}
if(err.name==="ValidationError"){
  const mesaages = Object.values(err.errors).map((e)=>e.message)
  return res.status(400).json({
    success:false,
    message:mesaages.join(",")
  })
}
if(err.name==="MulterError"){
  return res.status(400).json({
    success:false,
    message:`upload error ${err.message}`
  })
}

}

module.exports = {notfound,errorhandler};