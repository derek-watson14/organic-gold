import React, { useState } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ColorTitle from '../components/colorTitle';

export const query = graphql`
  query ContactPageQuery {
    placeholderImage: file(relativePath: { eq: "pattern.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    sanityPages(pageName: { eq: "contact" }) {
      tabTitle
      metaDescription
      pageHeader
      subheader
      lists {
        name
        items
        _key
      }
      forms {
        name
        header
        labels
      }
    }
  }
`;

const defaultValues = {
  first: '',
  last: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
};

const Contact = ({ data }) => {
  const contactForm = data.sanityPages.forms.filter(
    (form) => form.name === 'contact',
  )[0];
  const contactInfo = data.sanityPages.lists.filter(
    (list) => list.name === 'Contact Info',
  )[0];

  const [buttonText, setButtonText] = useState('SUBMIT');
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm(defaultValues);

  const onSubmit = (data) => {
    if (!submitted) {
      setButtonText('SENDING...');
      setSubmitted(true);
      axios
        .post('/api/sendmail', {
          ...data,
          user: process.env.GATSBY_CONTACT_USER,
          password: process.env.GATSBY_CONTACT_PASSWORD,
          host: process.env.GATSBY_SMTP_HOST,
          port: process.env.GATSBY_SMTP_PORT,
        })
        .then((res) => {
          if (res.data.result !== 'success') {
            setButtonText('FAILED TO SEND');
            setTimeout(() => {
              reset();
              setButtonText('SUBMIT');
              setSubmitted(false);
            }, 6000);
          } else {
            setButtonText('SENT');
            alert(
              'Your message has been recieved! Expect an email from us soon!',
            );
            setTimeout(() => {
              setButtonText('SUBMIT');
              reset();
              setSubmitted(false);
            }, 6000);
          }
        })
        .catch((err) => {
          setButtonText('FAILED TO SEND');
          setTimeout(() => {
            reset();
            setButtonText('SUBMIT');
            setSubmitted(false);
          }, 6000);
        });
    }
  };

  return (
    <Layout navImage={data.placeholderImage} fadeColor={'#B0C0A5'}>
      <SEO
        title={data.sanityPages.tabTitle}
        description={data.sanityPages.metaDescription}
      />
      <div className='container'>
        <div className='contact-container'>
          <div className='contact-text-container'>
            <ColorTitle
              text={data.sanityPages.pageHeader}
              marginBottom='30px'
            />
            <h2 className='contact-header'>{data.sanityPages.subheader}</h2>
            <h2 className='contact-header'>&#8211;</h2>
            {contactInfo.items.map((item) => (
              <p key={item._key} className='contact-line'>
                {item}
              </p>
            ))}
          </div>
          <div className='contact-form-container'>
            <h2 className='contact-header'>{contactForm.header}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className='two-fields'>
                <label>
                  <input
                    className={
                      errors.first
                        ? 'field-element field-error'
                        : 'field-element'
                    }
                    type='text'
                    name='first'
                    ref={register({
                      maxLength: {
                        value: 255,
                        message: 'Input is too long.',
                      },
                    })}
                  />
                  {contactForm.labels[0]}
                  <div className='error-message'>
                    {errors.first && errors.first.message}
                  </div>
                </label>
                <label>
                  <input
                    className={
                      errors.last
                        ? 'field-element field-error'
                        : 'field-element'
                    }
                    type='text'
                    name='last'
                    ref={register({
                      maxLength: {
                        value: 255,
                        message: 'Input is too long.',
                      },
                    })}
                  />
                  {contactForm.labels[1]}
                  <div className='error-message'>
                    {errors.last && errors.last.message}
                  </div>
                </label>
              </fieldset>
              <fieldset className='two-fields'>
                <label>
                  <input
                    className={
                      errors.email
                        ? 'field-element field-error'
                        : 'field-element'
                    }
                    type='text'
                    name='email'
                    ref={register({
                      required: 'This field is required.',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email.',
                      },
                    })}
                  />
                  {contactForm.labels[2]}*
                  <div className='error-message'>
                    {errors.email && errors.email.message}
                  </div>
                </label>
                <label>
                  <input
                    className={
                      errors.mobile
                        ? 'field-element field-error'
                        : 'field-element'
                    }
                    type='tel'
                    name='mobile'
                    ref={register({
                      minLength: {
                        value: 10,
                        message: 'Must be at least 10 digits.',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Must be no more than 10 digits',
                      },
                      pattern: {
                        value: /[0-9]/,
                        message: 'Must be all numbers.',
                      },
                    })}
                  />
                  {contactForm.labels[3]}
                  <div className='error-message'>
                    {errors.mobile && errors.mobile.message}
                  </div>
                </label>
              </fieldset>
              <div className='form-divider' />
              <div className='single-field'>
                <label>
                  <input
                    className={
                      errors.subject
                        ? 'field-element field-error'
                        : 'field-element'
                    }
                    type='text'
                    name='subject'
                    ref={register({
                      maxLength: {
                        value: 255,
                        message: 'Input is too long.',
                      },
                    })}
                  />
                  {contactForm.labels[4]}
                  <div className='error-message'>
                    {errors.subject && errors.subject.message}
                  </div>
                </label>
              </div>
              <div className='single-field'>
                <label>
                  <textarea
                    className={
                      errors.message
                        ? 'field-element field-error'
                        : 'field-element'
                    }
                    type='text'
                    name='message'
                    rows='5'
                    ref={register({
                      required: 'Field is required.',
                      maxLength: {
                        value: 1500,
                        message: 'Input is too long.',
                      },
                    })}
                  />
                  {contactForm.labels[5]}*
                  <div className='error-message'>
                    {errors.message && errors.message.message}
                  </div>
                </label>
              </div>
              <input className='submit-btn' type='submit' value={buttonText} />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
