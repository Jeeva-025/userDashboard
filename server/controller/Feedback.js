import Feedback from "../model/Feedback.js";
import Platform from "../model/Platform.js";
import Module from "../model/Module.js";
import Tag from "../model/Tag.js";

export const getAllFeedback= async(req, res)=>{
    
    try{
        const feedbacks = await Feedback.findAll({
            include: [
              {
                model: Platform,
                through: { attributes: [] }, // Exclude the junction table's data
                attributes: ['name'] // Get only the name of the platform
              },
              {
                model: Module,
                through: { attributes: [] }, // Exclude the junction table's data
                attributes: ['name'] // Get only the name of the module
              },
              {
                model: Tag,
                through: { attributes: [] }, // Exclude the junction table's data
                attributes: ['name'] // Get only the name of the tag
              }
            ]
          });
          
          
          // Transform the result to get the desired format
          const result = feedbacks.map(feedback => ({
            id: feedback.id,
            title: feedback.title,
            description: feedback.description,
            platforms: feedback.Platforms.map(platform => platform.name),
            modules: feedback.Modules.map(module => module.name),
            tags: feedback.Tags.map(tag => tag.name),
            vote:feedback.vote
          }));
          
          res.status(201).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message
          });
    }
}






export const createFeedback = async (req, res) => {
    let { title, description, platforms, modules, tags } = req.body;
    const file=req.file;


    // For platforms
if (typeof platforms === 'string' && platforms !== '') {
  platforms = platforms.split(',').map(Number);
} else {
  platforms = []; // Ensure platforms is an empty array when it's an empty string
}

// For modules
if (typeof modules === 'string' && modules !== '') {
  modules = modules.split(',').map(Number);
} else {
  modules = []; // Ensure modules is an empty array when it's an empty string
}

// For tags
if (typeof tags === 'string' && tags !== '') {
  tags = tags.split(',').map(Number);
} else {
  tags = []; // Ensure tags is an empty array when it's an empty string
}
  
    try {
      // Create the feedback entry
      const feedback = await Feedback.create({
        title,
        description,
        filename:file? file.filename:null,
      });
  
      // Associate platforms, modules, and tags
      if (platforms && platforms.length > 0) {
        const platformEntries = await Platform.findAll({ where: { id: platforms } });
        await feedback.setPlatforms(platformEntries); // Use Sequelize association method
      }
  
      if (modules && modules.length > 0) {
        const moduleEntries = await Module.findAll({ where: { id: modules } });
        await feedback.setModules(moduleEntries); // Use Sequelize association method
      }
  
      if (tags && tags.length > 0) {
        const tagEntries = await Tag.findAll({ where: { id: tags } });
        await feedback.setTags(tagEntries); // Use Sequelize association method
      }
  
      // Return the created feedback
      res.status(201).json({
        message: "Feedback created successfully",
        data: {
          id: feedback.id,
          title: feedback.title,
          description: feedback.description,
        
          platforms: platforms || [],
          modules: modules || [],
          tags: tags || [],
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error creating feedback",
        error: error.message,
      });
    }
  };
  




  export const updateFeedback=async(req, res)=>{
    const{id}=req.params;
    let{title, description, platforms, modules, tags}=req.body;
    const file=req.file;

    // For platforms
if (typeof platforms === 'string' && platforms !== '') {
  platforms = platforms.split(',').map(Number);
} else {
  platforms = []; // Ensure platforms is an empty array when it's an empty string
}

// For modules
if (typeof modules === 'string' && modules !== '') {
  modules = modules.split(',').map(Number);
} else {
  modules = []; // Ensure modules is an empty array when it's an empty string
}

// For tags
if (typeof tags === 'string' && tags !== '') {
  tags = tags.split(',').map(Number);
} else {
  tags = []; // Ensure tags is an empty array when it's an empty string
}


    try{
      const feedback= await Feedback.findByPk(id);

      if(!feedback){
        return res.status(404).json({message:"Feedback is not found"});
      }

      feedback.title=title || feedback.title;
      feedback.description= description || feedback.description;
      feedback.filename = file ? file.filename : feedback.filename;
      await feedback.save();

      if(platforms && platforms.length>0){
        const platformEntries = await Platform.findAll({ where: { id: platforms } });
        await feedback.setPlatforms(platformEntries);
      }else{
        await feedback.setPlatforms([])
      }

      if(modules && modules.length>0){
        const moduleEntries = await Module.findAll({ where: { id: modules } });
       await feedback.setModules(moduleEntries);
     }else{
       await feedback.setModules([])
     }

     if(tags && tags.length>0){
     const tagEntries = await Tag.findAll({ where: { id: tags } });
     await feedback.setTags(tagEntries);
   }else{
     await feedback.setTags([])
   }


   return res.status(200).json({ message: "Feedback updated successfully" });
    }catch(err){
      console.log(err);
      res.status(500).json({
        message:"Error in updating feedback",
        error:err.message
      })
    }
  }







  export  const deleteFeedback= async(req, res)=>{
    const{id}=req.params;
    try{

      const feedback =await Feedback.findByPk(id);

      if(!feedback){
        res.status(404).json({message:"Feedback does not found"});
      }

      await feedback.setPlatforms([]);
      await feedback.setModules([]);
      await feedback.setTags([]);
      await feedback.destroy();

      res.status(200).json({
        message: "Feedback deleted successfully",
      });

    }catch(error){
      console.log(error)
        res.status(500).json({
          message:"Error in deleting Feedback",
          error:error.message
        })
      
    }
  }
  

  export const upVote=async(req, res)=>{
    const{id}=req.params;
    
    try{

      const feedback= await Feedback.findByPk(id);
      
      if(!feedback){
        return  res.status(404).json({message:"Feedback not Found"});
      }

      feedback.vote+=1;
      await feedback.save();

      res.status(200).json({message:"Vote upldated Successfully"})

    }catch(err){
      console.log(err);
      res.status(500).json({
        message:"Error in upvoting",
        error:err.message
      })
    }
  }