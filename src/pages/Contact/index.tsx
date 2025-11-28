import ContactForm from '../../components/sections/ContactForm'

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out. I'm always open
          to discussing new opportunities and ideas.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
