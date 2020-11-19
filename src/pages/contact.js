import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import axios from "axios"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"


const Contact = () => {
  const [content, setContent] = useState(null);
  const [formData, setFormData] = useState({
    first: "", 
    last: "", 
    email: "", 
    subject: "",
    message: "", 
    buttonText: "SUBMIT",
    sent: false,
    err: "",
  })

  useEffect(() => {
    const query = '*[_type == "pages" && pageName == "contact"]';
    const params = {};

    client.fetch(query, params).then(data => {
      console.log(data[0]);
      setContent(data[0]);
    })
  }, [])

  const getData = (key, alt = "") => content ? content[key] : alt;

  const navImage = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "pattern.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const resetForm = () => {
    setFormData({
        first: '',
        last: '',
        email: '',
        message: '',
        sent: false,
        buttonText: 'SUBMIT',
        err: ''
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      buttonText: "SENDING..."
    })

    axios.post('/api/sendmail', {
      first: formData.first,
      last: formData.last,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      user: process.env.GATSBY_CONTACT_USER,
      password: process.env.GATSBY_CONTACT_PASSWORD,
      host: process.env.GATSBY_SMTP_HOST,
      port: process.env.GATSBY_SMTP_PORT,
    })
      .then(res => {
        if (res.data.result !== "success") {
          setFormData({
            ...formData,
            buttonText: "FAILED TO SEND",
            sent: false,
            err: "fail"
          })
          setTimeout(() => {
            resetForm();
          }, 6000)
        } else {
          setFormData({
            ...formData,
            sent: true,
            buttonText: 'SENT',
            err: 'success'
          })
          setTimeout(() => {
              resetForm();
          }, 6000)
        }
      }).catch( (err) => {
        setFormData({
          ...formData,
          buttonText: 'FAILED TO SEND',
          err: 'fail'
        })
      })
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <Layout navImage={navImage} fadeColor={"#B0C0A5"}>
      <SEO title={getData("tabTitle")} description={getData("metaDescription")} />
      <div className="container">
        <div className="contact-container">
          <div className="contact-text-container">
            <ColorTitle text={getData("pageHeader")} marginBottom="30px" />
            <h2 className="contact-header">{getData("subheader")}</h2>
            <h2 className="contact-header">&#8211;</h2>
            {getData("lists") 
              ? getData("lists")[0].items.map((item, i) => {
                  return <p key={i} className="contact-line">{item}</p>
                })
              : ""
            }
          </div>
          <div className="contact-form-container">
            <h2 className="contact-header">{getData("forms") ? getData("forms")[0].formHeader : ""}</h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="name-fields">
                <label>
                  <input 
                    className="field-element" 
                    type="text" 
                    name="first"
                    value={formData.first}
                    onChange={handleChange} 
                  />
                  {getData("forms") ? getData("forms")[0].fieldLabels[0] : ""}
                </label>
                <label>
                  <input 
                    className="field-element" 
                    type="text" 
                    name="last" 
                    value={formData.last}
                    onChange={handleChange} 
                  />
                  {getData("forms") ? getData("forms")[0].fieldLabels[1] : ""}
                </label>
              </fieldset>
              <fieldset className="single-field">
                <label>
                  <input 
                    className="field-element" 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange} 
                  />
                  {getData("forms") ? getData("forms")[0].fieldLabels[2] : ""}*
                </label>
              </fieldset>
              <br />
              <fieldset className="single-field">
                <label>
                  <input 
                    className="field-element" 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange} 
                  />
                  {getData("forms") ? getData("forms")[0].fieldLabels[3] : ""}
                </label>
              </fieldset>
              <fieldset className="single-field">
                <label>
                  <textarea 
                    className="field-element" 
                    type="text" 
                    name="message" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange} 
                  />
                  {getData("forms") ? getData("forms")[0].fieldLabels[4] : ""}*
                </label>
              </fieldset>
              <input className="submit-btn" type="submit" value={formData.buttonText} />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
