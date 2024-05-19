import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { enhanceFieldWithAi, getDashboardDetails } from "./DashboardSlilce";

const resumeOptions = [
  {
    id: 1,
    name: "Contact",
  },
  {
    id: 2,
    name: "Experience",
  },
  {
    id: 3,
    name: "Education",
  },
  {
    id: 4,
    name: "Skills",
  },
  {
    id: 5,
    name: "Projects",
  },
  {
    id: 6,
    name: "Summary",
  },
  {
    id: 7,
    name: "Involvements",
  },
];

const initialValues = {
  contact: {
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    linkedIn: "",
    github: "",
    other: "",
  },
  experience: {
    company: "",
    poisition: "",
    location: "",
    summary_of_work: "",
  },
  education: {
    institute_name: "",
    degree: "",
    location: "",
    gpa: "",
    start_year: "",
    end_year: "",
  },
  skills: "",
  projects: {
    project_name: "",
    project_description: "",
    project_link: "",
  },
  summary: "",
  involvements: "",
};

const ResumeDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [enhancedValue, setEnhancedValue] = useState("");

  const handleOption = (value) => {
    if (option === value) {
      setOption("");
    } else {
      setOption(value);
    }
  };

  const handleEnhanceWithAI = (prompt) => {
    try {
      const response = dispatch(enhanceFieldWithAi(prompt));
      console.log("enhanced", response);
    } catch (error) {
      console.log(error);
    }
    // enhancePrompt(prompt).then((rest) => {
    //   // values.experience.summary_of_work = rest;
    //   setEnhancedValue(rest);
    // });
  };

  const submitDataHandler = () => {
    console.log("submitDataHandler");
    console.log(values);
    localStorage.setItem("formData", JSON.stringify(values));
  };

  const validationSchema = Yup.object({
    contact: Yup.object({
      name: Yup.string()
        .min(3, "Minimum three character is required")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .required("Phone is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
    }),
    experience: Yup.object({
      company: Yup.string().required("Company is required"),
      poisition: Yup.string().required("Position is required"),
      location: Yup.string().required("Location is required"),
      summary_of_work: Yup.string().required("Summary of work is required"),
    }),
    education: Yup.object({
      institute_name: Yup.string().required("Institute name is required"),
      degree: Yup.string().required("Degree is required"),
      location: Yup.string().required("Location is required"),
      gpa: Yup.number()
        .required("GPA is required")
        .min(0, "GPA cannot be negative")
        .max(10, "GPA cannot exceed 10"),
      start_year: Yup.number()
        .required("Start year is required")
        .min(2000, "Invalid year")
        .max(new Date().getFullYear(), "Invalid year"),
      end_year: Yup.number()
        .required("End year is required")
        .min(2000, "Invalid year")
        .max(new Date().getFullYear() + 10, "Invalid year"),
    }),
    skills: Yup.string().required("Skills are required"),
    projects: Yup.object({
      project_name: Yup.string().required("Project name is required"),
      project_description: Yup.string().required(
        "Project description is required"
      ),
    }),
    summary: Yup.string().required("Summary is required"),
    involvements: Yup.string().required("Involvements are required"),
  });

  const { values, errors, handleChange, touched, handleSubmit } = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
    },
  });
  console.log(errors);

  useEffect(() => {
    try {
      const response = dispatch(getDashboardDetails());
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="dashboard__nav__conatiner">
        <div className="cmp__name">vitAI.in</div>
        <div className="dashboard__conatiner">
          <button className="create__btn" onClick={() => setOpen(!open)}>
            + create
          </button>
          <button className="service__btn" onClick={() => setOpen(!open)}>
            services
          </button>
        </div>
      </div>
      {open && (
        <nav className="navigation__container">
          <ul className="navigation__list">
            {resumeOptions.map((item) => (
              <li
                className={`particular__option ${
                  option === item.name ? "active" : ""
                }`}
                key={item.id}
                onClick={() => handleOption(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      )}
      {open &&
        (option === "Contact" ? (
          <div className="contact__form">
            <p className="contact__header">Your Contact Information</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="your name..."
                  name="contact.name"
                  onChange={handleChange}
                  type="text"
                  value={values.contact.name}
                />
                {errors.contact?.name && touched.contact?.name ? (
                  <p className="error">{errors.contact.name}</p>
                ) : null}
              </div>
              <div>
                <input
                  placeholder="your email"
                  name="contact.email"
                  onChange={handleChange}
                  type="email"
                  value={values.contact.email}
                />
                {errors.contact?.email && touched.contact?.email ? (
                  <div className="error">{errors.contact.email}</div>
                ) : null}
              </div>
              <input
                placeholder="Phone"
                name="contact.phone"
                onChange={handleChange}
                type="text"
                value={values.contact.phone}
              />

              <input
                placeholder="State"
                name="contact.state"
                onChange={handleChange}
                type="text"
                value={values.contact.state}
              />
              <input
                placeholder="City"
                name="contact.city"
                onChange={handleChange}
                type="text"
                value={values.contact.city}
              />
              <input
                placeholder="Github"
                name="contact.github"
                onChange={handleChange}
                type="text"
                value={values.contact.github}
              />
              <input
                placeholder="LinkedIn"
                name="contact.linkedIn"
                onChange={handleChange}
                type="text"
                value={values.contact.linkedIn}
              />
              <input
                placeholder="Other link(s)"
                name="contact.other"
                onChange={handleChange}
                type="text"
                value={values.contact.other}
              />
              <div className="contact__btn">
                <button>savee and next </button>
              </div>
            </form>
          </div>
        ) : option === "Experience" ? (
          <div className="contact__form">
            <p className="contact__header">Share Your Experience</p>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Company Name"
                name="experience.company"
                onChange={handleChange}
                type="text"
                value={values.experience.company}
              />
              <input
                placeholder="Position of work"
                name="experience.poisition"
                onChange={handleChange}
                type="text"
                value={values.experience.poisition}
              />
              <input
                placeholder="Location"
                name="experience.location"
                onChange={handleChange}
                type="text"
                value={values.experience.location}
              />
              <textarea
                placeholder="Summary..."
                name="experience.summary_of_work"
                onChange={handleChange}
                type="text"
                value={
                  enhancedValue !== ""
                    ? enhancedValue
                    : values.experience.summary_of_work
                }
                rows="10"
                cols="30"
              />
              <div className="contact__btn">
                <button>savee and next </button>
                <button
                  onClick={() =>
                    handleEnhanceWithAI(values.experience.summary_of_work)
                  }
                >
                  Enhance with AI{" "}
                </button>
              </div>
            </form>
          </div>
        ) : option === "Education" ? (
          <div className="contact__form">
            <p className="contact__header">Share Your Education Details</p>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Insitute Name"
                name="education.institute_name"
                onChange={handleChange}
                type="text"
                value={values.education.institute_name}
              />
              <input
                placeholder="Degree Name"
                name="education.degree"
                onChange={handleChange}
                type="text"
                value={values.education.degree}
              />
              <input
                placeholder="Location"
                name="education.location"
                onChange={handleChange}
                type="text"
                value={values.education.location}
              />
              <input
                placeholder="Total GPA"
                name="education.gpa"
                onChange={handleChange}
                type="number"
                value={values.education.gpa}
              />
              <input
                placeholder="start year"
                name="education.start_year"
                onChange={handleChange}
                type="text"
                value={values.education.start_year}
              />
              <input
                placeholder="end year"
                name="education.end_year"
                onChange={handleChange}
                type="text"
                value={values.education.end_year}
              />

              <div className="contact__btn">
                <button>savee and next </button>
              </div>
            </form>
          </div>
        ) : option === "Skills" ? (
          <div className="contact__form">
            <p className="contact__header">Share Your Market Ready Skills</p>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Skill Set..."
                name="skills"
                onChange={handleChange}
                type="text"
                value={values.skills}
              />
              <div className="contact__btn">
                <button>savee and next </button>
              </div>
            </form>
          </div>
        ) : option === "Projects" ? (
          <div className="contact__form">
            <p className="contact__header">Share Your Projects</p>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Project Name"
                name="projects.project_name"
                onChange={handleChange}
                type="text"
                value={values.projects.project_name}
              />
              <textarea
                placeholder="Project Description"
                name="projects.project_description"
                onChange={handleChange}
                type="text"
                value={values.projects.project_description}
                rows="10"
                cols="30"
              />
              <input
                placeholder="Project Link"
                name="projects.project_link"
                onChange={handleChange}
                type="text"
                value={values.projects.project_link}
              />
              <div className="contact__btn">
                <button>savee and next </button>
                <button>+ add more</button>
              </div>
            </form>
          </div>
        ) : option === "Summary" ? (
          <div className="contact__form">
            <p className="contact__header">Describe About Yourself...</p>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="About Me..."
                name="summary"
                onChange={handleChange}
                type="text"
                value={enhancedValue !== "" ? enhancedValue : values.summary}
                rows="10"
                cols="30"
              />
              <div className="contact__btn">
                <button>savee and next </button>
                <button onClick={() => handleEnhanceWithAI(values.summary)}>
                  Enhance with AI{" "}
                </button>
              </div>
            </form>
          </div>
        ) : option === "Involvements" ? (
          <div className="contact__form">
            <p className="contact__header">Describe About Extra Cricular</p>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="You Activites..."
                name="involvements"
                onChange={handleChange}
                type="text"
                value={values.involvements}
                rows="10"
                cols="30"
              />
              <div className="submit__btn">
                <button onClick={submitDataHandler}>
                  submit your details{" "}
                </button>
              </div>
            </form>
          </div>
        ) : null)}
    </>
  );
};

export default ResumeDashBoard;
