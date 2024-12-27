    import Project from "../model/Project.js";
    import Auth from "../model/Auth.js";

    export const getAllProjects=async(req, res)=>{

        try{
            const projects =await Project.findAll({
                attributes:['id','title', 'type', 'description', 'startDate', 'endDate', 'role', 'status'  ],
                include:{
                    model:Auth,
                    as:'user',
                    attributes:['username']
                }
    });

    const result = projects.map(project => ({
        ...project.toJSON(),  
        user: project.user.username 
    }));
            res.status(201).json(result);


        }catch(err){
            console.log(err);
            res.status(500).json({
                message:"Error found in fetching all data",
                error:err.message
            })
        }
    }




    export const createProject=async(req, res)=>{
        const{title, type, description, role, userid, startDate, endDate }=req.body;
        
        try{
            const project =await Project.create({
                title, 
                type,
                description,
                startDate, endDate,
                role, userid

            })
            res.status(201).json(project);

        }catch(err){
            console.log(err);
            res.status(500).json({
                message:"Error posting Project",
                error:err.message
            })

        }
    }



    export const updateProjectStatus = async (req, res) => {
        const { id } = req.params;
        
        try {
            const project = await Project.findByPk(id);
            
    
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
    
            // Update the project's status to "Inactive"
            project.status = "Inactive";
    
            // Save the updated project
            await project.save();
    
            res.status(200).json({
                message: "Project status updated to Inactive"
            });
    
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error found in updating project status",
                error: err.message
            });
        }
    };

    export const updateProject=async(req, res)=>{
        const{title, type, role, startDate, endDate, description, userid}=req.body;
        const{id}=req.params;
        try{
            const project=await Project.findByPk(id);
            
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            project.title=title|| project.title;
            project.type=type|| project.type;
            project.description=description|| project.description;
            project.startDate=startDate|| project.startDate;
            project.endDate=endDate|| project.endDate;
            project.role=role || project.role,
            project.userid=userid || project.userid,

            await project.save();

            return res.status(200).json({ message: "project updated successfully" });

        }catch(err){
            console.log(err);
            res.status(500).json({
                message:"Error in updaing",
                error:err.message
            })
        }
    }