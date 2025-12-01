const { json, JSON } = require("sequelize")
const leadModel = require("../model/leadModel")
const projectModel = require("../model/projectModel")
const userModel = require("../model/userModel")

module.exports.addProject = async (req, res) => {
    try {
        // console.log(req.params.id)
        const leadData = await leadModel.findByPk(req.params.id, {
            include: [
                {
                    model: userModel,
                    as: "employee",
                    attributes: ["id", "name"]
                }
            ]
        })
        const lead = leadData.toJSON()

        if (!lead) {
            return res.status(404).json({ message: "Lead Not Found!" })
        }
        if (lead.isConverted == false) {
            return res.status(401).json({ message: "NO access when lead is pending..." })
        }

        // console.log(lead)
        req.body.clientName = lead.name
        req.body.email = lead.email
        req.body.phone = lead.phone
        req.body.description = lead.description
        req.body.budget = lead.budget
        req.body.assignedTo = lead.assignedTo

        console.log(req.body)

        const project = await projectModel.create(req.body)
        // console.log(project)

        return res.status(200).json({ message: "Project Added Success", data: project.toJSON() })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports.allProject = async (req, res) => {
    try {
        const projectlist = await projectModel.findAll();

        console.log("projects", projectlist);

        const projects = projectlist.map(p => {
            const obj = p.toJSON();
            return obj;
        });

        if (req.user.role === "Admin") {
            return res.status(200).json({ message: "All project fetch success", data: projects });
        }

        if (req.user.role === "Employee") {

            const employeeProjects = projects.filter(project =>

                project.assignedTo.includes(req.user.id) ||
                project.assignedTo.includes(String(req.user.id))
            );

            return res.status(200).json({ message: "All project fetch success", data: employeeProjects });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.editProject = async (req, res) => {
    try {
        // console.log(req.params.id)

        const project = await projectModel.findByPk(req.params.id)
        console.log(project.toJSON())

        if (!project) {
            return res.status(404).json({ message: "No project Found !" })
        }

        // req.body.assignedTo = req.body.assignedTo.split(",")
        console.log(req.body.assignedTo)
        // console.log(req.body)

        await projectModel.update(req.body, { where: { id: req.params.id } })
        const updatedProject = await projectModel.findByPk(req.params.id)
        console.log(updatedProject.toJSON())
        return res.status(200).json({ message: "Project update success", data: updatedProject.toJSON() })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })

    }
}

module.exports.deleteProject = async (req, res) => {
    try {
        // console.log(req.params.id)
        const project = await projectModel.findByPk(req.params.id)

        if (!project) {
            return res.status(404).json({ message: "No project found !" })
        }

        await projectModel.destroy({ where: { id: req.params.id } })

        return res.status(200).json({ message: "Delete Project Success" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

