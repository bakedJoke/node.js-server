const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels")
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.find({user_id:req.user.id })
    res.status(200).json(contact)
})
const getOneContact =asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(200).json(contact)
})
const createContact =asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name, email,phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })

    res.status(201).json(contact)
})
const updateContact = asyncHandler(async (req, res) => {
    // İletişim bilgisini ID'ye göre bul
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    
    // Kullanıcının izinli olup olmadığını kontrol et
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to update");
    }
    
    // İletişim bilgisini güncelle
    const updated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // `runValidators: true` ile doğrulama kurallarına uyum sağlanır
    );
    
    res.status(200).json(updated);
});
const deleteContact = asyncHandler(async (req, res) => {
    // İletişim bilgisini ID'ye göre bul
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    
    // Kullanıcının izinli olup olmadığını kontrol et
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to delete");
    }
    
    // İletişim bilgisini sil
    await Contact.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Contact successfully deleted" });
});
module.exports = {getContact,getOneContact,createContact,updateContact,deleteContact};