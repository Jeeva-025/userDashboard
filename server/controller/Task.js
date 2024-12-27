import Task from "../model/Task.js";
import Project from "../model/Project.js";
import Auth from "../model/Auth.js";


export const getAllTasks=async(req, res)=>{

    try{
        const tasks = await Task.findAll({
            include: [
              {
                model: Project,
                as: 'project',
                attributes: ['title'], // Fetch only the project title
              },
              {
                model: Auth,
                as: 'assigner',
                attributes: ['username'], // Fetch the assigner's username
              },
              {
                model: Auth,
                as: 'assignee',
                attributes: ['username'], // Fetch the assignee's username
              },
            ],
            attributes: ['projectid','id', 'title', 'type', 'description', 'status', 'startDate', 'endDate', 'role'], // Exclude timestamps if not needed
          });

          const result= tasks.map((task)=>({
            ...task.toJSON(),
            project:task.project.title,
            assigner:task.assigner.username,
            assignee:task.assignee.username
          }))

          res.status(200).json(result);
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error in fetching all Data",
            error:err.message
        })
    }
}


export const getAllTasksByProjectId=async(req, res)=>{
    const{id}=req.params;
    try{

        const tasks=await Task.findAll({
            where:{projectid:id},
            include:[
                
                    {
                      model: Project,
                      as: 'project',
                      attributes: ['title'], 
                    },
                    {
                      model: Auth,
                      as: 'assigner',
                      attributes: ['username'], 
                    },
                    {
                      model: Auth,
                      as: 'assignee',
                      attributes: ['username'], 
                    },
                  ],attributes:['projectid','id', 'title', 'type', 'description', 'status', 'startDate', 'endDate', 'role'],
                })


                const result= tasks.map((task)=>({
                    ...task.toJSON(),
                    project:task.project.title,
                    assigner:task.assigner.username,
                    assignee:task.assignee.username,
                    
                  }))

                res.status(200).json(result);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error in fetching data based on projectId",
            error:err.message
        })
    }
}



export const createTask=async(req, res)=>{
    const{title, type, role, description, startDate, endDate, projectid, assigneeid, assignerid }=req.body;
    try{
        const response=await Task.create({
            title, type, description, role, startDate, endDate, projectid,
            assigneeid, assignerid
        })
        res.status(201).json({
            message:"created task successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error in creating task",
            error:err.message
        })
    }

}

export const getAllAuth=async(req, res)=>{
  console.log("Happy new Year");
  try{

    const auth=await Auth.findAll({
      attributes:['id', 'username']
    })
    console.log(auth);
    res.status(201).json(auth);

  }catch(err){
    console.log(err);
    res.status(500).json({
      message:"Error in fetching all users",
      error:err.message
    })
  }
}

export const updateTaskStatus=async(req, res)=>{
  const{id}=req.params;
  try{
    const task= await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ message: "Project not found" });
  }

  // Update the project's status to "Inactive"
  task.status = "Inactive";

  // Save the updated project
  await task.save();

  res.status(200).json({
      message: "Project status updated to Inactive"
  });


  }catch(err){
    console.log(err);
    res.status(500).json({
      message:"error in updating",
      error:err.message
    })
  }
}