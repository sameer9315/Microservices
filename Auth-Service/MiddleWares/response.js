module.exports={
    sendResponse: (res,statuscode,message,data=null)=>{
      res.status(statuscode).json({
        statuscode,
        message,
        data
      });
    },
  }