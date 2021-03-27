const express=require('express');
const router=express.Router();
const {showAllNotification,createForm,createNewNotification,showNotificationById,editForm,updateNotificationById,deleteNotificationById}=require('../controller/notification');

router.get("/",showAllNotification);
router.post("/",createNewNotification);
router.get("/:id",showNotificationById);
router.get("/:id/edit",editForm);
router.put("/:id",updateNotificationById);
router.delete("/:id",deleteNotificationById); 

module.exports=router;