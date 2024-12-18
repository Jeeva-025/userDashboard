import Feedback from "./Feedback.js";
import Module from "./Module.js";
import Platform from "./Platform.js";
import Tag from "./Tag.js";

// Define the many-to-many associations
Feedback.belongsToMany(Platform, { through: "FeedbackPlatforms", foreignKey: "feedbackId" });
Feedback.belongsToMany(Module, { through: "FeedbackModules", foreignKey: "feedbackId" });
Feedback.belongsToMany(Tag, { through: "FeedbackTags", foreignKey: "feedbackId" });

Module.belongsToMany(Feedback, { through: "FeedbackModules", foreignKey: "moduleId" });
Platform.belongsToMany(Feedback, { through: "FeedbackPlatforms", foreignKey: "platformId" });
Tag.belongsToMany(Feedback, { through: "FeedbackTags", foreignKey: "tagId" });
