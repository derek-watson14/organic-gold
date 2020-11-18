import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import client from "../sanity/client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ColorTitle from "../components/colorTitle"


const Contact = () => {
  const [content, setContent] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("This form is not yet hooked up. Check back soon!");
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
                  <input className="field-element" type="text" name="name" />
                  First Name
                </label>
                <label>
                  <input className="field-element" type="text" name="name" />
                  Last Name
                </label>
              </fieldset>
              <fieldset className="single-field">
                <label>
                  <input className="field-element" type="text" name="name" rows="5" />
                  Email Address*
                </label>
              </fieldset>
              <fieldset className="single-field">
                <label>
                  <textarea className="field-element" type="text" name="name" rows="4" />
                  Message*
                </label>
              </fieldset>
              <input className="submit-btn" type="submit" value="SUBMIT" />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
