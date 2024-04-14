const OrderValid = require("../Utils/OrderValidation");
const OrderModel = require("../Models/OrdersModel");

let GetAllOrders = async (req, res) => {
    let AllOrders = await OrderModel.find();
    return res.json(AllOrders);
};

let GetOrderByID = async (req, res) => {
    //1) get order with id [params]
    let foundOrder = await OrderModel.findOne({id: req.params.id});
    //2) res
    if(foundOrder)
       return res.status(200).json({order: foundOrder});
    else
       return res.status(200).send("Order Not Found");
};

let AddOrder = (req, res) => {
    //1) get new order
    let newOrder = req.body; 
    if(OrderValid(newOrder)){
        //2) add new order to DB
            //2.1) Create Instance From Class Model
            //2.2) .save()
            let NewOrder = new OrderModel(newOrder);
            NewOrder.save();
        //3) res
        return res.status(201).json({message: "Added Successfully", Order: NewOrder});
    }else{
        return res.send(OrderValid.errors[0].instancePath.split("/")[1]
                    +": "+
                    OrderValid.errors[0].keyword
                    +" ==> "+
                    OrderValid.errors[0].message);
    }
};

let UpdateOrderByID = async (req, res) => {
    if (OrderValid(req.body)) {
   
            let OrderID = req.params.id;
            let Orderfound = await OrderModel.findOne({ id: OrderID });
            if (Orderfound) {
                Orderfound.id = req.body.id;
                Orderfound.totalPrice = req.body.totalPrice;
                Orderfound.items = req.body.items;

                await Orderfound.save();
                let AllOrders = await OrderModel.find();
                return res.status(200).json({ message: "Updated Successfully", order: AllOrders });
            } else {
                return res.status(404).send(`Order with id ${OrderID} not found`);
            }
    } else {
        return res.status(400).send("Invalid Order");
    }
};


let DeleteOrderByID = async(req,res) => {
    //1) get id
    let OrderID = req.params.id;
    //2) get order with id sent in url 
    let orderFound = await OrdersModel.findOne({id: OrderID});
    if (orderFound) {
        await OrderModel.deleteOne({ id: OrderID });
        AllOrders = await OrderModel.find();
        return res.json({message: `Order with id ${OrderID} deleted Successfully`, orders: AllOrders })
    }    
    return res.status(404).send("Order not found");
};


module.exports = {GetAllOrders,
                  GetOrderByID,
                  AddOrder,
                  UpdateOrderByID,
                  DeleteOrderByID
                 };

