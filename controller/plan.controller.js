import planModel from "../model/plan.model.js";

export const createPlan = async (req, res) => {
    try {
        // console.log(req.body)
        const plan = new planModel(req.body);
        await plan.save();
        res.status(200).json(plan);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message  // ✅ Corrected key name
        });
    }
};


export const fetchPlan = async(req , res) => {
                   try{
                     const plans = await planModel.find().sort({createAt : -1})
                        res.status(200).json(plans)
                }
                catch(err){
                    res.status(500).json({
                       messahe : err.message
                    })
}
}