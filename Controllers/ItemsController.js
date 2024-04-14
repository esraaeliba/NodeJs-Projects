const itemValid = require("../Utils/ItemsValidation");
const ItemsModel = require("../Models/ItemsModel");


let GetAllItems = async (req, res) => {
    let AllItems = await ItemsModel.find();
    return res.json(AllItems);
};

let GetItemByID = async (req, res) => {
    //1) get order with id [params]
    let foundItem = await ItemsModel.findOne({id: req.params.id});
    //2) res
    if(foundItem)
       return res.status(200).json({Item: foundItem});
    else
       return res.status(200).send("item Not Found");
};

let AddItem = (req, res) => {
    //1) get new item
    let newItem = req.body;
    if(itemValid(newItem)){
        //2) add new item to DB
            //2.1) Create Instance From Class Model
            //2.2) .save()
            let NewItem = new ItemsModel(newItem);
            NewItem.save();
        //3) res
        return res.status(201).json({message: "Added Successfully", Item: NewItem});
    }else{
        return res.send(itemValid.errors[0].instancePath.split("/")[1]
                    +": "+
                    itemValid.errors[0].keyword
                    +" ==> "+
                    itemValid.errors[0].message);
    }
};

let UpdateItemByID = async (req, res) => {
    if (itemValid(req.body)) {
            let ItemID = req.params.id;
            let itemFound = await ItemsModel.findOne({ id: ItemID });
            if (itemFound) {
                itemFound.id = req.body.id;
                itemFound.name = req.body.name;
                itemFound.price = req.body.price;
                itemFound.desc = req.body.desc;

                await itemFound.save();
                let AllItems = await ItemsModel.find();
                return res.status(200).json({ message: "Updated Successfully", Items: AllItems });
            } else {
                return res.status(404).send(`Item with id ${OrderID} not found`);
            }
    } else {
        return res.status(400).send("Invalid Item");
    }
};


let DeleteItemByID = async(req,res) => {
    //1) get id
    let ItemID = req.params.id;
    //2) get item with id sent in url 
    let itemFound = await ItemsModel.findOne({id: ItemID});
    if (itemFound) {
        await ItemsModel.deleteOne({ id: ItemID });
        AllItems = await ItemsModel.find();
        return res.json({message: `Item with id ${ItemID} deleted Successfully`, Items: AllItems })
    }    
    return res.status(404).send("Item not found");
};


module.exports = {GetAllItems,
                  GetItemByID,
                  AddItem,
                  UpdateItemByID,
                  DeleteItemByID
                 };

