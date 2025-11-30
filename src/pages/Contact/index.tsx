import Seo from '../../components/seo/Seo'
import ContactForm from '../../components/sections/ContactForm'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact — Matteo Ricci"
        description="Contattami per collaborazioni, progetti full-stack o consulenze. Disponibile per opportunità in React, TypeScript, Django e DevOps."
        canonical="https://matteoricci.net/contact"
      />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="mb-4">Get In Touch</h1>
        <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out. I'm always open
          to discussing new opportunities and ideas.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-md p-8">
          <ContactForm />
        </div>
      </div>
    </div>
    </>
  )
}
