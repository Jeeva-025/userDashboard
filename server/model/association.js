import Feedback from "./Feedback.js";
import Module from "./Module.js";
import Platform from "./Platform.js";
import Tag from "./Tag.js";
import Project from "./Project.js";
import User from "./User.js";
import Task from "./Task.js";
import Auth from "./Auth.js";


Feedback.belongsToMany(Platform, { through: "FeedbackPlatforms", foreignKey: "feedbackId" });
Feedback.belongsToMany(Module, { through: "FeedbackModules", foreignKey: "feedbackId" });
Feedback.belongsToMany(Tag, { through: "FeedbackTags", foreignKey: "feedbackId" });

Module.belongsToMany(Feedback, { through: "FeedbackModules", foreignKey: "moduleId" });
Platform.belongsToMany(Feedback, { through: "FeedbackPlatforms", foreignKey: "platformId" });
Tag.belongsToMany(Feedback, { through: "FeedbackTags", foreignKey: "tagId" });


Project.belongsTo(Auth, {foreignKey:'userid',  as:'user'});
Auth.hasMany(Project, { foreignKey: 'userid', as: 'projects' });

Task.belongsTo(Project, { foreignKey: "projectid", as: "project" });
Project.hasMany(Task, { foreignKey: "projectid", as: "tasks" });

Task.belongsTo(Auth, { foreignKey: "assignerid", as: "assigner" });
Auth.hasMany(Task, { foreignKey: "assignerid", as: "assignedTasks" });

Task.belongsTo(Auth, { foreignKey: "assigneeid", as: "assignee" });
Auth.hasOne(Task, { foreignKey: "assigneeid", as: "assignedTask" });