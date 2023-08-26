const Item = require('../models/Item');

// get all items from database and sort them in decreasing order by date added
module.exports.getItems = async (req,res) => {
    Item.find().sort({date: -1}).then(items => res.json(items));
}


// add new item to cart.  Use req.body to get the data from the form on the front end
module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
}

// update items in cart. receive updated info from front end and the item id through the params.
// use findByIdAndUpdate to find the item by id and update it with the new info

module.exports.update_item = (req,res) => {
    Item.findOneAndUpdate({_id: req.params.id}, req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.send(item);
        });
    }
    );
}

// delete item from cart.  Use findByIdAndDelete to find the item by id and delete it from the database
module.exports.delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}